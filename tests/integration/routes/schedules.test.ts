import { test, expect } from '../fixtures/mock-server.fixture';
import type { Schedule } from '$lib/types/across/Schedule';
import type { Paginate } from '$lib/types/Paginate';

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

test('renders the empty state when there are no schedules', async ({ page, mockServer }) => {
    await mockServer.mockJson(TELESCOPE_PATH, []);
    await mockServer.mockJson(SCHEDULE_PATH, { total_number: 0, items: [] } satisfies Paginate<Schedule>);

    await page.goto('/schedules');

    await expect(page.getByTestId('no-schedules-row')).toBeVisible();
});

test('reflects updated schedule data across repeated page loads using a stateful scenario', async ({ page, mockServer }) => {
    // Doesn't change between loads, so a single (non-scenario) expectation is enough.
    await mockServer.mockJson(TELESCOPE_PATH, []);

    const scheduleA = buildSchedule({ id: 'schedule-a', name: 'First Schedule' });
    const scheduleB = buildSchedule({ id: 'schedule-b', name: 'Second Schedule' });

    // Stateful scenario: the same request (GET /v1/schedule) returns different data on each
    // successive call, modelling e.g. the ACROSS server's data changing between polls/reloads.
    // See https://www.mock-server.com/mock_server/stateful_scenarios.html
    const scenarioName = `${mockServer.testId}:schedules`;

    await mockServer.client.mockAnyResponse({
        httpRequest: { method: 'GET', path: SCHEDULE_PATH },
        httpResponse: {
            statusCode: 200,
            headers: { 'content-type': ['application/json'] },
            body: JSON.stringify({ total_number: 1, items: [scheduleA] } satisfies Paginate<Schedule>),
        },
        namespace: mockServer.testId,
        scenarioName,
        scenarioState: 'Started',
        newScenarioState: 'Refreshed',
    });

    await mockServer.client.mockAnyResponse({
        httpRequest: { method: 'GET', path: SCHEDULE_PATH },
        httpResponse: {
            statusCode: 200,
            headers: { 'content-type': ['application/json'] },
            body: JSON.stringify({ total_number: 1, items: [scheduleB] } satisfies Paginate<Schedule>),
        },
        namespace: mockServer.testId,
        scenarioName,
        scenarioState: 'Refreshed',
    });

    await page.goto('/schedules');
    await expect(page.getByTestId(`schedule-row:${scheduleA.id}`)).toBeVisible();

    await page.reload();
    await expect(page.getByTestId(`schedule-row:${scheduleB.id}`)).toBeVisible();
    await expect(page.getByTestId(`schedule-row:${scheduleA.id}`)).not.toBeVisible();
});
