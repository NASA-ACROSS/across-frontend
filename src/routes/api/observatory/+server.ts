import { CONFIG } from '$config/config';
import searchParams from '$lib/utils/searchParams/searchParams';
import { type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ fetch, url }) => {
    let apiUrl = `${CONFIG.ACROSS_SERVER_URL}/observatory`;

    const qp = searchParams.serialize({
        ...Object.fromEntries(url.searchParams.entries()),
    });

    if (qp.entries().toArray().length) apiUrl = apiUrl.concat(`?${qp}`);

    const res = await fetch(`${apiUrl}`, {
        method: 'GET',
    });

    return res;
};
