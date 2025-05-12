import type { PageServerLoad } from './$types';

import { CONFIG } from '../../../../config/config.js';
import { fail, redirect } from '@sveltejs/kit';
import { base } from '$app/paths';
import type { User } from '$lib/types/User/User';
import { getUserInfo } from '$lib/utils/user/getUserInfo';
import { getInvitedUsers } from '$lib/utils/manage/getInvitedUsers';
import { getUserGroupData } from '$lib/utils/manage/getUserGroupData';
import type { AssignableRole } from '$lib/types/User/AssignableRole';

export const load: PageServerLoad = async ({ locals, params, cookies }) => {
    const userCookie = locals.user;
    // Redirect on load when user is logged in
    if (!userCookie) {
        throw redirect(303, `${base}/user/login`);
    }

    const user: User = await getUserInfo(userCookie, cookies);

    const userGroup = user.groups.find(
        (group) => group.short_name === params.userGroupName
    );

    const isAdmin = user.group_roles.find((group_role) =>
        group_role.permissions.find(
            (permission) => permission.name === 'group:user:write'
        )
    );

    if (!user || !userGroup || !isAdmin) {
        throw redirect(303, `${base}/user/profile`);
    }

    const invitedUsers = await getInvitedUsers(userCookie, userGroup.id);
    const userGroupData = await getUserGroupData(userCookie, userGroup.id);

    const adminPermission = `group:user:write`;
    const adminRole = userGroupData?.roles?.find((role) =>
        role?.permissions.find((p) => p.name == adminPermission)
    );

    const assignableRoles = userGroupData.roles;

    return {
        slug: params.userGroupName,
        userGroup,
        invitedUsers,
        userGroupData,
        currentUserEmail: user.email,
        assignableRoles,
    };
};

export const actions = {
    inviteUser: async (event) => {
        const request = event.request;
        const userCookie = event.locals.user;
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
            response = await fetch(
                `${CONFIG.API_URL}/api/group/${groupId}/invite`,
                options
            );
        } catch (error: any) {
            console.error(
                `ERROR: inviting user to group [${email}] at [${Date.now()}]`,
                JSON.stringify(error)
            );
            return fail(500, { error: error.message, fail: true });
        }

        if (response.status == 500) {
            console.error(
                `ERROR: inviting user to group [${email}] at [${Date.now()}] with status code [500]`
            );
            return fail(500, { fail: true });
        }

        if (response.status == 409) {
            console.log(
                `Attempted to invite a user [${email}] to group id [${groupId}] who was already in the group`
            );
            return { userInGroup: true };
        }

        if (response.status == 400) {
            const errorResponse = await response.json();
            console.error(
                `ERROR: inviting user to group NOT FOUND [${email}] at [${Date.now()}] with status code [400]`
            );
            return fail(500, {
                error: errorResponse.detail,
                invalidEmail: true,
            });
        }

        return { successInvite: true };
    },
    deleteInvite: async (event) => {
        const request = event.request;
        const userCookie = event.locals.user;
        const data = await request.formData();

        const userInviteId = data.get('userInviteId') as string;
        const userGroupId = data.get('userGroupId') as string;

        console.log(
            `delete invite userInviteId: ${userInviteId} userGroupId: ${userGroupId}`
        );

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${userCookie?.access_token}`,
            },
        };

        let response;
        try {
            response = await fetch(
                `${CONFIG.API_URL}/api/group/${userGroupId}/invite/${userInviteId}`,
                options
            );
        } catch (error: any) {
            console.error(
                `ERROR: deleting user invite id [${userInviteId}] at [${Date.now()}]`,
                JSON.stringify(error)
            );
            return fail(500, { error: error.message, fail: true });
        }

        if (response.status == 500) {
            console.error(
                `ERROR: deleting user invite id [${userInviteId}] at [${Date.now()}] with status code [500]`
            );
            return fail(500, { fail: true });
        }

        if (response.status == 400) {
            const errorResponse = await response.json();
            console.error(
                `ERROR: deleting user invite id [${userInviteId}] NOT FOUND at [${Date.now()}] with status code [400]`
            );
            return fail(500, {
                error: errorResponse.detail,
                invalidEmail: true,
            });
        }

        return { successDelete: true };
    },
    removeUser: async (event) => {
        const request = event.request;
        const userCookie = event.locals.user;
        const data = await request.formData();

        const userId = data.get('userId') as string;
        const groupId = data.get('groupId') as string;

        console.log(
            `remove user from group userId: ${userId} userGroupId: ${groupId}`
        );

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${userCookie?.access_token}`,
            },
        };

        let response;
        try {
            response = await fetch(
                `${CONFIG.API_URL}/api/group/${groupId}/user/${userId}`,
                options
            );
        } catch (error: any) {
            console.error(
                `ERROR: removing user from group userId: ${userId} userGroupId: ${groupId} at [${Date.now()}]`,
                JSON.stringify(error)
            );
            return fail(500, { error: error.message, fail: true });
        }

        if (response.status == 500) {
            console.error(
                `ERROR: removing user from group userId: ${userId} userGroupId: ${userGroupId} at [${Date.now()}] with status code [500]`
            );
            return fail(500, { fail: true });
        }

        return { successRemoveUser: true };
    },
    assignRole: async (event) => {
        const request = event.request;
        const userCookie = event.locals.user;
        const data = await request.formData();

        const userId = data.get('userId') as string;
        const roleId = data.get('roleId') as string;
        const groupId = data.get('groupId') as string;

        console.log(
            `assign user role for groupId: ${groupId} userId: ${userId} roleId: ${roleId}`
        );

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${userCookie?.access_token}`,
            },
        };

        let response;
        try {
            response = await fetch(
                `${CONFIG.API_URL}/api/group/${groupId}/user/${userId}/role/${roleId}`,
                options
            );
        } catch (error: any) {
            console.error(
                `ERROR: assigning user role for groupId: ${groupId} userId: ${userId} roleId: ${roleId} at [${Date.now()}]`,
                JSON.stringify(error)
            );
            return fail(500, { error: error.message, fail: true });
        }

        if (response.status == 500) {
            console.error(
                `ERROR: assigning user role for groupId: ${groupId} userId: ${userId} roleId: ${roleId} at [${Date.now()}] with status code [500]`
            );
            return fail(500, { fail: true });
        }

        return { successAssignRole: true };
    },
    removeRole: async (event) => {
        const request = event.request;
        const userCookie = event.locals.user;
        const data = await request.formData();

        const userId = data.get('userId') as string;
        const roleId = data.get('roleId') as string;
        const groupId = data.get('groupId') as string;

        console.log(
            `remove user role for groupId: ${groupId} userId: ${userId} roleId: ${roleId}`
        );

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${userCookie?.access_token}`,
            },
        };

        let response;
        try {
            response = await fetch(
                `${CONFIG.API_URL}/api/group/${groupId}/user/${userId}/role/${roleId}`,
                options
            );
        } catch (error: any) {
            console.error(
                `ERROR: removing user role for groupId: ${groupId} userId: ${userId} roleId: ${roleId} at [${Date.now()}]`,
                JSON.stringify(error)
            );
            return fail(500, { error: error.message, fail: true });
        }

        if (response.status == 500) {
            console.error(
                `ERROR: removing user role for groupId: ${groupId} userId: ${userId} roleId: ${roleId} at [${Date.now()}] with status code [500]`
            );
            return fail(500, { fail: true });
        }

        return { successRemoveRole: true };
    },
};
