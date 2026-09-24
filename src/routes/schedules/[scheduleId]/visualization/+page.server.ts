import { CONFIG } from '$config/config';
import type { Paginate } from '$lib/types/Paginate';
import type { Observation } from '$lib/types/across/Observation';
import type { PageServerLoad } from './$types';

type ObservationWithUnknownFields = Observation & Record<string, unknown>;

const PAGE_LIMIT = 1000;

const emptyResponse = {
    scheduleId: '',
    observations: [] as ObservationWithUnknownFields[],
    totalCount: 0,
    error: '',
};

const getScheduleObservations = async (fetchFn: typeof fetch, scheduleId: string): Promise<Paginate<ObservationWithUnknownFields>> => {
    let page = 1;
    const items: ObservationWithUnknownFields[] = [];
    let totalNumber = 0;

    while (true) {
        const searchParams = new URLSearchParams({
            schedule_ids: scheduleId,
            include_footprints: 'true',
            page_limit: String(PAGE_LIMIT),
            page: String(page),
        });

        const response = await fetchFn(`${CONFIG.ACROSS_SERVER_URL}/observation?${searchParams.toString()}`, {
            method: 'GET',
        });

        if (!response.ok) {
            const detail = await response.text();
            throw new Error(`Failed to load schedule observations (${response.status}): ${detail}`);
        }

        const body = (await response.json()) as Paginate<ObservationWithUnknownFields>;

        items.push(...body.items);
        totalNumber = body.total_number;

        if (items.length >= totalNumber || body.items.length === 0) {
            break;
        }

        page += 1;
    }

    return {
        page: 1,
        page_limit: PAGE_LIMIT,
        total_number: totalNumber,
        items,
    };
};

export const load: PageServerLoad = async ({ fetch, params }) => {
    const scheduleId = params.scheduleId;

    if (!scheduleId) {
        return {
            ...emptyResponse,
            error: 'Missing schedule id.',
        };
    }

    try {
        const observationsResponse = await getScheduleObservations(fetch, scheduleId);

        return {
            scheduleId,
            observations: observationsResponse.items,
            totalCount: observationsResponse.total_number,
            error: '',
        };
    } catch (err) {
        console.error('Error loading schedule footprint visualization data:', err);

        return {
            scheduleId,
            observations: [],
            totalCount: 0,
            error: 'Failed to load schedule observations for visualization.',
        };
    }
};
