import { CONFIG } from '$config/config';
import logger from '$lib/logger';
import { type Observatory } from '$lib/types/across/Observatory';
import searchParams from '$lib/utils/searchParams/searchParams';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ fetch, url }) => {
    let apiUrl = `${CONFIG.ACROSS_SERVER_URL}/observatory`;

    const qp = searchParams.serialize({
        ...Object.fromEntries(url.searchParams.entries()),
    });

    if (qp.entries().toArray().length) apiUrl = apiUrl.concat(`?${qp}`);

    const res = await fetch(`${apiUrl}`, {
        method: 'GET',
    });

    // catch known errors from api and hide error from user
    const errorCodes = [500, 404, 401, 403];
    if (errorCodes.includes(res.status)) {
        logger.error({ msg: 'Failed to get observatories.', status: res.status });
    }

    const body = (await res.json()) as Observatory[];
    return json(body, { status: res.status });
};
