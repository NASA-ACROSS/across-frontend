import type { Telescope } from '$lib/types/across/Telescope';
import searchParams from '../searchParams/searchParams';

type GetTelescopesParams = {
    ids?: string[];
    include_filters?: boolean;
};

export const getTelescopes = async (fetch: typeof window.fetch, params?: GetTelescopesParams) => {
    const qp = searchParams.serialize(params, { ids: 'array' });

    const url = `/api/telescope${qp.toString() ? `?${qp}` : ''}`;

    console.debug('calling to API Route [GET /api/telescope] with URL:', url);

    const response = await fetch(url, {
        method: 'GET',
    });

    // catch known errors from api and hide error from user
    const errorCodes = [500, 404, 401];
    if (errorCodes.includes(response.status)) {
        const errorText = `ERROR: getting telescopes at [${Date.now()}] with status code [${response.status}]`;
        console.error(errorText);
        throw new Error(errorText);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    let telescopes: Telescope[] = await response.json();

    if (!Array.isArray(telescopes)) {
        telescopes = [telescopes];
    }

    return telescopes;
};
