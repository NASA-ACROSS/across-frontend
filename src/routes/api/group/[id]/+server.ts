import { resolve } from '$app/paths';
import { CONFIG } from '$config/config';
import logger from '$lib/logger';
import type { User } from '$lib/types/User/User';
import { json, redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ fetch, params }) => {
    if (!params.id) return json({ message: 'Missing group id' }, { status: 400 });

    const res = await fetch(`${CONFIG.ACROSS_SERVER_URL}/group/${params.id}`, {
        method: 'GET',
    });

    // catch known errors from api and hide error from user
    const errorCodes = [500, 404, 401];
    if (errorCodes.includes(res.status)) {
        logger.error({ groupId: params.id, status: res.status }, 'Error fetching group data');
        redirect(302, resolve('/user/login'));
    }

    const body = (await res.json()) as User;
    return json(body, { status: res.status });
};
