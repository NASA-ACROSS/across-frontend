import { test, expect } from '@playwright/test';

const CAPTCHA_ERROR = 'Could not verify that you are human. Please reload the page and try again.';

test('challenge endpoint returns a signed challenge', async ({ request }) => {
    const res = await request.get('/api/altcha/challenge');

    expect(res.status()).toBe(200);
    expect(await res.json()).toHaveProperty('signature');
});

// These pages are local-only (404 in this env), so post to their actions directly, the way `use:enhance` does.
for (const route of ['/user/register', '/user/login-verify']) {
    test(`${route} rejects a submission without a solved captcha`, async ({ request, baseURL }) => {
        const res = await request.post(route, {
            headers: { accept: 'application/json', origin: new URL(route, baseURL).origin },
            form: {},
        });

        const result = (await res.json()) as { type: string; status: number; data: string };
        expect(result).toMatchObject({ type: 'failure', status: 400 });
        expect(result.data).toContain(CAPTCHA_ERROR);
    });
}

// The pages themselves render on the local-mode server from playwright.config.ts.
const LOCAL = 'http://localhost:4174';

for (const [path, name] of [
    ['/user/register', 'Register'],
    ['/user/login-verify?token=test-token', 'Login'],
]) {
    test.describe(`${path} submit`, () => {
        test.describe('without JavaScript', () => {
            test.use({ javaScriptEnabled: false });

            test('is disabled in the server-rendered page', async ({ page }) => {
                await page.goto(LOCAL + path);
                await expect(page.locator('form').getByRole('button', { name, exact: true })).toBeDisabled();
            });
        });

        test('unlocks once the captcha is solved', async ({ page }) => {
            await page.goto(LOCAL + path);
            await expect(page.locator('form').getByRole('button', { name, exact: true })).toBeEnabled({ timeout: 15_000 });
        });

        test('stays disabled and shows an error when the challenge cannot be fetched', async ({ page }) => {
            await page.route('**/api/altcha/challenge', (route) => route.abort());
            await page.goto(LOCAL + path);
            await expect(page.getByText(CAPTCHA_ERROR)).toBeVisible();
            await expect(page.locator('form').getByRole('button', { name, exact: true })).toBeDisabled();
        });
    });
}
