import { CONFIG } from '$config/config';
import { type Observation } from '$lib/types/across/Observation';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, fetch }) => {
    const apiUrl = `${CONFIG.API_URL}/observation?${url.searchParams}`;

    const res = await fetch(apiUrl, { method: 'GET' });

    // catch known errors from api and hide error from user
    const errorCodes = [500, 401, 403];
    if (errorCodes.includes(res.status)) {
        console.error('ERROR: getting observations', { status: res.status, timestamp: Date.now() });
    }

    const body = (await res.json()) as Observation[];
    return json(body, { status: res.status });
};
