import { CONFIG } from '$config/config';
import { type Observatory } from '$lib/types/across/Observatory';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ fetch, params, url }) => {
    if (!params.observatoryShortName) return json({ message: 'Missing observatory name' }, { status: 400 });

    const apiUrl = `${CONFIG.API_URL}/observatory?name=${params.observatoryShortName}&${url.searchParams}`;

    console.log(`Fetching observatory with URL: ${apiUrl}`); // Debug log to check the request URL

    const res = await fetch(`${apiUrl}`, {
        method: 'GET',
    });

    // catch known errors from api and hide error from user
    const errorCodes = [500, 404, 401, 403];
    if (errorCodes.includes(res.status)) {
        console.error(`ERROR: getting observatory [${params.observatoryShortName}] at [${Date.now()}] with status code [${res.status}]`);
    }

    const body = (await res.json()) as Observatory;
    return json(body, { status: res.status });
};
