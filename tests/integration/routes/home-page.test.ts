import { test, expect } from '@playwright/test';

test('should display the core layout components', async ({ page }) => {
    await page.goto('/');

    await test.step('should display the navigation bar', async () => {
        const navbar = page.getByTestId('navbar');
        await expect.soft(navbar).toBeVisible();

        await test.step('should display the headers and links', async () => {
            // NASA-ACROSS home link
            await expect.soft(page.getByTestId('nav-home-button')).toBeVisible();

            // Omits playground from navigation bar when not in local environment
            if (process.env.PUBLIC_RUNTIME_ENV !== 'local') {
                await expect.soft(page.getByTestId('NavHeader:playground')).not.toBeVisible();
            }

            // data button with dropdown links
            const dataHeader = page.getByTestId('NavHeader:data');
            await expect.soft(dataHeader).toBeVisible();

            // data dropdown links
            await dataHeader.click();
            await expect.soft(page.getByTestId('NavLink:schedules')).toBeVisible();
            await expect.soft(page.getByTestId('NavLink:observations')).toBeVisible();
            await expect.soft(page.getByTestId('NavLink:observatories')).toBeVisible();

            // Tools with dropdown links
            const toolsHeader = page.getByTestId('NavHeader:tools');
            await expect.soft(toolsHeader).toBeVisible();

            // tools dropdown links
            await toolsHeader.click();
            await expect.soft(page.getByTestId('NavLink:data-ingestion-status')).toBeVisible();
            await expect.soft(page.getByTestId('NavLink:visibility-calculator')).toBeVisible();

            // About and API links
            await expect.soft(page.getByTestId('NavLink:about')).toBeVisible();
            await expect.soft(page.getByTestId('NavLink:api')).toBeVisible();
        });
    });

    await test.step('should display the hero section', async () => {
        await expect.soft(page.getByTestId('hero')).toBeVisible();
        await expect.soft(page.getByTestId('ArrowButton:data-ingestion-status')).toBeVisible();
        await expect.soft(page.getByTestId('ArrowButton:browse-observations')).toBeVisible();
        await expect.soft(page.getByTestId('ArrowButton:explore-api')).toBeVisible();
    });

    await test.step('should display the footer', async () => {
        await expect.soft(page.locator('footer')).toBeVisible();
        await expect.soft(page.getByRole('heading', { name: 'Services' })).toBeVisible();
        await expect.soft(page.getByRole('heading', { name: 'Info' })).toBeVisible();
    });
});
