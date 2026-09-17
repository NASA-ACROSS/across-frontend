import type { Telescope } from '$lib/types/across/Telescope';
import { getObservationRequests } from '$lib/utils/across/getObservationRequests';
import { getTelescopes } from '$lib/utils/across/getTelescopes';
import { error } from '@sveltejs/kit';
import type { PageServerLoad, RequestEvent } from './$types';
import { HTTP_CODES } from '$lib';

export const load: PageServerLoad = async ({ params, fetch }: RequestEvent) => {
    const { items: observationRequests } = await getObservationRequests(fetch, {
        ids: [params.observationRequestId],
        include_versions: true,
    });
    if (!observationRequests?.length) {
        error(404, {
            message: 'Observation Request Not Found',
            errorId: crypto.randomUUID(),
            code: HTTP_CODES[404],
        });
    }

    const observationRequest = observationRequests[0];
    const instrumentId: string = observationRequest.instrument_id;
    const telescopes: Telescope[] = await getTelescopes(fetch, { instrument_id: instrumentId });

    return {
        observationRequest,
        telescopes,
    };
};
