import type { PageServerLoad, RequestEvent } from './$types';

import { CONFIG } from '../../../../config/config.js';
import { fail, redirect, type ActionFailure } from '@sveltejs/kit';
import { resolve } from '$app/paths';
import { getUserInfo } from '$lib/utils/user/getUserInfo';
import { getInvitedUsers } from '$lib/utils/manage/getInvitedUsers';
import { getGroupData } from '$lib/utils/manage/getGroupData';
import type { ErrorResponse } from '$lib/types/error/ErrorResponse';
import type { FormSubmitResult } from '$lib/types/form/FormSubmitResult';
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
    inviteUser: async ({ request, fetch }: RequestEvent): Promise<FormSubmitResult | ActionFailure<FormSubmitResult>> => {
        const data = await request.formData();

        const email = data.get('email') as string;
        const groupId = data.get('groupId') as string;

        logger.info({ msg: `Inviting user.`, email, groupId });

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
            const errorLog = `Failed inviting user to group.`;
            logger.error({ err, email, groupId }, errorLog);
            return fail(500, { type: 'error', message: errorLog, _action: 'inviteUser' });
        }

        if (response.status == 500) {
            logger.error({ email, groupId, status: response.status }, `Failed inviting user to group`);
            return fail(500, { type: 'error', message: 'Failed to invite user.', _action: 'inviteUser' });
        }

        if (response.status == 409) {
            logger.warn({ msg: `Attempted to invite a user who was already in the group.`, email, groupId });
            return { type: 'warning', message: 'User is already invited or in the group.', _action: 'inviteUser' };
        }

        if (response.status == 404) {
            const errorResponse = (await response.json()) as ErrorResponse;
            logger.error({ email, groupId, status: response.status }, `User not found to invite to group.`);
            return fail(500, {
                type: 'error',
                message: errorResponse.detail || 'User not found.',
                _action: 'inviteUser',
            });
        }

        return { type: 'success', message: 'User invited!', _action: 'inviteUser' };
    },
    deleteInvite: async ({ request, fetch }: RequestEvent): Promise<FormSubmitResult | ActionFailure<FormSubmitResult>> => {
        const data = await request.formData();

        const userInviteId = data.get('userInviteId') as string;
        const userGroupId = data.get('userGroupId') as string;

        logger.info({ msg: `Deleting user invite.`, userInviteId, userGroupId });

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        let response;
        try {
            response = await fetch(`${CONFIG.ACROSS_SERVER_URL}/group/${userGroupId}/invite/${userInviteId}`, options);
        } catch (err: unknown) {
            const errorLog = `Failed deleting user invite.`;
            logger.error({ err, userInviteId, userGroupId }, errorLog);
            return fail(500, { type: 'error', message: errorLog, _action: 'deleteInvite' });
        }

        if (response.status == 500) {
            logger.error({ userInviteId, userGroupId, status: response.status }, `Failed deleting user invite.`);
            return fail(500, { type: 'error', message: 'Failed to delete invite.', _action: 'deleteInvite' });
        }

        if (response.status == 400) {
            const errorResponse = (await response.json()) as ErrorResponse;
            logger.error({ userInviteId, userGroupId, status: response.status }, `Failed deleting user invite.`);
            return fail(500, {
                type: 'error',
                message: errorResponse.detail,
                _action: 'deleteInvite',
            });
        }

        return { type: 'success', message: 'Invite deleted.', _action: 'deleteInvite' };
    },
    removeUser: async ({ request, fetch }: RequestEvent): Promise<FormSubmitResult | ActionFailure<FormSubmitResult>> => {
        const data = await request.formData();

        const userId = data.get('userId') as string;
        const groupId = data.get('groupId') as string;

        logger.info({ msg: `Removing user from group.`, userId, groupId });

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        let response;
        try {
            response = await fetch(`${CONFIG.ACROSS_SERVER_URL}/group/${groupId}/user/${userId}`, options);
        } catch (err: unknown) {
            const errorLog = `Failed removing user from group.`;
            logger.error({ err, userId, groupId }, errorLog);
            return fail(500, { type: 'error', message: errorLog, _action: 'removeUser' });
        }

        if (response.status == 500) {
            logger.error({ userId, groupId, status: response.status }, `Failed removing user from group.`);
            return fail(500, { type: 'error', message: 'Failed to remove user from group.', _action: 'removeUser' });
        }

        return { type: 'success', message: 'User removed from group.', _action: 'removeUser' };
    },
    assignRole: async ({ request, fetch }: RequestEvent): Promise<FormSubmitResult | ActionFailure<FormSubmitResult>> => {
        const data = await request.formData();

        const userId = data.get('userId') as string;
        const roleId = data.get('roleId') as string;
        const groupId = data.get('groupId') as string;

        logger.info({ msg: `Assigning user role.`, groupId, userId, roleId });

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        let res;

        try {
            res = await fetch(`${CONFIG.ACROSS_SERVER_URL}/group/${groupId}/user/${userId}/role/${roleId}`, options);
        } catch (err: unknown) {
            const errorLog = `Failed assigning user role.`;
            logger.error({ err, groupId, userId, roleId }, errorLog);
            return fail(500, { type: 'error', message: errorLog, _action: 'assignRole' });
        }

        if (res.status >= 300) {
            logger.error({ groupId, userId, roleId, status: res.status }, `Failed assigning user role.`);
            return fail(res.status, { type: 'error', message: 'Failed to assign role.', _action: 'assignRole' });
        }

        return { type: 'success', message: 'Role assigned.', _action: 'assignRole' };
    },
    removeRole: async ({ request, fetch }: RequestEvent): Promise<FormSubmitResult | ActionFailure<FormSubmitResult>> => {
        const data = await request.formData();

        const userId = data.get('userId') as string;
        const roleId = data.get('roleId') as string;
        const groupId = data.get('groupId') as string;

        logger.info({ msg: `Removing user role.`, groupId, userId, roleId });

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        try {
            await fetch(`${CONFIG.ACROSS_SERVER_URL}/group/${groupId}/user/${userId}/role/${roleId}`, options);
        } catch (err: unknown) {
            const errorLog = `Failed removing user role.`;
            logger.error({ err, groupId, userId, roleId }, errorLog);
            return fail(500, { type: 'error', message: errorLog, _action: 'removeRole' });
        }

        return { type: 'success', message: 'Role removed.', _action: 'removeRole' };
    },
};
