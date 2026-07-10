import { redirect, fail, type ActionFailure } from '@sveltejs/kit';
import { resolve } from '$app/paths';
import { CONFIG } from '../../../config/config';
import { validate } from '$lib/utils/regex/validate';
import { backendAlphaNumRegex } from '$lib/utils/regex/internationalAlphanumericRegex';
import type { RequestEvent } from './$types';
import type { FormSubmitResult } from '$lib/types/form/FormSubmitResult';
import { getUserInfo } from '$lib/utils/user/getUserInfo';
import guards from '$lib/utils/guards';
import { UserCredentialsManager } from '$lib/utils/across/auth/UserCredentialsManager';
import { PUBLIC_CONFIG } from '$config/config.public';
import logger from '$lib/logger';
import type { AcrossApiErrorResponse } from '$lib/types/error/AcrossApiErrorResponse';
import HTTP_CODES from '$lib/utils/HttpCodes';

type UpdateUserInformationResult = FormSubmitResult & {
    first_name: string;
    last_name: string;
    username: string;
};

export async function load(event: RequestEvent) {
    guards.localOnlyRoute();
    const localUser = guards.requireUser(event.locals);

    const user = await getUserInfo(localUser.id, event.fetch);

    // Respond with user data
    return { user };
}

export const actions = {
    updateUserInformation: async (event: RequestEvent): Promise<UpdateUserInformationResult | ActionFailure<FormSubmitResult>> => {
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
                msg: `Could not validate user input to update user info, something is null.`,
                userPutBody,
            });
            return fail(500, {
                type: 'error',
                message: 'Form validation failed. Please try again. If this error persists, contact support.',
                _action: 'updateUserInformation',
                errorId: crypto.randomUUID(),
                code: HTTP_CODES[500],
            });
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
            const errorLog = `Failed updating user information.`;
            logger.error({ err, msg: errorLog });
            return fail(500, {
                type: 'error',
                message: errorLog,
                _action: 'updateUserInformation',
                errorId: crypto.randomUUID(),
                code: HTTP_CODES[500],
            });
        }

        if (response.status == 403) {
            const errorResponse = (await response.json()) as AcrossApiErrorResponse;
            logger.error({ msg: `Forbidden access to user`, status: response.status, error: errorResponse.detail });
            return fail(500, {
                type: 'error',
                message: 'Forbidden. Please try logging out and back in as the session may be expired.',
                _action: 'updateUserInformation',
                errorId: crypto.randomUUID(),
                code: HTTP_CODES[500],
            });
        }

        if (response.status == 500) {
            const errorResponse = (await response.json()) as AcrossApiErrorResponse;
            logger.error({ msg: `Failed updating user information.`, status: response.status, error: errorResponse.detail });
            return fail(500, {
                type: 'error',
                message: 'Failed to update user information. Please try again.',
                _action: 'updateUserInformation',
                errorId: crypto.randomUUID(),
                code: HTTP_CODES[500],
            });
        }

        const cookieUserData = { ...user, ...userPutBody };
        // Not sure if this is needed since user data is reset on page load?
        await UserCredentialsManager.SetCookie(cookies, PUBLIC_CONFIG.USER_INFO_COOKIE_NAME, cookieUserData);

        return {
            type: 'success',
            message: 'Successfully updated user information!',
            first_name,
            last_name,
            username,
            _action: 'updateUserInformation',
        };
    },
    acceptInvite: async (event: RequestEvent): Promise<FormSubmitResult | ActionFailure<FormSubmitResult>> => {
        const { request, fetch } = event;
        const user = guards.requireUser(event.locals);

        const data = await request.formData();

        const userInviteId = data.get('userInviteId') as string;

        logger.info({ msg: `accepting user invite.`, userInviteId, userId: user.id });

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
            const errorLog = `Request failed accepting user invite`;
            logger.error({ err, userInviteId, userId: user.id, msg: errorLog });
            return fail(500, {
                type: 'error',
                message: errorLog,
                _action: 'acceptInvite',
                errorId: crypto.randomUUID(),
                code: HTTP_CODES[500],
            });
        }

        if (response.status >= 400) {
            const errorResponse = (await response.json()) as AcrossApiErrorResponse;
            logger.error({
                msg: `Failed accepting user invite`,
                status: response.status,
                userInviteId,
                userId: user.id,
                error: errorResponse.detail,
            });
            return fail(500, {
                type: 'error',
                message: 'Failed to accept invite. Please try again.',
                _action: 'acceptInvite',
                errorId: crypto.randomUUID(),
                code: HTTP_CODES[500],
            });
        }

        return { type: 'success', message: 'Invite accepted!', _action: 'acceptInvite' };
    },
    rejectInvite: async (event: RequestEvent): Promise<FormSubmitResult | ActionFailure<FormSubmitResult>> => {
        const { request, fetch } = event;

        const user = guards.requireUser(event.locals);
        const data = await request.formData();

        const userInviteId = data.get('userInviteId') as string;

        logger.info({ msg: `rejecting user invite.`, userInviteId, userId: user.id });

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
            const errorLog = `Request failed rejecting user invite`;
            logger.error({ err, userInviteId, userId: user.id, msg: errorLog });
            return fail(500, {
                type: 'error',
                message: errorLog,
                _action: 'rejectInvite',
                errorId: crypto.randomUUID(),
                code: HTTP_CODES[500],
            });
        }

        if (response.status >= 400) {
            const errorResponse = (await response.json()) as AcrossApiErrorResponse;
            logger.error({
                msg: `Failed rejecting user invite`,
                status: response.status,
                userInviteId,
                userId: user.id,
                error: errorResponse.detail,
            });
            return fail(500, {
                type: 'error',
                message: 'Failed to reject invite. Please try again.',
                _action: 'rejectInvite',
                errorId: crypto.randomUUID(),
                code: HTTP_CODES[500],
            });
        }

        return { type: 'success', message: 'Invite rejected.', _action: 'rejectInvite' };
    },
    leaveGroup: async (event: RequestEvent): Promise<FormSubmitResult | ActionFailure<FormSubmitResult>> => {
        const { request, fetch } = event;

        const data = await request.formData();

        const userId = data.get('userId') as string;
        const groupId = data.get('groupId') as string;

        logger.info({ msg: `leaving group.`, groupId, userId });

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
            const errorLog = `Request failed leaving group`;
            logger.error({ err, groupId, userId, msg: errorLog });
            return fail(500, {
                type: 'error',
                message: errorLog,
                _action: 'leaveGroup',
                errorId: crypto.randomUUID(),
                code: HTTP_CODES[500],
            });
        }

        if (response.status >= 400) {
            const errorResponse = (await response.json()) as AcrossApiErrorResponse;
            logger.error({ msg: `Failed leaving group`, status: response.status, groupId, userId, error: errorResponse.detail });
            return fail(500, {
                type: 'error',
                message: 'Failed to leave group. Please try again.',
                _action: 'leaveGroup',
                errorId: crypto.randomUUID(),
                code: HTTP_CODES[500],
            });
        }

        return { type: 'success', message: 'Successfully left the group.', _action: 'leaveGroup' };
    },
    deleteUser: async (event: RequestEvent): Promise<FormSubmitResult | ActionFailure<FormSubmitResult>> => {
        const { fetch } = event;
        const user = guards.requireUser(event.locals);

        logger.info({ msg: `Deleting user.`, email: user.email, userId: user.id });

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
            const errorLog = `Request failed deleting user`;
            logger.error({ err, userId: user.id, email: user.email, msg: errorLog });
            return fail(500, {
                type: 'error',
                message: errorLog,
                _action: 'deleteUser',
                errorId: crypto.randomUUID(),
                code: HTTP_CODES[500],
            });
        }

        if (response.status >= 400) {
            const errorResponse = (await response.json()) as AcrossApiErrorResponse;
            logger.error({
                msg: `Failed deleting user`,
                status: response.status,
                userId: user.id,
                email: user.email,
                error: errorResponse.detail,
            });
            return fail(response.status, {
                type: 'error',
                message: 'Failed to delete user. Please try again.',
                _action: 'deleteUser',
                errorId: crypto.randomUUID(),
                code: HTTP_CODES[response.status],
            });
        }

        redirect(302, resolve('/user/logout'));
    },
};
