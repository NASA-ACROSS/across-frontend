import { resolve } from '$app/paths';
import { CONFIG } from '$config/config';
import logger from '$lib/logger';
import { type Observatory } from '$lib/types/across/Observatory';
import { json, redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ fetch, params }) => {
    if (!params.id) return json({ message: 'Missing observatory id' }, { status: 400 });

    const res = await fetch(`${CONFIG.ACROSS_SERVER_URL}/observatory/${params.id}`, {
        method: 'GET',
    });

    // catch known errors from api and hide error from user
    const errorCodes = [500, 404, 401, 403];
    if (errorCodes.includes(res.status)) {
<<<<<<< HEAD
        logger.error({ observatoryId: params.id, status: res.status }, 'Error fetching observatory data');
=======
        logger.error({ msg: `Failed to get observatory.`, status: res.status, observatoryId: params.id });
>>>>>>> d3d4c8c (feat: use pino logger)
        redirect(302, resolve('/user/login'));
    }

    const body = (await res.json()) as Observatory;
    return json(body, { status: res.status });
};
