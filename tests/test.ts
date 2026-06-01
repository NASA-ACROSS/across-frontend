import { expect, test } from '@playwright/test';

test('index page shows navigation', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('.navbar')).toBeVisible();
});
