import { test } from '../fixtures';
import { expect } from '@playwright/test';

test.describe('Profile', () => {
    test.beforeEach(async ({ login }) => {
        await login();
    });

    test('should log the user in to the user profile page', async ({ page }) => {
        await expect(page).toHaveURL(/\/user\/profile/);
    });
});
