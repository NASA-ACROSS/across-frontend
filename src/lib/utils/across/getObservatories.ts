import type { Observatory } from '$lib/types/across/Observatory';
import searchParams from '../searchParams/searchParams';

type GetObservatoryParams = {
    name?: string;
};

export const getObservatories = async (fetch: typeof window.fetch, params?: GetObservatoryParams) => {
    const apiUrl = '/api/observatory';

    let requestUrl = apiUrl;

    const qp = searchParams.serialize(params);
    if (qp.entries().toArray().length) requestUrl = `${requestUrl}?${qp}`;

    let response;
    try {
        console.debug('calling to API Route [GET /api/observatory] with URL:', requestUrl); // Debug log to check the request URL
        response = await fetch(requestUrl, { method: 'GET' });
    } catch (e) {
        console.error(`ERROR: catch getting observatories at [${Date.now()}]`, JSON.stringify(e));
        throw new Error('Unexpected Error while fetching observatories');
    }

    // catch known errors from api and hide error from user
    const errorCodes = [500, 404, 401];
    if (errorCodes.includes(response.status)) {
        console.error(`ERROR: getting observatories at [${Date.now()}] with status code [${response.status}]`);
    }

    let observatories = (await response.json()) as Observatory[] | Observatory;

    if (!Array.isArray(observatories)) {
        observatories = [observatories];
    }

    return observatories;
};
