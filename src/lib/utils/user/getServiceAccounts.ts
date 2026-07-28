import type { ServiceAccountDetail } from '$lib/types/User/ServiceAccountDetail';
import type { UserCredentialsCookie } from '$lib/types/User/UserCredentialsCookie';
import { uuidRegex } from '../regex/uuidRegex';
import { validate } from '../regex/validate';
import { callApi } from '../across/callApi';

export async function getServiceAccounts(fetch: typeof globalThis.fetch, user: UserCredentialsCookie): Promise<ServiceAccountDetail[]>;

export async function getServiceAccounts(
    fetch: typeof globalThis.fetch,
    user: UserCredentialsCookie,
    serviceAccountId?: string
): Promise<ServiceAccountDetail>;

export async function getServiceAccounts(
    fetch: typeof globalThis.fetch,
    user: UserCredentialsCookie,
    serviceAccountId?: string
): Promise<ServiceAccountDetail[] | ServiceAccountDetail> {
    if (serviceAccountId && !validate(serviceAccountId, uuidRegex, 'serviceAccountId')) {
        throw Error('Service account ID is not a UUID');
    }

    let route = `/user/${user.id}/service-account`;

    if (serviceAccountId) route += `/${serviceAccountId}`;

    const { data } = await callApi<ServiceAccountDetail[] | ServiceAccountDetail>(fetch, route, {
        method: 'GET',
    });

    return data;
}
