import { CONFIG } from '$config/config';
import logger from '$lib/logger';
import { type Observation } from '$lib/types/across/Observation';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, fetch }) => {
    const apiUrl = `${CONFIG.ACROSS_SERVER_URL}/observation?${url.searchParams}`;

    const res = await fetch(apiUrl, { method: 'GET' });

    // catch known errors from api and hide error from user
    const errorCodes = [500, 401, 403];
    if (errorCodes.includes(res.status)) {
        logger.error({ msg: 'Failed to get observations.', status: res.status });
    }

    const body = (await res.json()) as Observation[];
    return json(body, { status: res.status });
};
