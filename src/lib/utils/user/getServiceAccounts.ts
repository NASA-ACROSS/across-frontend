import { CONFIG } from '../../../config/config';
import type { ServiceAccountDetail } from '$lib/types/User/ServiceAccountDetail';
import type { UserCredentialsCookie } from '$lib/types/User/UserCredentialsCookie';
import { uuidRegex } from '../regex/uuidRegex';
import { validate } from '../regex/validate';

export async function getServiceAccounts(user: UserCredentialsCookie, fetch: typeof globalThis.fetch): Promise<ServiceAccountDetail[]>;
export async function getServiceAccounts(
    user: UserCredentialsCookie,
    fetch: typeof globalThis.fetch,
    serviceAccountId?: string
): Promise<ServiceAccountDetail>;

export async function getServiceAccounts(
    user: UserCredentialsCookie,
    fetch: typeof globalThis.fetch,
    serviceAccountId?: string
): Promise<ServiceAccountDetail[] | ServiceAccountDetail> {
    // validate that the id is a uuid
    if (serviceAccountId && !validate(serviceAccountId, uuidRegex, 'serviceAccountId')) {
        console.error('ERROR: fetching service account, service account id is not a UUID');
        return [];
    }

    const options = {
        method: 'GET',
    };

    let response;

    let URL = `${CONFIG.ACROSS_SERVER_URL}/user/${user.id}/service-account`;

    if (serviceAccountId) {
        URL += `/${serviceAccountId}`;
    }

    try {
        response = await fetch(URL, options);
    } catch (e) {
        console.error(`ERROR: catch getting service accounts [${user.email}] at [${Date.now()}]`, JSON.stringify(e));
        throw new Error('Unexpected Error while fetching service accounts');
    }

    // catch known errors from api and hide error from user
    const errorCodes = [500, 404, 401];
    if (errorCodes.includes(response.status)) {
        console.error(`ERROR: getting service accounts [${user.email}] at [${Date.now()}] with status code [${response.status}]`);
    }

    let serviceAccounts;
    if (serviceAccountId) {
        serviceAccounts = (await response.json()) as ServiceAccountDetail;
    } else {
        serviceAccounts = ((await response.json()) as ServiceAccountDetail[]) ?? ([] as ServiceAccountDetail[]);
    }

    return serviceAccounts;
}
