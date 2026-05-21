import { CONFIG } from '../../../../../config/config';
import type { ServiceAccountDetail } from '$lib/types/User/ServiceAccountDetail';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async (event) => {
    const { locals, fetch, params } = event;

    const options = {
        method: 'GET',
    };

    let response;
    try {
        response = await fetch(`${CONFIG.ACROSS_SERVER_URL}/user/${params.id}/service-account`, options);
    } catch (e) {
        console.error('ERROR: getting service accounts', {
            userId: params.id,
            time: Date.now(),
            error: JSON.stringify(e),
        });
        throw new Error('Unexpected Error while fetching service accounts');
    }

    // catch known errors from api and hide error from user
    const errorCodes = [500, 404, 401];
    if (errorCodes.includes(response.status)) {
        console.error('ERROR: getting service accounts', {
            userId: params.id,
            userEmail: locals.user?.email,
            time: Date.now(),
            status: response.status,
        });
    }

    const body = ((await response.json()) as ServiceAccountDetail[]) ?? ([] as ServiceAccountDetail[]);

    return json(body, { status: response.status });
};
