import type { Telescope } from '$lib/types/across/Telescope';
import searchParams from '../searchParams/searchParams';
import { callApi } from './callApi';

type GetTelescopesParams = {
    observatory_id?: string;
    include_filters?: boolean;
    include_footprints?: boolean;
};

export const getTelescopes = async (fetch: typeof window.fetch, params?: GetTelescopesParams) => {
    const path = '/telescope';
    const qp = searchParams.serialize(params);
    const route = `${qp.toString() ? `${path}?${qp}` : path}`;

    const { data: telescopes } = await callApi<Telescope[] | Telescope>(fetch, route, { method: 'GET' });

    if (!Array.isArray(telescopes)) return [telescopes];
    return telescopes;
};
