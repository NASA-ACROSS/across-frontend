import { CONFIG } from '$config/config';
import { type Telescope } from '$lib/types/across/Telescope';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ fetch, url }) => {
    let apiUrl = `${CONFIG.ACROSS_SERVER_URL}/telescope`;
    const qp = new URLSearchParams(url.searchParams);
    if (qp.entries().toArray().length) apiUrl = apiUrl.concat(`?${qp}`);

    console.log(`Fetching telescopes with URL: ${apiUrl}`); // Debug log to check the request URL
    const res = await fetch(apiUrl, { method: 'GET' });

    // catch known errors from api and hide error from user
    const errorCodes = [500, 401, 403];
    if (errorCodes.includes(res.status)) {
        console.error('ERROR: getting telescopes', { status: res.status, timestamp: Date.now() });
    }

    const body = (await res.json()) as Telescope[];
    return json(body, { status: res.status });
};
