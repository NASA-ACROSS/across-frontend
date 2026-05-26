import { CONFIG } from '../../../config/config';
import type { Schedule } from '$lib/types/across/Schedule';
import type { Paginate } from '$lib/types/Paginate';
import logger from '$lib/logger';

export const getSchedules = async (telescopeIds: string[], fetch: typeof window.fetch) => {
    const options: RequestInit = {
        method: 'GET',
    };

    const url = new URL(`${CONFIG.ACROSS_SERVER_URL}/schedule/`);
    const params = {
        telescopeIds: telescopeIds.toString(),
    };
    url.search = new URLSearchParams(params).toString();

    let response;
    try {
        response = await fetch(url, options);
    } catch (err) {
        logger.error({ err }, 'Request failed while fetching schedules');
        throw new Error('Unexpected Error while fetching schedules');
    }

    // catch known errors from api and hide error from user
    const errorCodes = [500, 404, 401];
    if (errorCodes.includes(response.status)) {
        logger.error({ msg: 'Error getting schedules', status: response.status });
    }

    const schedules = (await response.json()) as Paginate<Schedule>;

    return schedules;
};
