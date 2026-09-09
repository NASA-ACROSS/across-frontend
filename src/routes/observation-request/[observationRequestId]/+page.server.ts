import type { Telescope } from '$lib/types/across/Telescope';
import { getObservationRequests } from '$lib/utils/across/getObservationRequests';
import { getTelescopes } from '$lib/utils/across/getTelescopes';
import type { PageServerLoad, RequestEvent } from './$types';

export const load: PageServerLoad = async ({ params, fetch }: RequestEvent) => {
    const observationRequest = await getObservationRequests(fetch, { ids: [params.observationRequestId], include_versions: true });

    const instrumentId: string = observationRequest.items[0].instrument_id;

    const telescopes: Telescope[] = await getTelescopes(fetch, { instrument_id: instrumentId });

    return {
        observationRequest,
        telescopes,
        slug: params.observationRequestId,
    };
};
