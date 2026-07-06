import { expect, test, type Page } from '@playwright/test';

const CAPTCHA_ERROR = 'Could not verify that you are human. Please reload the page and try again.';

// Block the ALTCHA challenge endpoint so the invisible widget can never solve
// the proof-of-work. This guarantees no `altcha` payload cookie is sent, which
// exercises the server-side captcha rejection path.
test.beforeEach(async ({ page }) => {
    await page.route('**/api/altcha/challenge', (route) => route.abort());
});

/**
 * Submits the form that contains `anchorSelector` via the native
 * `HTMLFormElement.submit()`. The ALTCHA widget hooks the form's `submit` event
 * to hold submission until the proof-of-work resolves; since the challenge is
 * blocked it would otherwise swallow the submit and the test would flake.
 * `submit()` fires no `submit` event, so it bypasses the widget (and HTML5
 * validation) and posts directly. The call is deferred a tick so `page.evaluate`
 * resolves before the navigation tears down the execution context.
 */
async function submitFormNatively(page: Page, anchorSelector: string) {
    await page.$eval(anchorSelector, (el) => {
        const form = el.closest('form');
        setTimeout(() => form?.submit(), 0);
    });
}

test('register is rejected when the captcha is not solved', async ({ page }) => {
    await page.goto('/user/register');

    await page.fill('input[name="firstname"]', 'Sandy');
    await page.fill('input[name="lastname"]', 'Treedome');
    await page.fill('input[name="username"]', 'sandy.treedome');
    await page.fill('input[name="email"]', 'sandy.treedome@example.com');

    await submitFormNatively(page, 'input[name="firstname"]');

    await expect(page.getByText(CAPTCHA_ERROR)).toBeVisible();
});

test('login-verify is rejected when the captcha is not solved', async ({ page }) => {
    await page.goto('/user/login-verify');

    await submitFormNatively(page, 'input[name="rememberMe"]');

    await expect(page.getByText(CAPTCHA_ERROR)).toBeVisible();
});
