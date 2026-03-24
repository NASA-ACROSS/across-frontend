import { CONFIG } from '$config/config';
import { type Telescope } from '$lib/types/across/Telescope';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ fetch }) => {
    const res = await fetch(`${CONFIG.API_URL}/telescope`, {
        method: 'GET',
    });

    // catch known errors from api and hide error from user
    const errorCodes = [500, 401, 403];
    if (errorCodes.includes(res.status)) {
        console.error('ERROR: getting telescopes', { status: res.status, timestamp: Date.now() });
    }

    const body = (await res.json()) as Telescope[];
    return json(body, { status: res.status });
};
