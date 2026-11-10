import { redirect, fail, type ActionFailure, isHttpError } from '@sveltejs/kit';
import { resolve } from '$app/paths';
import { validate } from '$lib/utils/regex/validate';
import { backendAlphaNumRegex } from '$lib/utils/regex/internationalAlphanumericRegex';
import type { RequestEvent } from './$types';
import type { FormSubmitResult } from '$lib/types/form/FormSubmitResult';
import { getUserInfo } from '$lib/utils/user/getUserInfo';
import guards from '$lib/utils/guards';
import { UserCredentialsManager } from '$lib/utils/across/auth/UserCredentialsManager';
import { PUBLIC_CONFIG } from '$config/config.public';
import logger from '$lib/logger';
import HTTP_CODES from '$lib/utils/HttpCodes';
import { callApi } from '$lib/utils/across/callApi';

type UpdateUserInformationResult = FormSubmitResult & {
    first_name: string;
    last_name: string;
    username: string;
};

export async function load({ fetch, locals }: RequestEvent) {
    const localUser = guards.requireUser(locals);
    const user = await getUserInfo(fetch, localUser.id);

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
            const errId = crypto.randomUUID();

            logger.error({
                msg: `Could not validate user input to update user info, something is null.`,
                userPutBody,
                errorId: errId,
            });

            return fail(500, {
                type: 'error',
                message: 'Form validation failed. Please try again. If this error persists, contact support.',
                _action: 'updateUserInformation',
                errorId: errId,
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

        try {
            await callApi(fetch, `/user/${user.id}`, options);
        } catch (err: unknown) {
            if (isHttpError(err)) {
                if (err.status === 403) {
                    return fail(err.status, {
                        type: 'error',
                        message: 'Forbidden. Please try logging out and back in as the session may be expired.',
                        _action: 'updateUserInformation',
                        errorId: err.body.errorId,
                        code: err.body.code,
                    });
                } else {
                    return fail(err.status, {
                        type: 'error',
                        message: 'Failed to update user information. Please try again.',
                        _action: 'updateUserInformation',
                        errorId: err.body.errorId,
                        code: err.body.code,
                    });
                }
            }

            throw err;
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

        try {
            await callApi(fetch, `/user/${user.id}/invite/${userInviteId}`, options);
        } catch (err: unknown) {
            if (isHttpError(err)) {
                return fail(err.status, {
                    type: 'error',
                    message: 'Failed to accept invite. Please try again.',
                    _action: 'acceptInvite',
                    errorId: err.body.errorId,
                    code: err.body.code,
                });
            }

            throw err;
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

        try {
            await callApi(fetch, `/user/${user.id}/invite/${userInviteId}`, options);
        } catch (err: unknown) {
            if (isHttpError(err)) {
                return fail(err.status, {
                    type: 'error',
                    message: 'Failed to reject invite. Please try again.',
                    _action: 'rejectInvite',
                    errorId: err.body.errorId,
                    code: err.body.code,
                });
            }

            throw err;
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

        try {
            await callApi(fetch, `/user/${userId}/group/${groupId}/`, options);
        } catch (err: unknown) {
            if (isHttpError(err)) {
                return fail(err.status, {
                    type: 'error',
                    message: 'Failed to leave group. Please try again.',
                    _action: 'leaveGroup',
                    errorId: err.body.errorId,
                    code: err.body.code,
                });
            }
            throw err;
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

        try {
            await callApi(fetch, `/user/${user.id}`, options);
        } catch (err: unknown) {
            if (isHttpError(err)) {
                return fail(err.status, {
                    type: 'error',
                    message: 'Failed to delete user. Please try again.',
                    _action: 'deleteUser',
                    errorId: err.body.errorId,
                    code: err.body.code,
                });
            }

            throw err;
        }

        redirect(302, resolve('/user/logout'));
    },
};
