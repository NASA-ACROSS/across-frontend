import { CONFIG } from '$config/config';
import type { ServiceAccountDetail } from '$lib/types/User/ServiceAccountDetail';
import type { ServiceAccountSecret } from '$lib/types/User/ServiceAccountSecret';
import guards from '$lib/utils/guards';
import { getServiceAccounts } from '$lib/utils/user/getServiceAccounts';
import { getUserInfo } from '$lib/utils/user/getUserInfo';
import { fail, type ActionFailure, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types.js';
import type { FormSubmitResult } from '$lib/types/form/FormSubmitResult.js';
import type { ErrorResponse } from '$lib/types/error/ErrorResponse.js';

export const load: PageServerLoad = async (event: RequestEvent) => {
    guards.localOnlyRoute();
    const localUser = guards.requireUser(event.locals);

    const user = await getUserInfo(localUser.id, event.fetch);
    const serviceAccounts: ServiceAccountDetail[] = await getServiceAccounts(localUser, event.fetch);

    // Respond with user data
    return { user, serviceAccounts };
};

export const actions = {
    createServiceAccount: async (
        event: RequestEvent
    ): Promise<(FormSubmitResult & { serviceAccountSecret: ServiceAccountSecret }) | ActionFailure<FormSubmitResult>> => {
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

        console.log({
            msg: 'Creating a NEW Service Account',
            userId: user.id,
            userEmail: user.email,
            name: name,
            description,
            expiration_duration: expiration_duration,
        });

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(serviceAccountCreate),
        };

        let response;
        try {
            response = await fetch(`${CONFIG.ACROSS_SERVER_URL}/user/${user.id}/service-account/`, options);
        } catch (error: unknown) {
            const errorLog = `Request failure while creating a NEW Service Account`;
            console.error({
                msg: errorLog,
                userId: user.id,
                userEmail: user.email,
                time: Date.now(),
                err: error,
            });
            return fail(500, { type: 'error', message: errorLog });
        }

        if (!response.ok) {
            const errorResponseBody = (await response.json()) as ErrorResponse;
            const errorLog = `Failed to create a NEW Service Account`;
            console.error(errorLog, {
                userId: user.id,
                userEmail: user.email,
                status: response.status,
                err: errorResponseBody.detail,
            });
            return fail(500, { type: 'error', message: errorLog });
        }

        const serviceAccountSecret = (await response.json()) as ServiceAccountSecret;
        // prevent caching response with secret
        setHeaders({
            'cache-control': 'no-store',
        });
        return { type: 'success', serviceAccountSecret };
    },
    deleteServiceAccount: async (event: RequestEvent): Promise<FormSubmitResult | ActionFailure<FormSubmitResult>> => {
        const { request, locals, fetch } = event;
        const user = guards.requireUser(locals);

        const data = await request.formData();

        const serviceAccountId = data.get('serviceAccountId') as string;

        console.log({
            msg: `Deleting a Service Account`,
            serviceAccountId,
            userId: user.id,
            userEmail: user.email,
        });

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        let response;
        try {
            const url = `${CONFIG.ACROSS_SERVER_URL}/user/${user.id}/service-account/${serviceAccountId}`;
            response = await fetch(url, options);
        } catch (error: unknown) {
            const errorLog = `Request failure while deleting a service account`;
            console.error({
                msg: errorLog,
                userId: user.id,
                userEmail: user.email,
                serviceAccountId: serviceAccountId,
                err: error,
            });
            return fail(500, { type: 'error', message: errorLog });
        }

        if (!response.ok) {
            const errorResponseBody = (await response.json()) as ErrorResponse;
            const errorLog = 'Failed to delete the Service Account';
            console.error({
                msg: errorLog,
                userId: user.id,
                userEmail: user.email,
                serviceAccountId,
                status: response.status,
                err: errorResponseBody.detail,
            });
            return fail(500, { type: 'error', message: errorLog });
        }

        return { type: 'success' };
    },
    restoreServiceAccount: async (
        event: RequestEvent
    ): Promise<(FormSubmitResult & { serviceAccountSecret: ServiceAccountSecret }) | ActionFailure<FormSubmitResult>> => {
        const { request, locals, fetch, setHeaders } = event;
        const user = guards.requireUser(locals);

        const data = await request.formData();

        const serviceAccountId = data.get('serviceAccountId') as string;

        console.log({
            msg: 'Restoring a Service Account',
            serviceAccountId,
            userId: user.id,
            userEmail: user.email,
        });

        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        let response;
        try {
            const url = `${CONFIG.ACROSS_SERVER_URL}/user/${user.id}/service-account/${serviceAccountId}/rotate-key`;
            response = await fetch(url, options);
        } catch (error: unknown) {
            const errorLog = `Request failure while restoring a service account`;
            console.error(errorLog, {
                userId: user.id,
                userEmail: user.email,
                serviceAccountId,
                err: error,
            });
            return fail(500, { type: 'error', message: errorLog });
        }

        if (!response.ok) {
            const errorResponseBody = (await response.json()) as ErrorResponse;
            const errorLog = 'Failed to restore the Service Account';
            console.error(errorLog, {
                userId: user.id,
                userEmail: user.email,
                serviceAccountId,
                status: response.status,
                error: errorResponseBody,
            });
            fail(500, { type: 'error', message: errorLog });
        }

        const serviceAccountSecret = (await response.json()) as ServiceAccountSecret;
        // prevent caching response with secret
        setHeaders({
            'cache-control': 'no-store',
        });
        return { serviceAccountSecret, type: 'success' };
    },
};
