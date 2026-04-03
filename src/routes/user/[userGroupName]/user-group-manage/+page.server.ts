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

        console.log(`invite user with email: ${email} groupId: ${groupId}`);

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
            response = await fetch(`${CONFIG.API_URL}/group/${groupId}/invite`, options);
        } catch (error: unknown) {
            const errorLog = `ERROR: inviting user to group [${email}] at [${Date.now()}]`;
            console.error(errorLog, JSON.stringify(error));
            return fail(500, { error: errorLog, fail: true });
        }

        if (response.status == 500) {
            console.error(`ERROR: inviting user to group [${email}] at [${Date.now()}] with status code [500]`);
            return fail(500, { fail: true });
        }

        if (response.status == 409) {
            console.log(`Attempted to invite a user [${email}] to group id [${groupId}] who was already in the group`);
            return { userInGroup: true };
        }

        if (response.status == 404) {
            const errorResponse = (await response.json()) as ErrorResponse;
            console.error(`ERROR: inviting user to group NOT FOUND [${email}] at [${Date.now()}] with status code [404]`);
            return fail(500, {
                error: errorResponse.detail,
                invalidEmail: true,
            });
        }

        return { successInvite: true };
    },
    deleteInvite: async ({ request, fetch }: RequestEvent) => {
        const data = await request.formData();

        const userInviteId = data.get('userInviteId') as string;
        const userGroupId = data.get('userGroupId') as string;

        console.log(`delete invite userInviteId: ${userInviteId} userGroupId: ${userGroupId}`);

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        let response;
        try {
            response = await fetch(`${CONFIG.API_URL}/group/${userGroupId}/invite/${userInviteId}`, options);
        } catch (error: unknown) {
            const errorLog = `ERROR: deleting user invite id [${userInviteId}] at [${Date.now()}]`;
            console.error(errorLog, JSON.stringify(error));
            return fail(500, { error: errorLog, fail: true });
        }

        if (response.status == 500) {
            console.error(`ERROR: deleting user invite id [${userInviteId}] at [${Date.now()}] with status code [500]`);
            return fail(500, { fail: true });
        }

        if (response.status == 400) {
            const errorResponse = (await response.json()) as ErrorResponse;
            console.error(`ERROR: deleting user invite id [${userInviteId}] NOT FOUND at [${Date.now()}] with status code [400]`);
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

        console.log(`remove user from group userId: ${userId} userGroupId: ${groupId}`);

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        let response;
        try {
            response = await fetch(`${CONFIG.API_URL}/group/${groupId}/user/${userId}`, options);
        } catch (error: unknown) {
            const errorLog = `ERROR: removing user from group userId: ${userId} groupId: ${groupId} at [${Date.now()}]`;
            console.error(errorLog, JSON.stringify(error));
            return fail(500, { error: errorLog, fail: true });
        }

        if (response.status == 500) {
            console.error(`ERROR: removing user from group userId: ${userId} groupId: ${groupId} at [${Date.now()}] with status code [500]`);
            return fail(500, { fail: true });
        }

        return { successRemoveUser: true };
    },
    assignRole: async ({ request, fetch }: RequestEvent) => {
        const data = await request.formData();

        const userId = data.get('userId') as string;
        const roleId = data.get('roleId') as string;
        const groupId = data.get('groupId') as string;

        console.log(`assign user role for groupId: ${groupId} userId: ${userId} roleId: ${roleId}`);

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        let res;

        try {
            res = await fetch(`${CONFIG.API_URL}/group/${groupId}/user/${userId}/role/${roleId}`, options);
        } catch (error: unknown) {
            const errorLog = `ERROR: assigning user role for groupId: ${groupId} userId: ${userId} roleId: ${roleId} at [${Date.now()}]`;
            console.error(errorLog, JSON.stringify(error));
            return fail(500, { error: errorLog, fail: true });
        }

        if (res.status >= 300) {
            console.error('SERVER ERROR: assigning user role.', { groupId, userId, roleId, status: res.status, time: Date.now() });

            return fail(res.status, { fail: true });
        }

        return { successAssignRole: true };
    },
    removeRole: async ({ request, fetch }: RequestEvent) => {
        const data = await request.formData();

        const userId = data.get('userId') as string;
        const roleId = data.get('roleId') as string;
        const groupId = data.get('groupId') as string;

        console.log(`remove user role for groupId: ${groupId} userId: ${userId} roleId: ${roleId}`);

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        try {
            await fetch(`${CONFIG.API_URL}/group/${groupId}/user/${userId}/role/${roleId}`, options);
        } catch (error: unknown) {
            const errorLog = `ERROR: removing user role for groupId: ${groupId} userId: ${userId} roleId: ${roleId} at [${Date.now()}]`;
            console.error(errorLog, JSON.stringify(error));
            return fail(500, { error: errorLog, fail: true });
        }

        return { successRemoveRole: true };
    },
};
