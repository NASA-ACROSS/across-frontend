import { redirect, fail } from '@sveltejs/kit';
import { resolve } from '$app/paths';
import { CONFIG } from '../../../config/config';
import { validate } from '$lib/utils/regex/validate';
import { backendAlphaNumRegex } from '$lib/utils/regex/internationalAlphanumericRegex';
import type { RequestEvent } from './$types';
import { getUserInfo } from '$lib/utils/user/getUserInfo';
import guards from '$lib/utils/guards';
import { UserCredentialsManager } from '$lib/utils/across/auth/UserCredentialsManager';
import { PUBLIC_CONFIG } from '$config/config.public';

export async function load(event: RequestEvent) {
    guards.localOnlyRoute();
    const localUser = guards.requireUser(event.locals);

    const user = await getUserInfo(localUser.id, event.fetch);

    // Respond with user data
    return { user };
}

export const actions = {
    updateUserInformation: async (event: RequestEvent) => {
        const { request, locals, cookies, fetch } = event;
        const user = guards.requireUser(locals);

        const data = await request.formData();

        // validate and sanitize input
        const first_name: string = validate(data.get('first_name') as string, backendAlphaNumRegex, 'first_name')!;
        const last_name: string = validate(data.get('last_name') as string, backendAlphaNumRegex, 'last_name')!;
        const username: string = validate(data.get('username') as string, backendAlphaNumRegex, 'username')!;

        const userPutBody = {
            first_name,
            last_name,
            username,
        };

        // reject if any inputs are null after sanitization, this should never happen
        if (first_name === null || last_name === null || username === null) {
            console.error(`ERROR: could not validate user input to update user info, something is null.`, JSON.stringify(userPutBody, null, 2));
            return fail(500, { failValidation: true });
        }

        const options: RequestInit = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userPutBody),
        };

        let response;
        try {
            response = await fetch(`${CONFIG.ACROSS_SERVER_URL}/user/${user.id}`, options);
        } catch (error: unknown) {
            const errorLog = `ERROR: updating user information [${username}] at [${Date.now()}]`;
            console.error(errorLog, JSON.stringify(error));
            return fail(500, {
                error: errorLog,
                failUpdateUserInformation: true,
            });
        }

        if (response.status == 403) {
            console.error(`ERROR: API not accessible or API TOKEN not valid`);
            return fail(500, { failUpdateUserInformation: true });
        }

        if (response.status == 500) {
            console.error(`ERROR: updating user information with [${username}] at [${Date.now()}] with status code [500]`);
            return fail(500, { failUpdateUserInformation: true });
        }

        const cookieUserData = { ...user, ...userPutBody };
        // Not sure if this is needed since user data is reset on page load?
        await UserCredentialsManager.SetCookie(cookies, PUBLIC_CONFIG.USER_INFO_COOKIE_NAME, cookieUserData);

        return {
            successUpdateUserInformation: true,
            first_name,
            last_name,
            username,
        };
    },
    acceptInvite: async (event: RequestEvent) => {
        const { request, fetch } = event;
        const user = guards.requireUser(event.locals);

        const data = await request.formData();

        const userInviteId = data.get('userInviteId') as string;

        console.log(`accept invite userInviteId: ${userInviteId}`);

        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        let response;
        try {
            response = await fetch(`${CONFIG.ACROSS_SERVER_URL}/user/${user.id}/invite/${userInviteId}`, options);
        } catch (error: unknown) {
            const errorLog = `ERROR: accepting user invite id [${userInviteId}] at [${Date.now()}]`;
            console.error(errorLog, JSON.stringify(error));
            return fail(500, { error: errorLog, fail: true });
        }

        if (response.status == 500) {
            console.error(`ERROR: accepting user invite id [${userInviteId}] at [${Date.now()}] with status code [500]`);
            return fail(500, { fail: true });
        }

        return { successAcceptInvite: true };
    },
    rejectInvite: async (event: RequestEvent) => {
        const { request, fetch } = event;

        const user = guards.requireUser(event.locals);
        const data = await request.formData();

        const userInviteId = data.get('userInviteId') as string;

        console.log(`rejecting invite userInviteId: ${userInviteId}`);

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        let response;
        try {
            response = await fetch(`${CONFIG.ACROSS_SERVER_URL}/user/${user.id}/invite/${userInviteId}`, options);
        } catch (error: unknown) {
            const errorLog = `ERROR: rejecting user invite id [${userInviteId}] at [${Date.now()}]`;
            console.error(errorLog, JSON.stringify(error));
            return fail(500, { error: errorLog, fail: true });
        }

        if (response.status == 500) {
            console.error(`ERROR: rejecting user invite id [${userInviteId}] at [${Date.now()}] with status code [500]`);
            return fail(500, { fail: true });
        }

        return { successRejectInvite: true };
    },
    leaveGroup: async (event: RequestEvent) => {
        const { request, fetch } = event;

        const data = await request.formData();

        const userId = data.get('userId') as string;
        const groupId = data.get('groupId') as string;

        console.log(`leaving group userGroupId: ${groupId}  userId: ${userId} `);

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        let response;
        try {
            response = await fetch(`${CONFIG.ACROSS_SERVER_URL}/user/${userId}/group/${groupId}/`, options);
        } catch (error: unknown) {
            const errorLog = `ERROR: leaving group id [${groupId}] for user id [${userId}] at [${Date.now()}]`;
            console.error(errorLog, JSON.stringify(error));
            return fail(500, { error: errorLog, fail: true });
        }

        if (response.status == 500) {
            console.error(`ERROR: leaving group id [${groupId}] for user id [${userId}] at [${Date.now()}] with status code [500]`);
            return fail(500, { fail: true });
        }

        return { successLeaveGroup: true };
    },
    deleteUser: async (event: RequestEvent) => {
        const { fetch } = event;
        const user = guards.requireUser(event.locals);

        console.log(`Deleting user. email: ${user.email} userId: ${user.id}`);

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        let response;
        try {
            response = await fetch(`${CONFIG.ACROSS_SERVER_URL}/user/${user.id}`, options);
        } catch (error: unknown) {
            const errorLog = `ERROR: deleting user id [${user.id}] at [${Date.now()}]`;
            console.error(errorLog, JSON.stringify(error));
            return fail(500, { error: errorLog, fail: true });
        }

        if (response.status != 200) {
            console.error(`ERROR: deleting user id [${user.id}] at [${Date.now()}] with status code [${response.status}]`);
            return fail(response.status, { fail: true });
        }

        redirect(302, resolve('/user/logout'));
    },
};
