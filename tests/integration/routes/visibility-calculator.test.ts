import { test, expect } from '../fixtures/mockserver.fixture';

const TELESCOPE_PATH = '/v1/telescope';

test.describe('visibility calculator page', () => {
    test('should have alert visible', async ({ page, mockServer }) => {
        await mockServer.mockJson(TELESCOPE_PATH, []);
        await page.goto('/visibility-calculator');

        const alert = page.getByTestId(`Alert:vis-calc-alert`);

        await expect(alert).toBeVisible();
    });
});
