import { resolve } from '$app/paths';
import { CONFIG } from '$config/config';
import type { User } from '$lib/types/User/User';
import { json, redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals, fetch, params, cookies }) => {
    if (!params.id) return json({ message: 'Missing user id' }, { status: 400 });

    const res = await fetch(`${CONFIG.API_URL}/user/${params.id}`, {
        method: 'GET',
    });

    // catch known errors from api and hide error from user
    const errorCodes = [500, 404, 401, 403];
    if (errorCodes.includes(res.status)) {
        console.error(`ERROR: getting user roles [${locals.user?.email}] at [${Date.now()}] with status code [${res.status}]`);
        cookies.delete('user-login', { path: '/' });
        redirect(302, resolve('/user/login'));
    }

    const body = (await res.json()) as User;
    return json(body, { status: res.status });
};
