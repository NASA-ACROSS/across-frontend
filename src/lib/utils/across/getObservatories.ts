import type { Observatory } from '$lib/types/across/Observatory';
import searchParams from '../searchParams/searchParams';
import { callApi } from './callApi';

type GetObservatoryParams = {
    name?: string;
};

export const getObservatories = async (fetch: typeof window.fetch, params?: GetObservatoryParams) => {
    let route = '/observatory';
    const qp = searchParams.serialize(params);
    if (qp.entries().toArray().length) route = `${route}?${qp}`;

    const { data: observatories } = await callApi<Observatory[] | Observatory>(fetch, route, {
        method: 'GET',
    });

    if (!Array.isArray(observatories)) return [observatories];
    return observatories;
};
