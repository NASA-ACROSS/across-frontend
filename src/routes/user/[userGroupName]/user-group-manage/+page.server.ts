import type { PageServerLoad, RequestEvent } from './$types';
import { fail, isHttpError, redirect, type ActionFailure } from '@sveltejs/kit';

import { resolve } from '$app/paths';
import { getUserInfo } from '$lib/utils/user/getUserInfo';
import { getInvitedUsers } from '$lib/utils/manage/getInvitedUsers';
import { getGroupData } from '$lib/utils/manage/getGroupData';
import type { FormSubmitResult } from '$lib/types/form/FormSubmitResult';
import { isAdmin } from '$lib/utils/user/isAdmin';
import guards from '$lib/utils/guards';
import logger from '$lib/logger';
import { callApi } from '$lib/utils/across/callApi';

export const load: PageServerLoad = async ({ locals, params, fetch }) => {
    guards.localOnlyRoute();
    const userCookie = guards.requireUser(locals);

    const user = await getUserInfo(fetch, userCookie.id);

    // find current group from route by short_name
    const userGroup = user.groups.find((group) => group.short_name === params.userGroupName);

    // redirect if we don't have necessary info or user lacks permission
    if (!user || !userGroup || !isAdmin(user, userGroup)) {
        redirect(302, resolve('/user/profile'));
    }

    const invitedUsers = await getInvitedUsers(fetch, userGroup.id);
    const groupData = await getGroupData(fetch, userGroup.id);

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

        logger.info({ msg: 'Inviting user to group', email, groupId });

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

        try {
            await callApi(fetch, `/group/${groupId}/invite`, options);
            return { type: 'success', message: 'User invited!', _action: 'inviteUser' };
        } catch (err: unknown) {
            if (isHttpError(err)) {
                if (err.status === 409) {
                    logger.warn({
                        msg: `Attempted to invite a user who was already in the group.`,
                        email,
                        groupId,
                    });

                    return {
                        type: 'warning',
                        message: 'User is already invited or in the group.',
                        _action: 'inviteUser',
                    };
                } else if (err.status === 404) {
                    return fail(err.status, {
                        type: 'error',
                        message: 'User not found.',
                        _action: 'inviteUser',
                        errorId: err.body.errorId,
                        code: err.body.code,
                    });
                } else {
                    return fail(err.status, {
                        type: 'error',
                        message: 'Failed to invite user.',
                        _action: 'inviteUser',
                        errorId: err.body.errorId,
                        code: err.body.code,
                    });
                }
            }

            throw err;
        }
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

        try {
            await callApi(fetch, `/group/${userGroupId}/invite/${userInviteId}`, options);
            return { type: 'success', message: 'Invite deleted.', _action: 'deleteInvite' };
        } catch (err: unknown) {
            if (isHttpError(err)) {
                return fail(err.status, {
                    type: 'error',
                    message: 'Failed to delete user invite.',
                    _action: 'deleteInvite',
                    errorId: err.body.errorId,
                    code: err.body.code,
                });
            }

            throw err;
        }
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

        try {
            await callApi(fetch, `/group/${groupId}/user/${userId}`, options);
            return { type: 'success', message: 'User removed from group.', _action: 'removeUser' };
        } catch (err: unknown) {
            if (isHttpError(err)) {
                return fail(err.status, {
                    type: 'error',
                    message: 'Failed to remove user from group.',
                    _action: 'removeUser',
                    errorId: err.body.errorId,
                    code: err.body.code,
                });
            }

            throw err;
        }
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

        try {
            await callApi(fetch, `/group/${groupId}/user/${userId}/role/${roleId}`, options);
            return { type: 'success', message: 'Role assigned.', _action: 'assignRole' };
        } catch (err: unknown) {
            if (isHttpError(err)) {
                return fail(err.status, {
                    type: 'error',
                    message: 'Failed to assign user role.',
                    _action: 'assignRole',
                    errorId: err.body.errorId,
                    code: err.body.code,
                });
            }

            throw err;
        }
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
            await callApi(fetch, `/group/${groupId}/user/${userId}/role/${roleId}`, options);
            return { type: 'success', message: 'Role removed.', _action: 'removeRole' };
        } catch (err: unknown) {
            if (isHttpError(err)) {
                return fail(err.status, {
                    type: 'error',
                    message: 'Failed to remove user role.',
                    _action: 'removeRole',
                    errorId: err.body.errorId,
                    code: err.body.code,
                });
            }

            throw err;
        }
    },
};
