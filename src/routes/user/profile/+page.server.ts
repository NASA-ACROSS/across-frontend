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
import logger from '$lib/logger';
import type { ErrorResponse } from '$lib/types/error/ErrorResponse';

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
            logger.error({
                msg: 'Could not validate user input to update user info, something is null.',
                userPutBody,
            });
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
        } catch (err: unknown) {
            const msg = 'Request failed to update user information.';
            logger.error({
                msg,
                err,
            });
            return fail(500, {
                error: msg,
                failUpdateUserInformation: true,
            });
        }

        if (response.status >= 400) {
            logger.error({
                msg: 'Failed to update user information.',
                userId: user.id,
                status: response.status,
                userPutBody,
            });
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

        logger.info({ msg: 'Accepting group invite.', userInviteId, userId: user.id });

        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        let response;
        try {
            response = await fetch(`${CONFIG.ACROSS_SERVER_URL}/user/${user.id}/invite/${userInviteId}`, options);
        } catch (err: unknown) {
            const msg = 'Request failed to accept group invite';
            logger.error({
                msg,
                err,
                userInviteId,
                userId: user.id,
            });
            return fail(500, { error: msg, fail: true });
        }

        if (response.status >= 400) {
            const msg = 'Failed to accept group invite.';
            const errorResponse = (await response.json()) as ErrorResponse;
            logger.error({
                msg,
                userInviteId,
                userId: user.id,
                status: response.status,
                error: errorResponse.detail,
            });
            return fail(response.status, { error: msg, fail: true });
        }

        return { successAcceptInvite: true };
    },
    rejectInvite: async (event: RequestEvent) => {
        const { request, fetch } = event;

        const user = guards.requireUser(event.locals);
        const data = await request.formData();

        const userInviteId = data.get('userInviteId') as string;

        logger.info({ msg: 'Rejecting group invite.', userInviteId, userId: user.id });

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        let response;
        try {
            response = await fetch(`${CONFIG.ACROSS_SERVER_URL}/user/${user.id}/invite/${userInviteId}`, options);
        } catch (err: unknown) {
            const msg = 'Request failed to reject group invite';
            logger.error({
                msg,
                err,
                userInviteId,
                userId: user.id,
            });
            return fail(500, { error: msg, fail: true });
        }

        if (response.status >= 400) {
            const msg = 'Failed to reject group invite.';
            const errorResponse = (await response.json()) as ErrorResponse;
            logger.error({
                msg,
                userInviteId,
                userId: user.id,
                status: response.status,
                error: errorResponse.detail,
            });
            return fail(response.status, { error: msg, fail: true });
        }

        return { successRejectInvite: true };
    },
    leaveGroup: async (event: RequestEvent) => {
        const { request, fetch } = event;

        const data = await request.formData();

        const userId = data.get('userId') as string;
        const groupId = data.get('groupId') as string;

        logger.info({ msg: 'User is leaving group', groupId, userId });

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        let response;
        try {
            response = await fetch(`${CONFIG.ACROSS_SERVER_URL}/user/${userId}/group/${groupId}/`, options);
        } catch (err: unknown) {
            const msg = 'Request failed to leave group';
            logger.error({
                msg,
                err,
                groupId,
                userId,
            });
            return fail(500, { error: msg, fail: true });
        }

        if (response.status >= 400) {
            const msg = 'Failed to leave group.';
            const errorResponse = (await response.json()) as ErrorResponse;
            logger.error({
                msg,
                groupId,
                userId,
                status: response.status,
                error: errorResponse.detail,
            });
            return fail(response.status, { error: msg, fail: true });
        }

        return { successLeaveGroup: true };
    },
    deleteUser: async (event: RequestEvent) => {
        const { fetch } = event;
        const user = guards.requireUser(event.locals);

        logger.info({ msg: `Deleting user.`, userId: user.id });

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        let response;
        try {
            response = await fetch(`${CONFIG.ACROSS_SERVER_URL}/user/${user.id}`, options);
        } catch (err: unknown) {
            const msg = 'Request failed to delete user';
            logger.error({
                msg,
                err,
                userId: user.id,
            });
            return fail(500, { error: msg, fail: true });
        }

        if (response.status >= 400) {
            const msg = 'Failed to delete user.';
            const errorResponse = (await response.json()) as ErrorResponse;
            logger.error({
                msg,
                userId: user.id,
                status: response.status,
                error: errorResponse.detail,
            });
            return fail(response.status, { error: msg, fail: true });
        }

        redirect(302, resolve('/user/logout'));
    },
};
