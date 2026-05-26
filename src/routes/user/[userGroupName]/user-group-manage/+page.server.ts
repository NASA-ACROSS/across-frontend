import type { PageServerLoad, RequestEvent } from './$types';

import { CONFIG } from '../../../../config/config.js';
import { fail, redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';
import { getUserInfo } from '$lib/utils/user/getUserInfo';
import { getInvitedUsers } from '$lib/utils/manage/getInvitedUsers';
import { getGroupData } from '$lib/utils/manage/getGroupData';
import type { ErrorResponse } from '$lib/types/error/ErrorResponse';
import { isAdmin } from '$lib/utils/user/isAdmin';
import guards from '$lib/utils/guards';
import logger from '$lib/logger';

export const load: PageServerLoad = async ({ locals, params, fetch }) => {
    guards.localOnlyRoute();
    const userCookie = guards.requireUser(locals);

    const user = await getUserInfo(userCookie.id, fetch);

    // find current group from route by short_name
    const userGroup = user.groups.find((group) => group.short_name === params.userGroupName);

    // redirect if we don't have necessary info or user lacks permission
    if (!user || !userGroup || !isAdmin(user, userGroup)) {
        redirect(302, resolve('/user/profile'));
    }

    const invitedUsers = await getInvitedUsers(userGroup.id, fetch);
    const groupData = await getGroupData(userGroup.id, fetch);

    return {
        slug: params.userGroupName,
        invitedUsers,
        groupData,
    };
};

export const actions = {
    inviteUser: async ({ request, fetch }: RequestEvent) => {
        const data = await request.formData();

        const email = data.get('email') as string;
        const groupId = data.get('groupId') as string;

        logger.info({ msg: 'Inviting user to group', email, groupId });

        const groupInviteBody = {
            receiver_email: email,
        };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(groupInviteBody),
        };

        let response;
        try {
            response = await fetch(`${CONFIG.ACROSS_SERVER_URL}/group/${groupId}/invite`, options);
        } catch (err: unknown) {
            const msg = 'Request failed to invite user to group.';
            logger.error({ msg, err, email, groupId });
            return fail(500, { error: msg, fail: true });
        }

        if (response.status >= 500) {
            const errorResponse = (await response.json()) as ErrorResponse;
            logger.error({ msg: 'Failed to invite user to group', error: errorResponse.detail, email, groupId });
            return fail(500, { fail: true });
        }

        if (response.status === 409) {
            logger.warn({ msg: 'The user is already in the group', email, groupId });
            return { userInGroup: true };
        }

        if (response.status === 404) {
            const errorResponse = (await response.json()) as ErrorResponse;
            const msg = 'The group to invite to is not found';
            logger.error({ msg, email, groupId, error: errorResponse.detail });
            return fail(500, {
                error: msg,
                invalidEmail: true,
            });
        }

        return { successInvite: true };
    },
    deleteInvite: async ({ request, fetch }: RequestEvent) => {
        const data = await request.formData();

        const userInviteId = data.get('userInviteId') as string;
        const userGroupId = data.get('userGroupId') as string;

        logger.info({ msg: 'Deleting user invite', userInviteId, userGroupId });

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        let response;
        try {
            response = await fetch(`${CONFIG.ACROSS_SERVER_URL}/group/${userGroupId}/invite/${userInviteId}`, options);
        } catch (error: unknown) {
            const msg = 'Request failed to delete user invite.';
            logger.error({ msg, error, userInviteId, userGroupId });
            return fail(500, { error: msg, fail: true });
        }

        if (response.status >= 500) {
            const msg = 'Failed to delete user invite.';
            const errorResponse = (await response.json()) as ErrorResponse;
            logger.error({ msg, error: errorResponse.detail, userInviteId, userGroupId });
            return fail(500, { error: msg, fail: true });
        }

        if (response.status === 404) {
            const errorResponse = (await response.json()) as ErrorResponse;
            logger.error({
                msg: 'The group or invite to delete is not found',
                userInviteId,
                userGroupId,
                error: errorResponse.detail,
            });
            return fail(500, {
                error: errorResponse.detail,
                invalidEmail: true,
            });
        }

        return { successDelete: true };
    },
    removeUser: async ({ request, fetch }: RequestEvent) => {
        const data = await request.formData();

        const userId = data.get('userId') as string;
        const groupId = data.get('groupId') as string;

        logger.info({ msg: `Removing user from group`, userId, groupId });

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        let response;
        try {
            response = await fetch(`${CONFIG.ACROSS_SERVER_URL}/group/${groupId}/user/${userId}`, options);
        } catch (error: unknown) {
            const msg = 'Request failed to remove user from group.';
            logger.error({ msg, error: JSON.stringify(error), userId, groupId });
            return fail(500, { error: msg, fail: true });
        }

        if (response.status >= 300) {
            const msg = 'Failed to remove user from group.';
            const errorResponse = (await response.json()) as ErrorResponse;
            logger.error({ msg, userId, groupId, status: response.status, error: errorResponse.detail });
            return fail(500, { error: msg, fail: true });
        }

        return { successRemoveUser: true };
    },
    assignRole: async ({ request, fetch }: RequestEvent) => {
        const data = await request.formData();

        const userId = data.get('userId') as string;
        const roleId = data.get('roleId') as string;
        const groupId = data.get('groupId') as string;

        logger.info({ msg: `Assigning user a group role`, groupId, userId, groupRoleId: roleId });

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        let res;

        try {
            res = await fetch(`${CONFIG.ACROSS_SERVER_URL}/group/${groupId}/user/${userId}/role/${roleId}`, options);
        } catch (error: unknown) {
            const msg = 'Request failed to assign user role.';
            logger.error({ msg, error: JSON.stringify(error), groupId, userId, roleId });

            return fail(500, { error: msg, fail: true });
        }

        if (res.status >= 300) {
            const msg = 'Failed to assign user a group role.';
            const errorResponse = (await res.json()) as ErrorResponse;
            logger.error({ msg, groupId, userId, roleId, status: res.status, error: errorResponse.detail });

            return fail(res.status, { error: msg, fail: true });
        }

        return { successAssignRole: true };
    },
    removeRole: async ({ request, fetch }: RequestEvent) => {
        const data = await request.formData();

        const userId = data.get('userId') as string;
        const roleId = data.get('roleId') as string;
        const groupId = data.get('groupId') as string;

        logger.info({ msg: `Removing group role from the user`, groupId, userId, roleId });

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        try {
            await fetch(`${CONFIG.ACROSS_SERVER_URL}/group/${groupId}/user/${userId}/role/${roleId}`, options);
        } catch (error: unknown) {
            const msg = 'Request failed to remove group role from user.';
            logger.error({ msg, error: JSON.stringify(error), groupId, userId, roleId });
            return fail(500, { error: msg, fail: true });
        }

        return { successRemoveRole: true };
    },
};
