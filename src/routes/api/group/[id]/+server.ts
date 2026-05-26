import { resolve } from '$app/paths';
import { CONFIG } from '$config/config';
import logger from '$lib/logger';
import type { Group } from '$lib/types/User/Group';
import { json, redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ fetch, params }) => {
    if (!params.id) return json({ message: 'Missing group id' }, { status: 400 });

    const res = await fetch(`${CONFIG.ACROSS_SERVER_URL}/group/${params.id}`, {
        method: 'GET',
    });

    // catch known errors from api and hide error from user
    const errorCodes = [500, 404, 401];
    if (errorCodes.includes(res.status)) {
        logger.error({ msg: `Failed to get group.`, status: res.status, groupId: params.id });
        redirect(302, resolve('/user/login'));
    }

    const body = (await res.json()) as Group;
    return json(body, { status: res.status });
};
