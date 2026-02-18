import type { PageServerLoad, RequestEvent } from './$types';

import { CONFIG } from '../../../../config/config.js';
import { fail, redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';
import type { User } from '$lib/types/User/User';
import { getUserInfo } from '$lib/utils/user/getUserInfo';
import { getInvitedUsers } from '$lib/utils/manage/getInvitedUsers';
import { getGroupData } from '$lib/utils/manage/getGroupData';
import type { UserCredentialsCookie } from '$lib/types/User/UserCredentialsCookie';
import type { ErrorResponse } from '$lib/types/error/ErrorResponse';
import { isAdmin } from '$lib/utils/user/isAdmin';

export const load: PageServerLoad = async ({ locals, params, cookies }) => {
    const userCookie = locals.user;
    // Redirect on load when user is logged in
    if (!userCookie) {
        redirect(302, resolve('/user/login'));
    }

    const user: User = await getUserInfo(userCookie, cookies);

    // find current group from route by short_name
    const userGroup = user.groups.find((group) => group.short_name === params.userGroupName);

    // redirect if we don't have necessary info or user lacks permission
    if (!user || !userGroup || !isAdmin(user, userGroup)) {
        redirect(302, resolve('/user/profile'));
    }

    const invitedUsers = await getInvitedUsers(userCookie, userGroup.id);
    const groupData = await getGroupData(userCookie, userGroup.id);

    return {
        slug: params.userGroupName,
        invitedUsers,
        groupData,
    };
};

export const actions = {
    inviteUser: async (event: RequestEvent) => {
        const request = event.request;
        const userCookie = event.locals.user as UserCredentialsCookie;
        // Redirect on load when user is not logged in
        if (!userCookie) {
            redirect(302, resolve('/user/login'));
        }
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
                Authorization: `Bearer ${userCookie?.access_token}`,
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
    deleteInvite: async (event: RequestEvent) => {
        const request = event.request;
        const userCookie = event.locals.user;
        const data = await request.formData();

        const userInviteId = data.get('userInviteId') as string;
        const userGroupId = data.get('userGroupId') as string;

        console.log(`delete invite userInviteId: ${userInviteId} userGroupId: ${userGroupId}`);

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${userCookie?.access_token}`,
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
    removeUser: async (event: RequestEvent) => {
        const request = event.request;
        const userCookie = event.locals.user;
        const data = await request.formData();

        const userId = data.get('userId') as string;
        const groupId = data.get('groupId') as string;

        console.log(`remove user from group userId: ${userId} userGroupId: ${groupId}`);

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${userCookie?.access_token}`,
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
    assignRole: async (event: RequestEvent) => {
        const request = event.request;
        const userCookie = event.locals.user;
        const data = await request.formData();

        const userId = data.get('userId') as string;
        const roleId = data.get('roleId') as string;
        const groupId = data.get('groupId') as string;

        console.log(`assign user role for groupId: ${groupId} userId: ${userId} roleId: ${roleId}`);

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${userCookie?.access_token}`,
            },
        };

        try {
            await fetch(`${CONFIG.API_URL}/group/${groupId}/user/${userId}/role/${roleId}`, options);
        } catch (error: unknown) {
            const errorLog = `ERROR: assigning user role for groupId: ${groupId} userId: ${userId} roleId: ${roleId} at [${Date.now()}]`;
            console.error(errorLog, JSON.stringify(error));
            return fail(500, { error: errorLog, fail: true });
        }

        return { successAssignRole: true };
    },
    removeRole: async (event: RequestEvent) => {
        const request = event.request;
        const userCookie = event.locals.user;
        const data = await request.formData();

        const userId = data.get('userId') as string;
        const roleId = data.get('roleId') as string;
        const groupId = data.get('groupId') as string;

        console.log(`remove user role for groupId: ${groupId} userId: ${userId} roleId: ${roleId}`);

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${userCookie?.access_token}`,
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
