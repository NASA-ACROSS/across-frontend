import type { PageServerLoad, RequestEvent } from './$types';

import { CONFIG } from '../../../../config/config.js';
import { error, fail, type ActionFailure } from '@sveltejs/kit';
import { getUserInfo } from '$lib/utils/user/getUserInfo';

import { getServiceAccounts } from '$lib/utils/user/getServiceAccounts';
import guards from '$lib/utils/guards';
import { getGroupsFromRoles } from '$lib/utils/user/getGroupsFromRoles';

import { type FormSubmitResult } from '$lib/types/form/FormSubmitResult';
import { validate } from '$lib/utils/regex/validate';
import { uuidRegex } from '$lib/utils/regex/uuidRegex';
import type { AcrossApiErrorResponseBody } from '$lib/types/error/AcrossApiErrorResponseBody';
import { HTTP_CODES } from '$lib';

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

    const user = await getUserInfo(localUser.id, fetch);
    const serviceAccount = await getServiceAccounts(localUser, fetch, params.serviceAccountId);

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

        let response;
        try {
            response = await fetch(
                `${CONFIG.ACROSS_SERVER_URL}/user/${userId}/service-account/${serviceAccountId}/group-role/${groupRoleId}`,
                options
            );
        } catch (error: unknown) {
            const errorLog = 'Unknown request failure while trying to assign group role to service account';
            console.error({ userId, serviceAccountId, groupRoleId, time: Date.now(), err: error }, errorLog);
            return fail(500, {
                type: 'error',
                message: errorLog,
                _action: 'assignGroupRole',
                errorId: crypto.randomUUID(),
                code: HTTP_CODES[500],
            });
        }

        if (!response.ok) {
            const responseError = (await response.json()) as AcrossApiErrorResponseBody;
            const errorLog = 'Failed to assign group role to service account';
            console.error({
                msg: errorLog,
                userId,
                serviceAccountId,
                groupRoleId,
                status: response.status,
                error: responseError.detail,
            });
            return fail(500, {
                type: 'error',
                message: errorLog,
                _action: 'assignGroupRole',
                errorId: crypto.randomUUID(),
                code: HTTP_CODES[500],
            });
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

        let response;
        try {
            response = await fetch(
                `${CONFIG.ACROSS_SERVER_URL}/user/${userId}/service-account/${serviceAccountId}/group-role/${groupRoleId}`,
                options
            );
        } catch (error: unknown) {
            const errorLog = 'Unknown request failure while removing group role from service account';
            console.error({ msg: errorLog, userId, serviceAccountId, groupRoleId, err: error });
            return fail(500, {
                type: 'error',
                message: errorLog,
                _action: 'removeGroupRole',
                errorId: crypto.randomUUID(),
                code: HTTP_CODES[500],
            });
        }

        if (!response.ok) {
            const responseError = (await response.json()) as AcrossApiErrorResponseBody;
            const errorLog = 'Failed to remove group role from service account';
            console.error({
                msg: errorLog,
                userId,
                serviceAccountId,
                groupRoleId,
                status: response.status,
                error: responseError.detail,
            });
            return fail(500, {
                type: 'error',
                message: errorLog,
                _action: 'removeGroupRole',
                errorId: crypto.randomUUID(),
                code: HTTP_CODES[500],
            });
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

        let response;
        try {
            response = await fetch(`${CONFIG.ACROSS_SERVER_URL}/user/${userId}/service-account/${serviceAccountId}`, options);
        } catch (error: unknown) {
            const errorLog = 'Request failure while updating properties for service account';
            console.error({ msg: errorLog, userId, serviceAccountId, serviceAccountUpdate, err: error });
            return fail(500, {
                type: 'error',
                message: errorLog,
                _action: 'updateServiceAccount',
                errorId: crypto.randomUUID(),
                code: HTTP_CODES[500],
            });
        }

        if (!response.ok) {
            const responseError = (await response.json()) as AcrossApiErrorResponseBody;
            const errorLog = 'Failed to update service account';
            console.error({
                msg: errorLog,
                userId,
                serviceAccountId,
                serviceAccountUpdate,
                status: response.status,
                err: responseError.detail,
            });
            return fail(500, {
                type: 'error',
                message: errorLog,
                _action: 'updateServiceAccount',
                errorId: crypto.randomUUID(),
                code: HTTP_CODES[500],
            });
        }

        return {
            type: 'success',
            message: 'Service account details updated and expiration recomputed successfully!',
            _action: 'updateServiceAccount',
        };
    },
};
