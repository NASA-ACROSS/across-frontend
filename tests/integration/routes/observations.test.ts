import { test } from '../fixtures';
import { expect } from '@playwright/test';
import type { Observation } from '$lib/types/across/Observation';

const TELESCOPE_API_PATH = '/v1/telescope';
const OBSERVATION_API_PATH = '/v1/observation';

test.describe('Initial Load without observations', () => {
    test.beforeEach(async ({ page, mockServer }) => {
        await mockServer.mockJson(TELESCOPE_API_PATH, []);
        await mockServer.mockJson(OBSERVATION_API_PATH, [], { pagination: true });
        await page.goto('/observations');
    });

    test('should render empty state', async ({ page }) => {
        await expect(page.getByTestId('no-data-row')).toBeVisible();
    });
});

test.describe('observations exist on load', () => {
    const mockObservations: Observation[] = [];

    test.beforeEach(async ({ page, mockServer, fake }) => {
        const pageArr = Array.from({ length: 10 });

        const page1 = pageArr.map((_, i) =>
            fake.observation({
                id: `observation-${i + 10}`,
                object_name: `Object ${i + 10}`,
                external_observation_id: `ext-${i + 10}`,
            })
        );

        const page2 = pageArr.map((_, i) =>
            fake.observation({
                id: `observation-${i + 20}`,
                schedule_id: 'schedule-2',
                object_name: `Object ${i + 20}`,
                external_observation_id: `ext-${i + 20}`,
            })
        );

        const page3 = pageArr.map((_, i) =>
            fake.observation({
                id: `observation-${i + 30}`,
                schedule_id: 'schedule-3',
                object_name: `Object ${i + 30}`,
                external_observation_id: `ext-${i + 30}`,
            })
        );

        mockObservations.push(...page1, ...page2, ...page3);

        await mockServer.mockJson(TELESCOPE_API_PATH, [fake.telescope()]);
        await mockServer.mockJson(OBSERVATION_API_PATH, mockObservations, { pagination: true });

        await page.goto('/observations');
    });

    test('should display observations on load', async ({ page }) => {
        await test.step('should render observation row', async () => {
            await expect(page.getByTestId(`TableRow:observations-observation-10`)).toBeVisible();
        });

        await test.step('should render total number of observations', async () => {
            await expect(page.getByTestId('Section:observations').getByRole('heading')).toContainText(mockObservations.length.toString());
        });
    });

    test('should handle pagination correctly', async ({ page }) => {
        await test.step('should render the next page of observations', async () => {
            await page.getByTestId('Pagination:observations-next').click();
            await expect(page.getByTestId(`TableRow:observations-observation-20`)).toBeVisible();
        });

        await test.step('should render the last page of observations', async () => {
            await page.getByTestId('Pagination:observations-last').click();
            await expect(page.getByTestId(`TableRow:observations-observation-30`)).toBeVisible();
        });

        await test.step('should render the prev page of observations', async () => {
            await page.getByTestId('Pagination:observations-prev').click();
            await expect(page.getByTestId(`TableRow:observations-observation-20`)).toBeVisible();
        });

        await test.step('should render the first page of observations', async () => {
            await page.getByTestId('Pagination:observations-first').click();
            await expect(page.getByTestId(`TableRow:observations-observation-10`)).toBeVisible();
        });
    });
});
