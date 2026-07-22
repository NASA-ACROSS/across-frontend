import { CONFIG } from '$config/config';
import type { ServiceAccountDetail } from '$lib/types/User/ServiceAccountDetail';
import type { ServiceAccountSecret } from '$lib/types/User/ServiceAccountSecret';
import guards from '$lib/utils/guards';
import { getServiceAccounts } from '$lib/utils/user/getServiceAccounts';
import { getUserInfo } from '$lib/utils/user/getUserInfo';
import { fail, type ActionFailure, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types.js';
import type { FormSubmitResult } from '$lib/types/form/FormSubmitResult';
import type { AcrossApiErrorResponseBody } from '$lib/types/error/AcrossApiErrorResponseBody';
import HTTP_CODES from '$lib/utils/HttpCodes';

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
            return fail(500, {
                type: 'error',
                message: errorLog,
                _action: 'createServiceAccount',
                errorId: crypto.randomUUID(),
                code: HTTP_CODES[500],
            });
        }

        if (!response.ok) {
            const errorResponseBody = (await response.json()) as AcrossApiErrorResponseBody;
            const errorLog = `Failed to create a NEW Service Account`;
            console.error(errorLog, {
                userId: user.id,
                userEmail: user.email,
                status: response.status,
                err: errorResponseBody.detail,
            });
            return fail(500, {
                type: 'error',
                message: errorLog,
                _action: 'createServiceAccount',
                errorId: crypto.randomUUID(),
                code: HTTP_CODES[500],
            });
        }

        const serviceAccountSecret = (await response.json()) as ServiceAccountSecret;
        // prevent caching response with secret
        setHeaders({
            'cache-control': 'no-store',
        });
        return { type: 'success', serviceAccountSecret, _action: 'createServiceAccount' };
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
            return fail(500, {
                type: 'error',
                message: errorLog,
                _action: 'deleteServiceAccount',
                errorId: crypto.randomUUID(),
                code: HTTP_CODES[500],
            });
        }

        if (!response.ok) {
            const errorResponseBody = (await response.json()) as AcrossApiErrorResponseBody;
            const errorLog = 'Failed to delete the Service Account';
            console.error({
                msg: errorLog,
                userId: user.id,
                userEmail: user.email,
                serviceAccountId,
                status: response.status,
                err: errorResponseBody.detail,
            });
            return fail(500, {
                type: 'error',
                message: errorLog,
                _action: 'deleteServiceAccount',
                errorId: crypto.randomUUID(),
                code: HTTP_CODES[500],
            });
        }

        return { type: 'success', _action: 'deleteServiceAccount' };
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
            return fail(500, {
                type: 'error',
                message: errorLog,
                _action: 'restoreServiceAccount',
                errorId: crypto.randomUUID(),
                code: HTTP_CODES[500],
            });
        }

        if (!response.ok) {
            const errorResponseBody = (await response.json()) as AcrossApiErrorResponseBody;
            const errorLog = 'Failed to restore the Service Account';
            console.error(errorLog, {
                userId: user.id,
                userEmail: user.email,
                serviceAccountId,
                status: response.status,
                error: errorResponseBody,
            });
            return fail(500, {
                type: 'error',
                message: errorLog,
                _action: 'restoreServiceAccount',
                errorId: crypto.randomUUID(),
                code: HTTP_CODES[500],
            });
        }

        const serviceAccountSecret = (await response.json()) as ServiceAccountSecret;
        // prevent caching response with secret
        setHeaders({
            'cache-control': 'no-store',
        });
        return { type: 'success', serviceAccountSecret, _action: 'restoreServiceAccount' };
    },
};
