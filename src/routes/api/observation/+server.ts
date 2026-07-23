import { CONFIG } from '$config/config';
import { type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, fetch }) => {
    const apiUrl = `${CONFIG.ACROSS_SERVER_URL}/observation?${url.searchParams}`;

    const res = await fetch(apiUrl, { method: 'GET' });

    return res;
};
