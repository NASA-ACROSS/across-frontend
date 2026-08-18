import { test, expect } from '@playwright/test';

test('should have the correct links to the expected pages when hovering over navbar links', async ({ page }) => {
    await page.goto('/');
    const navbar = page.getByTestId('navbar');
    const dataHeader = navbar.getByTestId('NavHeader:data');
    const toolsHeader = navbar.getByTestId('NavHeader:tools');

    await test.step('should have href to the schedules page', async () => {
        await dataHeader.click();
        const link = navbar.getByTestId('NavLink:schedules');
        await expect.soft(link).toHaveAttribute('href', '/schedules');
    });

    await test.step('should have href to the observations page', async () => {
        await dataHeader.click();
        const link = navbar.getByTestId('NavLink:observations');
        await expect.soft(link).toHaveAttribute('href', '/observations');
    });

    await test.step('should have href to the observatories page', async () => {
        await dataHeader.click();
        const link = navbar.getByTestId('NavLink:observatories');
        await expect.soft(link).toHaveAttribute('href', '/observatories');
    });

    await test.step('should have href to the data ingestion status page', async () => {
        await toolsHeader.click();
        const dataIngestionStatusLink = navbar.getByTestId('NavLink:data-ingestion-status');
        await expect.soft(dataIngestionStatusLink).toHaveAttribute('href', '/ingestion-status');
    });

    await test.step('should have href to the visibility calculator page', async () => {
        await toolsHeader.click();
        const visibilityCalculatorLink = navbar.getByTestId('NavLink:visibility-calculator');
        await expect.soft(visibilityCalculatorLink).toHaveAttribute('href', '/visibility-calculator');
    });

    await test.step('should have href to the about page', async () => {
        const link = navbar.getByTestId('NavLink:about');
        await expect.soft(link).toHaveAttribute('href', '/about');
    });

    await test.step("should have the link to the server's API docs page", async () => {
        const link = navbar.getByTestId('NavLink:api');
        // Not clicking as this points to the across server that is not available for these integration tests.
        await expect.soft(link).toHaveAttribute('href', /\/docs/);
    });
});
