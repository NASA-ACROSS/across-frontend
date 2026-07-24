import { CONFIG } from '$config/config';
import type { Telescope } from '$lib/types/across/Telescope';
import searchParams from '../searchParams/searchParams';
import { callApi } from './callApi';

type GetTelescopesParams = {
    observatory_id?: string;
    include_filters?: boolean;
    include_footprints?: boolean;
};

export const getTelescopes = async (fetch: typeof window.fetch, params?: GetTelescopesParams) => {
    const url = new URL(`${CONFIG.ACROSS_SERVER_URL}/telescope/`);
    const qp = searchParams.serialize(params);
    url.search = qp.toString();

    const telescopes = await callApi<Telescope[] | Telescope>(fetch, url, {
        method: 'GET',
    });

    if (!Array.isArray(telescopes)) return [telescopes];
    return telescopes;
};
