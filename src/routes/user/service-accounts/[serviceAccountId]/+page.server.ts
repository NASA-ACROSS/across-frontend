import type { PageServerLoad, RequestEvent } from './$types';

import { CONFIG } from '../../../../config/config.js';
import { error, fail } from '@sveltejs/kit';
import { getUserInfo } from '$lib/utils/user/getUserInfo';

import type { ServiceAccountDetail } from '$lib/types/User/ServiceAccountDetail';
import { getServiceAccounts } from '$lib/utils/user/getServiceAccounts';
import guards from '$lib/utils/guards';
import { getGroupsFromRoles } from '$lib/utils/user/getGroupsFromRoles';

export const load: PageServerLoad = async ({ locals, params, fetch }) => {
    guards.localOnlyRoute();
    const localUser = guards.requireUser(locals);

    const user = await getUserInfo(localUser.id, fetch);
    const serviceAccounts: ServiceAccountDetail[] = await getServiceAccounts(user, fetch);
    const serviceAccount = serviceAccounts.find((serviceAccount) => serviceAccount.id === params.serviceAccountId);

    const userGroupRoles = getGroupsFromRoles(user.group_roles);

    console.log('userGroupRoles', JSON.stringify(userGroupRoles, null, 2));

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
        userGroupRoles,
    };
};

export const actions = {
    assignGroupRole: async ({ request, fetch }: RequestEvent) => {
        const data = await request.formData();

        const userId = data.get('userId') as string;
        const groupRoleId = data.get('groupRoleId') as string;
        const serviceAccountId = data.get('serviceAccountId') as string;

        console.log(`assign group role for serviceAccountId: ${serviceAccountId} userId: ${userId} roleId: ${userId}`);

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
            const errorLog = 'ERROR: assign group role from service account';
            console.error(errorLog, { userId, serviceAccountId, groupRoleId, time: Date.now(), error: JSON.stringify(error) });
            return fail(500, { error: errorLog, fail: true });
        }

        return { successAssignGroupRole: true };
    },
    removeGroupRole: async ({ request, fetch }: RequestEvent) => {
        const data = await request.formData();

        const userId = data.get('userId') as string;
        const groupRoleId = data.get('groupRoleId') as string;
        const serviceAccountId = data.get('serviceAccountId') as string;

        console.log(`remove group role for serviceAccountId: ${serviceAccountId} userId: ${userId} roleId: ${userId}`);

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
            const errorLog = 'ERROR: removing group role from service account';
            console.error(errorLog, { userId, serviceAccountId, groupRoleId, time: Date.now(), error: JSON.stringify(error) });
            return fail(500, { error: errorLog, fail: true });
        }

        return { successRemoveGroupRole: true };
    },
    updateServiceAccount: async ({ request, fetch }: RequestEvent) => {
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

        console.log(`updating properties for serviceAccountId: ${serviceAccountId} userId: ${userId}`, serviceAccountUpdate);

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
            const errorLog = 'ERROR: removing group role from service account';
            console.error(errorLog, { userId, serviceAccountId, serviceAccountUpdate, time: Date.now(), error: JSON.stringify(error) });
            return fail(500, { error: errorLog, fail: true });
        }

        return { successRemoveGroupRole: true };
    },
};
