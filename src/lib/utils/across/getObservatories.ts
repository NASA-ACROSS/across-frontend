import logger from '$lib/logger';
import type { Observatory } from '$lib/types/across/Observatory';
import searchParams from '../searchParams/searchParams';
import logger from '$lib/logger';

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
        response = await fetch(requestUrl, { method: 'GET' });
    } catch (err) {
        logger.error({ err }, 'Request failed while fetching observatories');
        throw new Error('Unexpected Error while fetching observatories');
    }

    // catch known errors from api and hide error from user
    const errorCodes = [500, 404, 401];
    if (errorCodes.includes(response.status)) {
        logger.error({ status: response.status }, 'Error getting observatories');
    }

    let observatories = (await response.json()) as Observatory[] | Observatory;

    if (!Array.isArray(observatories)) {
        observatories = [observatories];
    }

    return observatories;
};
