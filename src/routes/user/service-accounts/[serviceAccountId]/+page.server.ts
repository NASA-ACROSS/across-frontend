import type { PageServerLoad, RequestEvent } from './$types';

import { error, fail, isHttpError, type ActionFailure } from '@sveltejs/kit';
import { getUserInfo } from '$lib/utils/user/getUserInfo';

import { getServiceAccounts } from '$lib/utils/user/getServiceAccounts';
import guards from '$lib/utils/guards';
import { getGroupsFromRoles } from '$lib/utils/user/getGroupsFromRoles';

import { type FormSubmitResult } from '$lib/types/form/FormSubmitResult';
import { validate } from '$lib/utils/regex/validate';
import { uuidRegex } from '$lib/utils/regex/uuidRegex';
import { HTTP_CODES } from '$lib';
import { callApi } from '$lib/utils/across/callApi';

export const load: PageServerLoad = async ({ locals, params, fetch }) => {
    guards.localOnlyRoute();
    const localUser = guards.requireUser(locals);

    // validate that the slug id is a uuid
    if (params.serviceAccountId && !validate(params.serviceAccountId, uuidRegex, 'serviceAccountId')) {
        console.error('ERROR: fetching service account, service account id is not a UUID');
        error(404, {
            message: 'Not Found',
            errorId: crypto.randomUUID(),
            code: HTTP_CODES[404],
        });
    }

    const user = await getUserInfo(fetch, localUser.id);
    const serviceAccount = await getServiceAccounts(fetch, localUser, params.serviceAccountId);

    const groupRoles = getGroupsFromRoles(user.group_roles);

    // 404 if we don't have the service account by id
    if (!serviceAccount) {
        error(404, {
            message: 'Not Found',
            errorId: crypto.randomUUID(),
            code: HTTP_CODES[404],
        });
    }

    return {
        slug: params.serviceAccountId,
        user,
        serviceAccount,
        userGroupRoles: groupRoles,
    };
};

export const actions = {
    assignGroupRole: async ({ request, fetch }: RequestEvent): Promise<FormSubmitResult | ActionFailure<FormSubmitResult>> => {
        const data = await request.formData();

        const userId = data.get('userId') as string;
        const groupRoleId = data.get('groupRoleId') as string;
        const serviceAccountId = data.get('serviceAccountId') as string;

        console.log({ msg: 'assigning group role for serviceAccount', userId, serviceAccountId, groupRoleId });

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        try {
            await callApi(fetch, `/user/${userId}/service-account/${serviceAccountId}/group-role/${groupRoleId}`, options);
        } catch (error: unknown) {
            if (isHttpError(error)) {
                return fail(error.status, {
                    type: 'error',
                    message: 'Failed to assign group role to service account',
                    _action: 'assignGroupRole',
                    errorId: error.body.errorId,
                    code: error.body.code,
                });
            }

            throw error;
        }

        return { type: 'success', message: 'Group role assigned successfully!', _action: 'assignGroupRole' };
    },
    removeGroupRole: async ({ request, fetch }: RequestEvent): Promise<FormSubmitResult | ActionFailure<FormSubmitResult>> => {
        const data = await request.formData();

        const userId = data.get('userId') as string;
        const groupRoleId = data.get('groupRoleId') as string;
        const serviceAccountId = data.get('serviceAccountId') as string;

        console.log({ msg: 'removing group role for serviceAccount', userId, serviceAccountId, groupRoleId });

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        try {
            await callApi(fetch, `/user/${userId}/service-account/${serviceAccountId}/group-role/${groupRoleId}`, options);
        } catch (error: unknown) {
            if (isHttpError(error)) {
                return fail(error.status, {
                    type: 'error',
                    message: 'Failed to remove group role from service account',
                    _action: 'removeGroupRole',
                    errorId: error.body.errorId,
                    code: error.body.code,
                });
            }

            throw error;
        }

        return { type: 'success', message: 'Group role removed successfully!', _action: 'removeGroupRole' };
    },
    updateServiceAccount: async ({ request, fetch }: RequestEvent): Promise<FormSubmitResult | ActionFailure<FormSubmitResult>> => {
        const data = await request.formData();

        const userId = data.get('userId') as string;
        const serviceAccountId = data.get('serviceAccountId') as string;

        const name = data.get('name') as string;
        const description = data.get('description') as string;
        const expiration_duration = Number(data.get('expiration_duration'));

        const serviceAccountUpdate = {
            name,
            description,
            expiration_duration,
        };

        console.log({ msg: 'updating properties for serviceAccount', userId, serviceAccountId, serviceAccountUpdate });

        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(serviceAccountUpdate),
        };

        try {
            await callApi(fetch, `/user/${userId}/service-account/${serviceAccountId}`, options);
        } catch (error: unknown) {
            if (isHttpError(error)) {
                return fail(error.status, {
                    type: 'error',
                    message: 'Failed to update service account',
                    _action: 'updateServiceAccount',
                    errorId: error.body.errorId,
                    code: error.body.code,
                });
            }

            throw error;
        }

        return {
            type: 'success',
            message: 'Service account details updated and expiration recomputed successfully!',
            _action: 'updateServiceAccount',
        };
    },
};
