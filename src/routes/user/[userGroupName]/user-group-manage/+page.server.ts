import type { PageServerLoad } from './$types';

import { CONFIG } from '../../../../config/config.js';
import { fail, redirect } from '@sveltejs/kit';
import { base } from '$app/paths';
import type { User } from '$lib/types/User/User';
import { getUserInfo } from '$lib/utils/user/getUserInfo';
import { getInvitedUsers } from '$lib/utils/manage/getInvitedUsers';
import { getUserGroupAdminData } from '$lib/utils/manage/getUserGroupAdminData';
import type { AssignableRole } from '$lib/types/User/AssignableRole';

export const load: PageServerLoad = async ({ locals, params }) => {
    const userCookie = locals.user;
    // Redirect on load when user is logged in
    if (!userCookie) {
        throw redirect(303, `${base}/user/login`);
    }

    const user: User = await getUserInfo(userCookie);

    const userGroup = user.user_groups.find(
        (group) => group.short_name === params.userGroupName
    );

    const isAdmin = userGroup?.is_admin;

    if (!user || !userGroup || !isAdmin) {
        throw redirect(303, `${base}/user/profile`);
    }

    const invitedUsers = await getInvitedUsers(userCookie, userGroup.id);
    const userGroupAdminData = await getUserGroupAdminData(
        userCookie,
        userGroup.id
    );

    const adminRoleName = `${userGroupAdminData.short_name}:user_group_${userGroupAdminData.id}`;
    const adminRoleId = userGroupAdminData.roles.find(
        (role) => role.name == adminRoleName
    )!.id;

    const assignableRoles: AssignableRole[] = [
        {
            name: 'user group admin',
            role: adminRoleName,
            id: adminRoleId,
        },
    ];

    return {
        slug: params.userGroupName,
        userGroup,
        invitedUsers,
        userGroupAdminData,
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
        const userGroupId = data.get('userGroupId') as string;

        console.log(
            `invite user with email: ${email} userGroupId: ${userGroupId}`
        );

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${userCookie?.api_token}`,
            },
        };

        let response;
        try {
            response = await fetch(
                `${CONFIG.API_URL}/api/v1/across/user-group/${userGroupId}/invite?email=${encodeURIComponent(email)}`,
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
                `Attempted to invite a user [${email}] to group id [${userGroupId}] who was already in the group`
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
                Authorization: `Bearer ${userCookie?.api_token}`,
            },
        };

        let response;
        try {
            response = await fetch(
                `${CONFIG.API_URL}/api/v1/across/user-group/${userGroupId}/invite/${userInviteId}`,
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
        const userGroupId = data.get('userGroupId') as string;

        console.log(
            `remove user from group userId: ${userId} userGroupId: ${userGroupId}`
        );

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${userCookie?.api_token}`,
            },
        };

        let response;
        try {
            response = await fetch(
                `${CONFIG.API_URL}/api/v1/across/user-group/${userGroupId}/user/${userId}`,
                options
            );
        } catch (error: any) {
            console.error(
                `ERROR: removing user from group userId: ${userId} userGroupId: ${userGroupId} at [${Date.now()}]`,
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

        console.log(`assign user role for userId: ${userId} roleId: ${roleId}`);

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${userCookie?.api_token}`,
            },
        };

        let response;
        try {
            response = await fetch(
                `${CONFIG.API_URL}/api/v1/across/user-role/${roleId}/user/${userId}`,
                options
            );
        } catch (error: any) {
            console.error(
                `ERROR: assigning user role for userId: ${userId} userGroupId: ${roleId} at [${Date.now()}]`,
                JSON.stringify(error)
            );
            return fail(500, { error: error.message, fail: true });
        }

        if (response.status == 500) {
            console.error(
                `ERROR: assigning user role for userId: ${userId} userGroupId: ${roleId} at [${Date.now()}] with status code [500]`
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

        console.log(`remove user role for userId: ${userId} roleId: ${roleId}`);

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${userCookie?.api_token}`,
            },
        };

        let response;
        try {
            response = await fetch(
                `${CONFIG.API_URL}/api/v1/across/user-role/${roleId}/user/${userId}`,
                options
            );
        } catch (error: any) {
            console.error(
                `ERROR: removing user role for userId: ${userId} userGroupId: ${roleId} at [${Date.now()}]`,
                JSON.stringify(error)
            );
            return fail(500, { error: error.message, fail: true });
        }

        if (response.status == 500) {
            console.error(
                `ERROR: removing user role for userId: ${userId} userGroupId: ${roleId} at [${Date.now()}] with status code [500]`
            );
            return fail(500, { fail: true });
        }

        return { successRemoveRole: true };
    },
};
