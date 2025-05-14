import { redirect, fail } from '@sveltejs/kit';
import { base } from '$app/paths';
import { loggedIn } from '$lib/stores/login';
import { CONFIG } from '../../../config/config';
import type { CookieSerializeOptions } from 'cookie';
import { UserCredentials } from '$lib/types/User/UserCredentials';
import type { UserCredentialsCookie } from '$lib/types/User/UserCredentialsCookie';
import { aesGcmEncrypt } from '$lib/utils/crypto/crypto-aes-gcm';
import { getUserInfo } from '$lib/utils/user/getUserInfo';
import { validate } from '$lib/utils/regex/validate';
import { backendAlphaNumRegex } from '$lib/utils/regex/internationalAlphanumericRegex';
import type { User } from '$lib/types/User/User';
import type { RequestEvent } from './$types.js';

export async function load({ locals, cookies }: RequestEvent) {
    const userCookie = locals?.user as UserCredentialsCookie;
    // Redirect on load when user is not logged in
    if (!userCookie) {
        loggedIn.set(false);
        throw redirect(302, `${base}/user/login`);
    }

    loggedIn.set(true);

    const user: User = await getUserInfo(userCookie, cookies);

    // Respond with user data
    return { user };
}

export const actions = {
    updateUserInformation: async (event: RequestEvent) => {
        const { request, locals, cookies } = event;
        const user = locals.user as UserCredentialsCookie;
        const data = await request.formData();

        // validate and sanitize input
        const first_name: string = validate(
            data.get('first_name') as string,
            backendAlphaNumRegex,
            'firstname'
        )!;
        const last_name: string = validate(
            data.get('last_name') as string,
            backendAlphaNumRegex,
            'lastname'
        )!;
        const username: string = validate(
            data.get('username') as string,
            backendAlphaNumRegex,
            'username'
        )!;

        const userPutBody = {
            first_name,
            last_name,
            username,
        };

        // reject if any inputs are null after sanitization, this should never happen
        if (first_name === null || last_name === null || username === null) {
            console.error(
                `ERROR: could not validate user input to update user info, something is null.`,
                JSON.stringify(userPutBody, null, 2)
            );
            return fail(500, { failValidation: true });
        }

        const userCred = new UserCredentials(user);
        const userAccessToken = await userCred.getAccessToken(cookies);

        const options: RequestInit = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userAccessToken}`,
            },
            body: JSON.stringify(userPutBody),
        };

        let response;
        try {
            response = await fetch(
                `${CONFIG.API_URL}/api/user/${user.id}`,
                options
            );
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
            console.error(
                `ERROR: updating user information with [${username}] at [${Date.now()}] with status code [500]`
            );
            return fail(500, { failUpdateUserInformation: true });
        }

        const cookieUserData = { ...user, ...userPutBody };
        const cookieOptions: CookieSerializeOptions & { path: string } = {
            path: '/',
            sameSite: true,
            secure: true,
            httpOnly: true,
        };

        if (cookieUserData.rememberMe) {
            // add an expiration to the cookie so it lasts longer than one browser session
            const ONE_YEAR_IN_MS = 31536000;
            cookieOptions.maxAge = ONE_YEAR_IN_MS;
        }

        locals.user = cookieUserData;
        const encryptedCredentials = await aesGcmEncrypt(
            JSON.stringify(cookieUserData),
            CONFIG.API_TOKEN
        );

        cookies.set('user-login', encryptedCredentials, cookieOptions);

        return {
            successUpdateUserInformation: true,
            first_name,
            last_name,
            username,
        };
    },
    acceptInvite: async (event: RequestEvent) => {
        const { request, cookies } = event;
        // NOTE: The following block is for temporary testing purposes
        //       We need to come back to these once we finish porting
        //       over API features
        const user = event.locals.user;
        if (!user) {
            return fail(500, { fail: true });
        }
        const data = await request.formData();

        const userInviteId = data.get('userInviteId') as string;

        console.log(`accept invite userInviteId: ${userInviteId}`);

        const userCred = new UserCredentials(user);
        const userAccessToken = await userCred.getAccessToken(cookies);

        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${userAccessToken}`,
            },
        };

        let response;
        try {
            response = await fetch(
                `${CONFIG.API_URL}/user/${userCred.userCookie.id}/invite/${userInviteId}`,
                options
            );
        } catch (error: unknown) {
            const errorLog = `ERROR: accepting user invite id [${userInviteId}] at [${Date.now()}]`;
            console.error(errorLog, JSON.stringify(error));
            return fail(500, { error: errorLog, fail: true });
        }

        if (response.status == 500) {
            console.error(
                `ERROR: accepting user invite id [${userInviteId}] at [${Date.now()}] with status code [500]`
            );
            return fail(500, { fail: true });
        }

        return { successAcceptInvite: true };
    },
    rejectInvite: async (event: RequestEvent) => {
        const { request, cookies } = event;
        // NOTE: The following block is for temporary testing purposes
        //       We need to come back to these once we finish porting
        //       over API features
        const user = event.locals.user;
        if (!user) {
            return fail(500, { fail: true });
        }
        const data = await request.formData();

        const userInviteId = data.get('userInviteId') as string;

        console.log(`rejecting invite userInviteId: ${userInviteId}`);

        const userCred = new UserCredentials(user);
        const userAccessToken = await userCred.getAccessToken(cookies);

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${userAccessToken}`,
            },
        };

        let response;
        try {
            response = await fetch(
                `${CONFIG.API_URL}/user/${userCred.userCookie.id}/invite/${userInviteId}`,
                options
            );
        } catch (error: unknown) {
            const errorLog = `ERROR: rejecting user invite id [${userInviteId}] at [${Date.now()}]`;
            console.error(errorLog, JSON.stringify(error));
            return fail(500, { error: errorLog, fail: true });
        }

        if (response.status == 500) {
            console.error(
                `ERROR: rejecting user invite id [${userInviteId}] at [${Date.now()}] with status code [500]`
            );
            return fail(500, { fail: true });
        }

        return { successRejectInvite: true };
    },
    leaveGroup: async (event: RequestEvent) => {
        const { request, cookies } = event;
        // NOTE: The following block is for temporary testing purposes
        //       We need to come back to these once we finish porting
        //       over API features
        const user = event.locals.user;
        if (!user) {
            return fail(500, { fail: true });
        }
        const data = await request.formData();

        const userId = data.get('userId') as string;
        const groupId = data.get('groupId') as string;

        console.log(
            `leaving group userGroupId: ${groupId}  userId: ${userId} `
        );
        const userCred = new UserCredentials(user);
        const userAccessToken = await userCred.getAccessToken(cookies);

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${userAccessToken}`,
            },
        };

        let response;
        try {
            response = await fetch(
                `${CONFIG.API_URL}/api/user/${userId}/group/${groupId}/`,
                options
            );
        } catch (error: unknown) {
            const errorLog = `ERROR: leaving group id [${groupId}] for user id [${userId}] at [${Date.now()}]`;
            console.error(errorLog, JSON.stringify(error));
            return fail(500, { error: errorLog, fail: true });
        }

        if (response.status == 500) {
            console.error(
                `ERROR: leaving group id [${groupId}] for user id [${userId}] at [${Date.now()}] with status code [500]`
            );
            return fail(500, { fail: true });
        }

        return { successLeaveGroup: true };
    },
};
