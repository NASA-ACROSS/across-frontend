import { CONFIG } from '$config/config';
import type { ServiceAccountDetail } from '$lib/types/User/ServiceAccountDetail';
import type { ServiceAccountSecret } from '$lib/types/User/ServiceAccountSecret';
import guards from '$lib/utils/guards';
import { getServiceAccounts } from '$lib/utils/user/getServiceAccounts';
import { getUserInfo } from '$lib/utils/user/getUserInfo';
import { fail, type RequestEvent } from '@sveltejs/kit';

export async function load(event: RequestEvent) {
    guards.localOnlyRoute();
    const localUser = guards.requireUser(event.locals);

    const user = await getUserInfo(localUser.id, event.fetch);
    const serviceAccounts: ServiceAccountDetail[] = await getServiceAccounts(user, event.fetch);

    // Respond with user data
    return { user, serviceAccounts };
}

export const actions = {
    createServiceAccount: async (event: RequestEvent) => {
        const { request, locals, fetch, setHeaders } = event;
        const user = guards.requireUser(locals);

        const data = await request.formData();

        const name = data.get('name') as string;
        const description = data.get('description') as string;
        const expiration_duration = Number(data.get('expiration_duration'));

        const serviceAccountCreate = {
            name,
            description,
            expiration_duration,
        };

        console.log(
            `Creating a NEW Service Account for userId: ${user.id} userEmail: ${user.email}  name: ${name} description: ${description} expiration: ${expiration_duration}`
        );

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(serviceAccountCreate),
        };

        let response;
        try {
            response = await fetch(`${CONFIG.API_URL}/user/${user.id}/service-account/`, options);
        } catch (error: unknown) {
            const errorLog = `ERROR: Creating a NEW Service Account for user id [${user.id}] user email [${user.email}] at [${Date.now()}]`;
            console.error(errorLog, JSON.stringify(error));
            return fail(500, { error: errorLog, fail: true });
        }

        if (response.status != 201) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const errorResponseBody = await response.json();
            const errorLog = `ERROR: Creating a NEW Service Account for user id [${user.id}] user email [${user.email}] at [${Date.now()}] with status code [${response.status}]`;
            console.error(errorLog, JSON.stringify(errorResponseBody));
            return fail(500, { fail: true });
        }

        const serviceAccountSecret = (await response.json()) as ServiceAccountSecret;
        // prevent caching response with secret
        setHeaders({
            'cache-control': 'no-store',
        });
        return { successCreateServiceAccount: true, serviceAccountSecret };
    },
    deleteServiceAccount: async (event: RequestEvent) => {
        const { request, locals, fetch } = event;
        const user = guards.requireUser(locals);

        const data = await request.formData();

        const id = data.get('serviceAccountId') as string;

        console.log(`Deleting a Service Account id: ${id} for userId: ${user.id} userEmail: ${user.email}`);

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        let response;
        try {
            const url = `${CONFIG.API_URL}/user/${user.id}/service-account/${id}`;
            response = await fetch(url, options);
        } catch (error: unknown) {
            const errorLog = `ERROR: Deleting a Service Account id: ${id} for userId: ${user.id} userEmail: ${user.email} at [${Date.now()}]`;
            console.error(errorLog, { error: JSON.stringify(error) });
            return fail(500, { error: errorLog, fail: true });
        }

        if (response.status != 204) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const errorResponseBody = await response.json();
            const errorLog = `ERROR: Deleting a Service Account id: ${id} for userId: ${user.id} userEmail: ${user.email} at [${Date.now()}] with status code [${response.status}]`;
            console.error(errorLog, JSON.stringify(errorResponseBody));
            return fail(500, { fail: true });
        }

        return { deleteServiceAccountSuccess: true };
    },
    restoreServiceAccount: async (event: RequestEvent) => {
        const { request, locals, fetch, setHeaders } = event;
        const user = guards.requireUser(locals);

        const data = await request.formData();

        const serviceAccountId = data.get('serviceAccountId') as string;

        console.log(`Restoring a Service Account id: ${serviceAccountId} for userId: ${user.id} userEmail: ${user.email}`);

        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        let response;
        try {
            const url = `${CONFIG.API_URL}/user/${user.id}/service-account/${serviceAccountId}/rotate-key`;
            response = await fetch(url, options);
        } catch (error: unknown) {
            const errorLog = `ERROR: Restoring a Service Account id: ${serviceAccountId} for userId: ${user.id} userEmail: ${user.email} at [${Date.now()}]`;
            console.error(errorLog, { error: JSON.stringify(error) });
            return fail(500, { error: errorLog, fail: true });
        }

        if (response.status != 200) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const errorResponseBody = await response.json();
            const errorLog = `ERROR: Restoring a Service Account id: ${serviceAccountId} for userId: ${user.id} userEmail: ${user.email} at [${Date.now()}] with status code [${response.status}]`;
            console.error(errorLog, JSON.stringify(errorResponseBody));
            return fail(500, { fail: true });
        }

        const serviceAccountSecret = (await response.json()) as ServiceAccountSecret;
        // prevent caching response with secret
        setHeaders({
            'cache-control': 'no-store',
        });
        return { serviceAccountSecret, successRestoreServiceAccount: true };
    },
};
