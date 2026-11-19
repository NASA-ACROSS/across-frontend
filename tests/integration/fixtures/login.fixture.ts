import { expect } from '@playwright/test';

import { mergeTests } from '@playwright/test';
import { test as mockserver } from './mockserver.fixture';
import { test as fake } from './mocks/fake.fixture';

const base = mergeTests(mockserver, fake);

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
                    'set-cookie': 'refresh_token=' + fake.tokens.refresh,
                },
                body: JSON.stringify({
                    access_token: fake.tokens.access,
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
