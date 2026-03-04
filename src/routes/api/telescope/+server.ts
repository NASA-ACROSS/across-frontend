import { resolve } from '$app/paths';
import { CONFIG } from '$config/config';
import { type Telescope } from '$lib/types/across/Telescope';
import { json, redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, fetch, cookies }) => {
    const urlParams = url.searchParams;

    console.log('URL Params:', Array.from(urlParams.entries())); // Debug log to check incoming URL parameters

    const res = await fetch(`${CONFIG.API_URL}/telescope`, {
        method: 'GET',
    });

    // catch known errors from api and hide error from user
    const errorCodes = [500, 404, 401, 403];
    if (errorCodes.includes(res.status)) {
        console.error('ERROR: getting telescopes', { status: res.status, timestamp: Date.now() });
        cookies.delete('user-login', { path: '/' });
        redirect(302, resolve('/user/login'));
    }

    const body = (await res.json()) as Telescope[];
    return json(body, { status: res.status });
};
