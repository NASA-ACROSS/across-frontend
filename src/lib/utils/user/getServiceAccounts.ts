import { CONFIG } from '../../../config/config';
import type { ServiceAccountDetail } from '$lib/types/User/ServiceAccountDetail';
import type { UserCredentialsCookie } from '$lib/types/User/UserCredentialsCookie';
import { uuidRegex } from '../regex/uuidRegex';
import { validate } from '../regex/validate';
import type { AcrossApiErrorResponseBody } from '$lib/types/error/AcrossApiErrorResponseBody';

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
        const errorMsg = 'Failed to fetch service account, service account id is not a UUID';
        console.error(errorMsg);
        throw Error(errorMsg);
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
        console.error({ err: e, email: user.email }, 'Fetch failed to get service accounts.');
        throw new Error('Request failure while fetching service account');
    }

    // catch known errors from api and hide error from user
    const errorCodes = [500, 404, 401];
    if (errorCodes.includes(response.status)) {
        const errRes = (await response.json()) as AcrossApiErrorResponseBody;
        console.error({
            msg: 'Failed to get service accounts.',
            status: response.status,
            error: errRes.detail,
            email: user.email,
        });
    }

    let serviceAccounts;
    if (serviceAccountId) {
        serviceAccounts = (await response.json()) as ServiceAccountDetail;
    } else {
        serviceAccounts = ((await response.json()) as ServiceAccountDetail[]) ?? ([] as ServiceAccountDetail[]);
    }

    return serviceAccounts;
}
