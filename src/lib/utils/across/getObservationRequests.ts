import type { ObservationRequest } from '$lib/types/across/ObservationRequest';
import type { Paginate } from '$lib/types/Paginate';
import searchParams from '../searchParams/searchParams';
import { callApi } from './callApi';

type GetObservationRequestParams = {
    ids?: string[];
    include_versions?: boolean;
};

export const getObservationRequests = async (
    fetch: typeof window.fetch,
    params?: GetObservationRequestParams
): Promise<Paginate<ObservationRequest>> => {
    const path = '/observation-request/';
    const qp = searchParams.serialize(params, { ids: 'array' });
    const route = `${qp.toString() ? `${path}?${qp}` : path}`;

    const { data: observationRequests } = await callApi<Paginate<ObservationRequest>>(fetch, route, { method: 'GET' });

    return observationRequests;
};
