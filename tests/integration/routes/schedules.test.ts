import { test, expect } from '../fixtures/mockserver.fixture';
import type { Schedule } from '$lib/types/across/Schedule';
import type { Paginate } from '$lib/types/Paginate';

const TELESCOPE_PATH = '/v1/telescope';
const SCHEDULE_PATH = '/v1/schedule';

const paginateBody = <T>(items: T[], page = 0, page_limit = 10): Paginate<T> => ({
    page,
    page_limit,
    total_number: items.length,
    items: items.slice(page * page_limit, (page + 1) * page_limit),
});

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

test('no schedules', async ({ page, mockServer }) => {
    await mockServer.mockJson(TELESCOPE_PATH, []);
    await mockServer.mockJson(SCHEDULE_PATH, paginateBody([]));

    await page.goto('/schedules');

    await test.step('should render empty state when there are no schedules', async () => {
        await expect(page.getByTestId('no-schedules-row')).toBeVisible();
    });
});

test('schedules exist', async ({ page, mockServer }) => {
    await mockServer.mockJson(TELESCOPE_PATH, []);

    const scheduleA = buildSchedule({ id: 'schedule-a', name: 'First Schedule' });

    await mockServer.mockJson(SCHEDULE_PATH, paginateBody([scheduleA]));

    await page.goto('/schedules');
    await expect(page.getByTestId(`schedule-row:${scheduleA.id}`)).toBeVisible();
});
