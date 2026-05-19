import { CONFIG } from '../../../config/config';
import type { ServiceAccountDetail } from '$lib/types/User/ServiceAccountDetail';
import type { User } from '$lib/types/User/User';

export const getServiceAccounts = async (user: User, fetch: typeof globalThis.fetch) => {
    const options = {
        method: 'GET',
    };

    let response;
    try {
        response = await fetch(`${CONFIG.ACROSS_SERVER_URL}/user/${user.id}/service-account`, options);
    } catch (e) {
        console.error(`ERROR: catch getting service accounts [${user.email}] at [${Date.now()}]`, JSON.stringify(e));
        throw new Error('Unexpected Error while fetching service accounts');
    }

    // catch known errors from api and hide error from user
    const errorCodes = [500, 404, 401];
    if (errorCodes.includes(response.status)) {
        console.error(`ERROR: getting service accounts [${user.email}] at [${Date.now()}] with status code [${response.status}]`);
    }

    const serviceAccounts = ((await response.json()) as ServiceAccountDetail[]) ?? ([] as ServiceAccountDetail[]);

    return serviceAccounts;
};
