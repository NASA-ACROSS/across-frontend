import type { ServiceAccountDetail } from '$lib/types/User/ServiceAccountDetail';
import type { ServiceAccountSecret } from '$lib/types/User/ServiceAccountSecret';
import guards from '$lib/utils/guards';
import { getServiceAccounts } from '$lib/utils/user/getServiceAccounts';
import { getUserInfo } from '$lib/utils/user/getUserInfo';
import { fail, isHttpError, type ActionFailure, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import type { FormSubmitResult } from '$lib/types/form/FormSubmitResult';
import { callApi } from '$lib/utils/across/callApi';
import logger from '$lib/logger';

export const load: PageServerLoad = async ({ fetch, locals }: RequestEvent) => {
    guards.localOnlyRoute();
    const localUser = guards.requireUser(locals);

    const user = await getUserInfo(fetch, localUser.id);
    const serviceAccounts: ServiceAccountDetail[] = await getServiceAccounts(fetch, localUser);

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

        logger.debug({
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

        try {
            const { data: serviceAccountSecret } = await callApi<ServiceAccountSecret>(fetch, `/user/${user.id}/service-account/`, options);

            // prevent caching response with secret
            setHeaders({ 'cache-control': 'no-store' });

            return { type: 'success', serviceAccountSecret, _action: 'createServiceAccount' };
        } catch (error: unknown) {
            if (isHttpError(error)) {
                return fail(error.status, {
                    type: 'error',
                    message: 'Failed to create service account',
                    _action: 'createServiceAccount',
                    errorId: error.body.errorId,
                    code: error.body.code,
                });
            }

            throw error;
        }
    },
    deleteServiceAccount: async (event: RequestEvent): Promise<FormSubmitResult | ActionFailure<FormSubmitResult>> => {
        const { request, locals, fetch } = event;
        const user = guards.requireUser(locals);

        const data = await request.formData();

        const serviceAccountId = data.get('serviceAccountId') as string;

        logger.debug({
            msg: `Deleting a Service Account`,
            serviceAccountId,
            userId: user.id,
            userEmail: user.email,
        });

        const options: RequestInit = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        try {
            const route = `/user/${user.id}/service-account/${serviceAccountId}`;
            await callApi(fetch, route, { ...options, responseType: 'empty' });
        } catch (error: unknown) {
            if (isHttpError(error)) {
                return fail(error.status, {
                    type: 'error',
                    message: 'Failed to delete service account',
                    _action: 'deleteServiceAccount',
                    errorId: error.body.errorId,
                    code: error.body.code,
                });
            }

            throw error;
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

        logger.debug({
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

        try {
            const route = `/user/${user.id}/service-account/${serviceAccountId}/rotate-key`;
            const { data: serviceAccountSecret } = await callApi<ServiceAccountSecret>(fetch, route, options);

            // prevent caching response with secret
            setHeaders({ 'cache-control': 'no-store' });

            return { type: 'success', serviceAccountSecret, _action: 'restoreServiceAccount' };
        } catch (error: unknown) {
            if (isHttpError(error)) {
                return fail(error.status, {
                    type: 'error',
                    message: 'Failed to restore service account',
                    _action: 'restoreServiceAccount',
                    errorId: error.body.errorId,
                    code: error.body.code,
                });
            }

            throw error;
        }
    },
};
