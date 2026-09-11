import type { Telescope } from '$lib/types/across/Telescope';
import { getObservationRequests } from '$lib/utils/across/getObservationRequests';
import { getTelescopes } from '$lib/utils/across/getTelescopes';
import { error } from '@sveltejs/kit';
import type { PageServerLoad, RequestEvent } from './$types';
import { HTTP_CODES } from '$lib';

export const load: PageServerLoad = async ({ params, fetch }: RequestEvent) => {
    const observationRequest = await getObservationRequests(fetch, { ids: [params.observationRequestId], include_versions: true });
    if (!observationRequest?.items?.length) {
        error(404, {
            message: 'Observation Request Not Found',
            errorId: crypto.randomUUID(),
            code: HTTP_CODES[404],
        });
    }

    const instrumentId: string = observationRequest.items[0].instrument_id;

    const telescopes: Telescope[] = await getTelescopes(fetch, { instrument_id: instrumentId });

    return {
        observationRequest,
        telescopes,
    };
};
