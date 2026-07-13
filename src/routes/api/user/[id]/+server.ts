import { resolve } from '$app/paths';
import { CONFIG } from '$config/config';
import { clearAuth } from '$lib/handles/clearAuth';
import logger from '$lib/logger';
import type { User } from '$lib/types/User/User';
import { json, redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async (event) => {
    const { locals, fetch, params } = event;

    if (!params.id) return json({ message: 'Missing user id' }, { status: 400 });

    const res = await fetch(`${CONFIG.ACROSS_SERVER_URL}/user/${params.id}`, {
        method: 'GET',
    });

    // catch known errors from api and hide error from user
    const errorCodes = [500, 404, 401, 403];
    if (errorCodes.includes(res.status)) {
        logger.error({ email: locals.user?.email, status: res.status, userId: params.id }, 'Error fetching user');
        clearAuth(event);
        redirect(302, resolve('/user/login'));
    }

    const body = (await res.json()) as User;
    return json(body, { status: res.status });
};
