import type { Telescope } from '$lib/types/across/Telescope';
import { getObservationRequests } from '$lib/utils/across/getObservationRequests';
import { getTelescopes } from '$lib/utils/across/getTelescopes';
import type { PageServerLoad, RequestEvent } from './$types';

export const load: PageServerLoad = async ({ params, fetch }: RequestEvent) => {
    const observationRequest = await getObservationRequests(fetch, { ids: [params.observationRequestId], include_versions: true });
    console.log(observationRequest);

    const instrumentId: string = observationRequest.items[0].instrument_id;
    console.log('instrumentId', instrumentId);

    const telescopes: Telescope[] = await getTelescopes(fetch, { instrument_id: instrumentId });
    console.log('telescopes', telescopes);

    return {
        observationRequest,
        telescopes,
    };
};
