import logger from '$lib/logger';
import type { Telescope } from '$lib/types/across/Telescope';
import searchParams from '../searchParams/searchParams';

type GetTelescopesParams = {
    observatory_id?: string;
    include_filters?: boolean;
    include_footprints?: boolean;
};

export const getTelescopes = async (fetch: typeof window.fetch, params?: GetTelescopesParams) => {
    const qp = searchParams.serialize(params);

    const url = `/api/telescope${qp.toString() ? `?${qp}` : ''}`;

    const response = await fetch(url, {
        method: 'GET',
    });

    // catch known errors from api and hide error from user
    const errorCodes = [500, 404, 401];
    if (errorCodes.includes(response.status)) {
        const errorText = `Failed getting telescopes.`;
        logger.error({ status: response.status }, errorText);
        throw new Error(errorText);
    }

    let telescopes = (await response.json()) as Telescope[];

    if (!Array.isArray(telescopes)) {
        telescopes = [telescopes];
    }

    return telescopes;
};
