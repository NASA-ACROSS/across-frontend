import { test, expect } from '../fixtures/mockserver.fixture';

// One at a time: concurrent proof-of-work solves starve other test files of CPU.
test.describe.configure({ mode: 'default' });

const CAPTCHA_ERROR = 'Could not verify that you are human. Please reload the page and try again.';

test('challenge endpoint returns a signed challenge', async ({ request }) => {
    const res = await request.get('/api/altcha/challenge');

    expect(res.status()).toBe(200);
    expect(await res.json()).toHaveProperty('signature');
});

// These pages are local-only (404 in this env), so post to their actions directly, the way `use:enhance` does.
for (const route of ['/user/register', '/user/login']) {
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
    ['/user/login', 'Send Link'],
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

test('/user/login solves a new captcha after a failed attempt, since the form does not reload', async ({ page }) => {
    await page.goto(`${LOCAL}/user/login`);
    const email = page.locator('form').getByRole('textbox');
    const sendLink = page.locator('form').getByRole('button', { name: 'Send Link', exact: true });

    // An invalid email still uses up the captcha (it's checked first).
    await email.fill('not-an-email');
    await sendLink.click({ timeout: 15_000 });
    await expect(page.getByText('Please provide a valid email.')).toBeVisible();

    await email.fill('sandy@example.com');
    await sendLink.click({ timeout: 15_000 });
    await expect(page.getByText('An email has been sent to sandy@example.com')).toBeVisible();
});

test('/user/register submits once the captcha is solved', async ({ page, mockServer }) => {
    // The action reports a 409 (already registered) as success, so the result doesn't leak existing accounts.
    await mockServer.mockJson('/v1/user', {}, { method: 'POST', status: 409 });
    await page.goto(`${LOCAL}/user/register`);

    await page.fill('input[name="firstname"]', 'Sandy');
    await page.fill('input[name="lastname"]', 'Cheeks');
    await page.fill('input[name="username"]', 'sandycheeks');
    await page.fill('input[name="email"]', 'sandy@example.com');
    await page.locator('form').getByRole('button', { name: 'Register', exact: true }).click({ timeout: 15_000 });

    await expect(page.getByText('An email has been sent to sandy@example.com')).toBeVisible();
});
