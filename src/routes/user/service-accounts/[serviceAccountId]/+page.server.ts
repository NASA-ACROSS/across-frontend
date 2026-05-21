import type { PageServerLoad, RequestEvent } from './$types';

import { CONFIG } from '../../../../config/config.js';
import { error, fail, type ActionFailure } from '@sveltejs/kit';
import { getUserInfo } from '$lib/utils/user/getUserInfo';

import { getServiceAccounts } from '$lib/utils/user/getServiceAccounts';
import guards from '$lib/utils/guards';
import { getGroupsFromRoles } from '$lib/utils/user/getGroupsFromRoles';

import { type FormSubmitResult } from '$lib/types/form/FormSubmitResult';

export const load: PageServerLoad = async ({ locals, params, fetch }) => {
    guards.localOnlyRoute();
    const localUser = guards.requireUser(locals);

    const user = await getUserInfo(localUser.id, fetch);
    const serviceAccounts = await getServiceAccounts(user, fetch);
    const serviceAccount = serviceAccounts.find((serviceAccount) => serviceAccount.id === params.serviceAccountId);

    const groupRoles = getGroupsFromRoles(user.group_roles);

    // 404 if we don't have the service account by id
    if (!serviceAccount) {
        error(404, {
            message: 'Not Found',
            errorId: crypto.randomUUID(),
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

        const userId = (data.get('userId') as string) + 'asft';
        const groupRoleId = data.get('groupRoleId') as string;
        const serviceAccountId = data.get('serviceAccountId') as string;

        console.log('assigning group role for serviceAccount', { userId, serviceAccountId, groupRoleId });

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        try {
            await fetch(
                `${CONFIG.ACROSS_SERVER_URL}/user/${userId}/service-account/${serviceAccountId}/group-role/${groupRoleId}`,
                options
            );
        } catch (error: unknown) {
            const errorLog = 'Unknown error trying to assign group role to service account';
            console.error(errorLog, { userId, serviceAccountId, groupRoleId, time: Date.now(), error: JSON.stringify(error) });
            return fail(500, { type: 'error', message: errorLog });
        }

        return { type: 'success', message: 'Group role assigned successfully!' };
    },
    removeGroupRole: async ({ request, fetch }: RequestEvent): Promise<FormSubmitResult | ActionFailure<FormSubmitResult>> => {
        const data = await request.formData();

        const userId = data.get('userId') as string;
        const groupRoleId = data.get('groupRoleId') as string;
        const serviceAccountId = data.get('serviceAccountId') as string;

        console.log('removing group role for serviceAccount', { userId, serviceAccountId, groupRoleId });

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        try {
            await fetch(
                `${CONFIG.ACROSS_SERVER_URL}/user/${userId}/service-account/${serviceAccountId}/group-role/${groupRoleId}`,
                options
            );
        } catch (error: unknown) {
            const errorLog = 'Unknown error trying to remove group role from service account';
            console.error(errorLog, { userId, serviceAccountId, groupRoleId, time: Date.now(), error: JSON.stringify(error) });
            return fail(500, { type: 'error', message: errorLog });
        }

        return { type: 'success', message: 'Group role removed successfully!' };
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

        console.log('updating properties for serviceAccount', { userId, serviceAccountId, serviceAccountUpdate });

        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(serviceAccountUpdate),
        };

        try {
            await fetch(`${CONFIG.ACROSS_SERVER_URL}/user/${userId}/service-account/${serviceAccountId}`, options);
        } catch (error: unknown) {
            const errorLog = 'Unknown error trying to update properties for service account';
            console.error(errorLog, { userId, serviceAccountId, serviceAccountUpdate, time: Date.now(), error: JSON.stringify(error) });
            return fail(500, { type: 'error', message: errorLog });
        }

        return { type: 'success', message: 'Service account details updated and expiration recomputed successfully!' };
    },
};
