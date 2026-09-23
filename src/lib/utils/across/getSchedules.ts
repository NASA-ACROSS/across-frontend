import type { Schedule } from '$lib/types/across/Schedule';
import type { Paginate } from '$lib/types/Paginate';
import searchParams from '../searchParams/searchParams';

import { callApi } from './callApi';

type GetSchedulesParams = {
    telescopeIds: string[];
};

export const getSchedules = async (fetch: typeof globalThis.fetch, params?: GetSchedulesParams) => {
    const path = '/schedule/';
    const qp = searchParams.serialize(params);
    const route = `${qp.toString() ? `${path}?${qp}` : path}`;

    const { data: schedules } = await callApi<Paginate<Schedule>>(fetch, route, {
        method: 'GET',
    });

    return schedules;
};
