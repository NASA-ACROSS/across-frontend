import { expect } from '@playwright/test';

import { mergeTests } from '@playwright/test';
import { test as mockserver } from './mockserver.fixture';
import { test as fake } from './mocks/fake.fixture';

const base = mergeTests(mockserver, fake);

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

type Fixtures = {
    login: () => Promise<void>;
};

export const test = base.extend<Fixtures>({
    login: async ({ page, mockServer, fake }, use, testInfo) => {
        const testId = testInfo.testId;

        // uses mockAnyResponse since it is not a simple json mock and requires headers to be mocked.
        await mockServer.client.mockAnyResponse({
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

        await mockServer.mockJson('/v1/user/user-1', fake.user(), {}, { method: 'GET' });

        // mock login-verify
        await page.goto('/user/login-verify?token=abc123');
        await page.getByTestId('ArrowButton:login-verify').click();

        // required
        await use(async () => {});
    },
});

export { expect };
