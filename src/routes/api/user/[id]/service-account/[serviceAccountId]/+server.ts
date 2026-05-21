import { CONFIG } from '$config/config';
import type { ServiceAccountDetail } from '$lib/types/User/ServiceAccountDetail';
import { json, type RequestHandler } from '@sveltejs/kit';

/**
 * GET user service account by id
 * @param event
 * @returns ServiceAccountDetail
 */
export const GET: RequestHandler = async (event) => {
    const { fetch, params } = event;

    if (!params.id) return json({ message: 'Missing user id' }, { status: 400 });
    if (!params.serviceAccountId) return json({ message: 'Missing service account id' }, { status: 400 });

    const res = await fetch(`${CONFIG.ACROSS_SERVER_URL}/user/${params.id}/service-account/${params.serviceAccountId}`, {
        method: 'GET',
    });

    // catch known errors from api and hide error from user
    const errorCodes = [500, 404, 401, 403];
    if (errorCodes.includes(res.status)) {
        console.error(`ERROR: getting user service account for user`, { user: params.id, serviceAccount: params?.serviceAccountId });
    }

    const body = (await res.json()) as ServiceAccountDetail;
    return json(body, { status: res.status });
};
