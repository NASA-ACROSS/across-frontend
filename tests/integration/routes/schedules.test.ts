import { test } from '../fixtures';
import { expect, type Page } from '@playwright/test';

const TELESCOPE_PATH = '/v1/telescope';
const SCHEDULE_PATH = '/v1/schedule';

// key-value is column id: is selected by default
const tableColumns = {
    observatoryTelescope: 1,
    name: 1,
    externalId: 0,
    dateBegin: 1,
    dateEnd: 1,
    status: 1,
    fidelity: 1,
    numberOfObservations: 1,
};

const defaultCols = Object.entries(tableColumns)
    .filter(([, value]) => value === 1)
    .map(([key]) => key);

test.describe('Initial Load without schedules', () => {
    test.beforeAll(async ({ mockServer }) => {
        await mockServer.mockJson(TELESCOPE_PATH, []);
        await mockServer.mockJson(SCHEDULE_PATH, [], { pagination: true });
    });

    test.beforeEach(async ({ page }) => {
        await page.goto('/schedules');
    });

    test('should render empty state', async ({ page }) => {
        await expect(page.getByTestId('no-schedules-row')).toBeVisible();
    });

    test.describe('table columns and customization', () => {
        for (const col of defaultCols) {
            test(`should render default table column ${col}`, async ({ page }) => {
                await expect(page.getByTestId(`TableHeader:${col}`)).toBeVisible();
            });
        }

        // common actions for customize dialog
        const openCustomize = (page: Page) => page.getByTestId('customize-columns-btn').click();
        const saveColumnSelection = (page: Page) => page.getByTestId('save-columns-btn').click();
        const loadColumnSelection = (page: Page) => page.getByTestId('load-columns-btn').click();
        const checkDefaultColumns = async (page: Page) => page.getByTestId('default-columns-btn').click();
        const checkColumn = async (page: Page, col: keyof typeof tableColumns) => {
            await page.getByTestId(`Checkbox:${col}`).check();
        };
        const uncheckAllColumns = async (page: Page) => {
            for (const col of Object.keys(tableColumns)) {
                await page.getByTestId(`Checkbox:${col}`).uncheck();
            }
        };

        test('should render customize columns dialog', async ({ page }) => {
            await openCustomize(page);
            await expect(page.getByTestId('customize-columns-dialog')).toBeVisible();
        });

        test('should not render columns when unchecked.', async ({ page }) => {
            await openCustomize(page);
            await uncheckAllColumns(page);
            await saveColumnSelection(page);

            for (const col of Object.keys(tableColumns)) {
                await test.step(`should not render ${col}`, async () => {
                    await expect.soft(page.getByTestId(`TableHeader:${col}`)).not.toBeVisible();
                });
            }
        });

        test('should show default columns when reloaded and all unchecked', async ({ page }) => {
            await openCustomize(page);
            await uncheckAllColumns(page);
            await saveColumnSelection(page);
            await page.reload();

            for (const col of defaultCols) {
                await test.step(`should show table column ${col}`, async () => {
                    await expect.soft(page.getByTestId(`TableHeader:${col}`)).toBeVisible();
                });
            }
        });

        test('should load column selection from cookie', async ({ page }) => {
            await openCustomize(page);
            await uncheckAllColumns(page);
            await checkColumn(page, 'observatoryTelescope');
            await saveColumnSelection(page);

            await page.reload();

            await openCustomize(page);
            await loadColumnSelection(page);

            for (const col of Object.keys(tableColumns)) {
                await test.step(`should not render ${col} column when unchecked`, async () => {
                    if (col === 'observatoryTelescope') {
                        await expect.soft(page.getByTestId(`TableHeader:${col}`)).toBeVisible();
                    } else {
                        await expect.soft(page.getByTestId(`TableHeader:${col}`)).not.toBeVisible();
                    }
                });
            }
        });

        test(`should reset to default columns when default columns are checked and saved`, async ({ page }) => {
            await openCustomize(page);
            await checkDefaultColumns(page);
            await saveColumnSelection(page);
            await page.reload();

            for (const col of defaultCols) {
                await test.step(`should show default column ${col}`, async () => {
                    await expect.soft(page.getByTestId(`TableHeader:${col}`)).toBeVisible();
                });
            }
        });

        test('should resolve to default columns when deleting cookie', async ({ page }) => {
            await page.context().clearCookies();
            await page.reload();

            for (const col of defaultCols) {
                await test.step(`should show default column ${col}`, async () => {
                    await expect.soft(page.getByTestId(`TableHeader:${col}`)).toBeVisible();
                });
            }
        });
    });

    test('filter params', async ({ page }) => {
        await page.getByTestId('schedule-section-collapse').click();

        const filters = page.getByTestId('schedule-filters');

        await test.step('should render filter inputs', async () => {
            await expect(filters.getByLabel('Schedule Name')).toBeVisible();
            await expect(filters.getByLabel('Status')).toBeVisible();
            await expect(filters.getByLabel('Fidelity')).toBeVisible();
            await expect(filters.getByLabel('External ID')).toBeVisible();
            await expect(filters.getByTestId('DateRangeInput')).toBeVisible();
        });

        await test.step('should include params in url when search is clicked', async () => {
            const searchBtn = page.getByTestId('search-btn');

            await filters.getByLabel('Schedule Name').fill('Test Schedule');
            await filters.getByLabel('Status').selectOption('scheduled');
            await filters.getByLabel('Fidelity').selectOption('high');
            await filters.getByLabel('External ID').fill('external-123');
            await filters.getByTestId('DatetimeInput:date-begin').fill('2024-01-01');
            await filters.getByTestId('DatetimeInput:date-end').fill('2024-01-02');
            await filters.getByTestId('DatetimeInput:time-end').fill('23:59:59');

            await searchBtn.click();

            // wait for new search to land before asserting url params
            await expect(page).toHaveURL(/\?/);

            const params = new URL(page.url()).searchParams;

            // Follows test playwright parametrize
            // see: https://playwright.dev/docs/test-parameterize
            const expected = [
                ['name', 'Test Schedule'],
                ['status', 'scheduled'],
                ['fidelity', 'high'],
                ['external_id', 'external-123'],
                ['date_range_begin', '2024-01-01T00:00:00.000'],
                ['date_range_end', '2024-01-02T23:59:59.000'],
            ];

            for (const [key, value] of expected) {
                await test.step(`should include filter param ${key} in url`, () => {
                    expect.soft(params.get(key), `param "${key}"`).toBe(value);
                });
            }
        });
    });
});

test('schedules exist on load', async ({ page, mockServer, fake }) => {
    await mockServer.mockJson(TELESCOPE_PATH, []);

    const fakeSchedule = fake.schedule();
    await mockServer.mockJson(SCHEDULE_PATH, [fakeSchedule], { pagination: true });

    await page.goto('/schedules');

    await test.step('should render schedule row', async () => {
        await expect(page.getByTestId(`schedule-row:${fakeSchedule.id}`)).toBeVisible();
    });

    await test.step('should render total number of schedules', async () => {
        await expect(page.getByTestId('Section:schedules').getByRole('heading')).toContainText('1');
    });
});
