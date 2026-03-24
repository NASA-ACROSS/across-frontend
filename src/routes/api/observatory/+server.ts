import { CONFIG } from '$config/config';
import { type Observatory } from '$lib/types/across/Observatory';
import searchParams from '$lib/utils/searchParams/searchParams';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ fetch, url }) => {
    let apiUrl = `${CONFIG.API_URL}/observatory`;

    const qp = searchParams.serialize({
        ...Object.fromEntries(url.searchParams.entries()),
    });

    if (qp.entries().toArray().length) apiUrl = apiUrl.concat(`?${qp}`);

    console.debug(`Fetching Observatory from ACROSS API: ${apiUrl}`); // Debug log to check the request URL
    const res = await fetch(`${apiUrl}`, {
        method: 'GET',
    });

    // catch known errors from api and hide error from user
    const errorCodes = [500, 404, 401, 403];
    if (errorCodes.includes(res.status)) {
        console.error('ERROR: getting observatories', { status: res.status, timestamp: Date.now() });
    }

    const body = (await res.json()) as Observatory[];
    return json(body, { status: res.status });
};
