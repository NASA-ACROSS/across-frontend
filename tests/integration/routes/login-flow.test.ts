import { test } from '../fixtures';
import { expect } from '@playwright/test';
import { type MockServerClient } from 'mockserver-client';

const EMAIL = 'sandy@treedome.space';
/**
 * Access token is a fake JWT with a fake payload since it needs to be decoded to extract a user ID.
 *
 * 100 years expiry. Hello from the past, future ACROSS engineers...or...bots, if you still exist.
 *
 * ```
 * {
 *  "sub": "user-1",
 *  "first_name": "Sandy",
 *  "last_name": "Cheeks",
 *  "username": "sandycheeks",
 *  "email": "sandy@treedome.space",
 *  "exp": 4922928000,
 *  "iat": 1516239022
 * }
 * ```
 */

const FAKE_ACCESS_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyLTEiLCJmaXJzdF9uYW1lIjoiU2FuZHkiLCJsYXN0X25hbWUiOiJDaGVla3MiLCJ1c2VybmFtZSI6InNhbmR5Y2hlZWtzIiwiZW1haWwiOiJzYW5keUB0cmVlZG9tZS5zcGFjZSIsImV4cCI6NDkyMjkyODAwMCwiaWF0IjoxNTE2MjM5MDIyfQ.kI1jKDYjTRr6QhEeOftktVs1EQWiJu2BnBpXIi8GIpw';

/** The refresh token does not need to be decoded so it is a simple string */
const FAKE_REFRESH_TOKEN = 'fake-refresh-token';

test.describe('User Login Flow', () => {
    /** Helper function to mock the verify endpoint as it should only be called once per link */
    const mockVerifyEndpoint = async (client: MockServerClient, testId: string) => {
        await client.mockAnyResponse({
            namespace: testId,
            httpRequest: {
                method: 'GET',
                path: '/v1/auth/verify',
                queryStringParameters: { token: 'abc123' },
            },
            httpResponse: {
                statusCode: 200,
                headers: {
                    'content-type': ['application/json'],
                    'set-cookie': 'refresh_token=' + FAKE_REFRESH_TOKEN,
                },
                body: JSON.stringify({
                    access_token: FAKE_ACCESS_TOKEN,
                }),
            },
            times: { remainingTimes: 1 },
        });
    };

    test.beforeEach(async ({ mockServer, fake }) => {
        // Mock login endpoint as success to "send" an email
        await mockServer.mockJson('/v1/auth/login', '', { queryParams: { email: EMAIL } }, { method: 'POST' });

        // Mock user profile endpoint as success to return user details
        await mockServer.mockJson('/v1/user/user-1', fake.user(), {}, { method: 'GET' });
    });

    test('should display success message when an email has been sent', async ({ page }) => {
        await page.goto('/user/login');

        await page.getByTestId('EmailInput').getByRole('textbox').fill(EMAIL);
        await page.getByTestId('Button:email-submit').click();

        await expect(page.getByTestId('FormSubmitFeedback:login')).toContainText('email has been sent');
    });

    test('should direct the user to the login-verify page when clicking the magic link', async ({ page }) => {
        await page.goto('/user/login-verify?token=abc123');

        await expect(page).toHaveURL(/\/user\/login-verify/);
    });

    test('should log the user in to the user profile page', async ({ page, mockServer }, { testId }) => {
        await mockVerifyEndpoint(mockServer.client, testId);

        await page.goto('/user/login-verify?token=abc123');
        await page.getByTestId('ArrowButton:login-verify').click();

        await expect(page).toHaveURL(/\/user\/profile/);
    });

    test('should remember the user when the page is reloaded without "remember me" being checked', async ({ page, mockServer }, {
        testId,
    }) => {
        await mockVerifyEndpoint(mockServer.client, testId);

        await page.goto('/user/login-verify?token=abc123');
        await page.getByTestId('ArrowButton:login-verify').click();
        await page.reload();

        await expect(page).toHaveURL(/\/user\/profile/);
    });

    test('should remember the user when "remember me" is checked and login-verify page is revisited', async ({
        page,
        context,
        mockServer,
    }, { testId }) => {
        await mockVerifyEndpoint(mockServer.client, testId);

        await page.goto('/user/login-verify?token=abc123');
        await page.getByTestId('remember-me').check();
        await page.getByTestId('ArrowButton:login-verify').click();
        await page.close();

        const newPage = await context.newPage();
        await newPage.goto('/user/login-verify');

        await expect(newPage).toHaveURL(/\/user\/profile/);
    });

    test('should remember the user when "remember me" is checked and login page is visited', async ({ page, context, mockServer }, {
        testId,
    }) => {
        await mockVerifyEndpoint(mockServer.client, testId);

        await page.goto('/user/login-verify?token=abc123');
        await page.getByTestId('remember-me').check();
        await page.getByTestId('ArrowButton:login-verify').click();
        await page.close();

        const newPage = await context.newPage();
        await newPage.goto('/user/login');

        await expect(newPage).toHaveURL(/\/user\/profile/);
    });

    test('should display rate limited message when attempts exceed the limit', async ({ request, page, baseURL }) => {
        const limit = parseInt(process.env.LOGIN_IPUA_LIMIT || '30') + 1;

        const uniqueFakeIP = '1.2.3.4';
        const uniqueUA = 'PlaywrightRateLimitTest/1.0';

        if (!baseURL) {
            throw new Error('baseURL is not defined');
        }

        const customHeaders = {
            'X-Forwarded-For': uniqueFakeIP,
            'user-agent': uniqueUA,
            origin: baseURL,
        };

        const url = `${baseURL}/user/login`;

        for (let i = 0; i < limit; i++) {
            await request.post(url, { headers: customHeaders, form: { email: EMAIL } });
        }

        const isolatedContext = await page
            .context()
            .browser()
            ?.newContext({
                userAgent: uniqueUA,
                extraHTTPHeaders: {
                    'X-Forwarded-For': uniqueFakeIP,
                },
            });

        if (!isolatedContext) {
            throw new Error('Failed to create isolated browser context');
        }

        const isolatedPage = await isolatedContext.newPage();

        await isolatedPage.goto('/user/login');
        await isolatedPage.getByTestId('EmailInput').getByRole('textbox').fill(EMAIL);
        await isolatedPage.getByTestId('Button:email-submit').click();

        await expect(isolatedPage.getByTestId('FormSubmitFeedback:login')).toContainText('You are being rate limited');
    });
});
