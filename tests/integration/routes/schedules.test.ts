import { test, expect } from '../fixtures/mockserver.fixture';
import type { Schedule } from '$lib/types/across/Schedule';

const TELESCOPE_PATH = '/v1/telescope';
const SCHEDULE_PATH = '/v1/schedule';

const buildSchedule = (overrides: Partial<Schedule>): Schedule => ({
    telescope_id: 'telescope-1',
    name: 'Test Schedule',
    date_range: { begin: '2024-01-01T00:00:00', end: '2024-01-02T00:00:00' },
    status: 'scheduled',
    fidelity: 'high',
    id: 'schedule-1',
    observations: [],
    observation_count: 0,
    created_on: '2024-01-01T00:00:00',
    created_by_id: 'user-1',
    checksum: 'checksum-1',
    ...overrides,
});

// key-value is column id: is selected by default
const tableColumns = {
    observatory_telescope: 1,
    name: 1,
    external_id: 0,
    date_begin: 1,
    date_end: 1,
    status: 1,
    fidelity: 1,
    number_of_observations: 1,
};

const defaultCols = Object.entries(tableColumns)
    .filter(([, value]) => value === 1)
    .map(([key]) => key);

test.describe('Initial Load without schedules', () => {
    test.beforeAll(async ({ mockServer }) => {
        await mockServer.mockJson(TELESCOPE_PATH, []);
        await mockServer.mockJson(SCHEDULE_PATH, [], { paginate: true });
    });

    test.beforeEach(async ({ page }) => {
        await page.goto('/schedules');
    });

    test('should render empty state', async ({ page }) => {
        await expect(page.getByTestId('no-schedules-row')).toBeVisible();
    });

    test('table columns and customization', async ({ page }) => {
        for (const col of defaultCols) {
            await test.step(`should render default table column ${col}`, async () => {
                await expect(page.getByTestId(`TableHeader:${col}`)).toBeVisible();
            });
        }

        // common actions for customize dialog
        const openCustomize = () => page.getByTestId('customize-columns-btn').click();
        const saveColumnSelection = () => page.getByTestId('save-columns-btn').click();
        const loadColumnSelection = () => page.getByTestId('load-columns-btn').click();
        const checkDefaultColumns = async () => page.getByTestId('default-columns-btn').click();
        const uncheckAllColumns = async () => {
            for (const col of Object.keys(tableColumns)) {
                await page.getByTestId(`Checkbox:${col}`).uncheck();
            }
        };

        await openCustomize();

        await test.step('should render customize columns dialog', async () => {
            await expect(page.getByTestId('customize-columns-dialog')).toBeVisible();
        });

        for (const col of defaultCols) {
            await test.step(`should have default column ${col} checked`, async () => {
                await expect.soft(page.getByTestId(`Checkbox:${col}`)).toBeChecked();
            });
        }

        await test.step('should not render columns when unchecked.', async () => {
            await uncheckAllColumns();
            await saveColumnSelection();

            for (const col of Object.keys(tableColumns)) {
                await test.step(`should not render ${col}`, async () => {
                    await expect.soft(page.getByTestId(`TableHeader:${col}`)).not.toBeVisible();
                });
            }
        });

        await page.reload();

        await test.step('should show default columns when reloaded and all unchecked', async () => {
            for (const col of defaultCols) {
                await test.step(`should show table column ${col}`, async () => {
                    await expect.soft(page.getByTestId(`TableHeader:${col}`)).toBeVisible();
                });
            }
        });

        await test.step('should load column selection from cookie', async () => {
            await openCustomize();
            await loadColumnSelection();

            for (const col of Object.keys(tableColumns)) {
                await test.step(`should not render ${col} column when unchecked`, async () => {
                    await expect.soft(page.getByTestId(`TableHeader:${col}`)).not.toBeVisible();
                });
            }
        });

        await test.step(`should reset to default columns when default columns are checked and saved`, async () => {
            await checkDefaultColumns();
            await saveColumnSelection();

            for (const col of defaultCols) {
                await test.step(`should show default column ${col}`, async () => {
                    await expect.soft(page.getByTestId(`TableHeader:${col}`)).toBeVisible();
                });
            }
        });

        await test.step('should use cookie for column selection when reloaded', async () => {
            await openCustomize();
            await page.getByTestId('Checkbox:observatory_telescope').uncheck();
            await saveColumnSelection();
            await page.reload();

            await expect.soft(page.getByTestId('TableHeader:observatory_telescope')).not.toBeVisible();
        });

        await test.step('should resolve to default columns when deleting cookie', async () => {
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

test('schedules exist on load', async ({ page, mockServer }) => {
    await mockServer.mockJson(TELESCOPE_PATH, []);

    const scheduleA = buildSchedule({ id: 'schedule-a', name: 'First Schedule' });
    await mockServer.mockJson(SCHEDULE_PATH, [scheduleA], { paginate: true });

    await page.goto('/schedules');

    await test.step('should render schedule row', async () => {
        await expect(page.getByTestId(`schedule-row:${scheduleA.id}`)).toBeVisible();
    });

    await test.step('should render total number of schedules', async () => {
        await expect(page.getByTestId('Section:schedules').getByRole('heading')).toContainText('1');
    });
});
