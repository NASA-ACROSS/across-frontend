import { expect, test } from '@playwright/test';

// Block external analytics/tracking scripts that would hang tests waiting for the page load event
const EXTERNAL_SCRIPT_BLOCKLIST = [/dap\.digitalgov\.gov/, /www\.google-analytics\.com/, /www\.googletagmanager\.com/];

test('index page shows navigation', async ({ page }) => {
    for (const pattern of EXTERNAL_SCRIPT_BLOCKLIST) {
        await page.route(pattern, (route) => route.abort());
    }
    // waitUntil: 'domcontentloaded' avoids blocking on external analytics scripts
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    await expect(page.locator('.navbar')).toBeVisible();
});
