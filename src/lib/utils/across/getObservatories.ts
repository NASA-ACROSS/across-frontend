import type { Observatory } from '$lib/types/across/Observatory';
import searchParams from '../searchParams/searchParams';
import { callApi } from './callApi';

type GetObservatoryParams = {
    name?: string;
};

export const getObservatories = async (fetch: typeof window.fetch, params?: GetObservatoryParams) => {
    const apiUrl = '/api/observatory';

    let requestUrl = apiUrl;

    const qp = searchParams.serialize(params);
    if (qp.entries().toArray().length) requestUrl = `${requestUrl}?${qp}`;

    const observatories = await callApi<Observatory[] | Observatory>(fetch, requestUrl, {
        method: 'GET',
    });

    if (!Array.isArray(observatories)) return [observatories];
    return observatories;
};
