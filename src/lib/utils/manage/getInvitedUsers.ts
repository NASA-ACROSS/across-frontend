import logger from '$lib/logger';
import type { GroupInvite } from '$lib/types/User/GroupInvite';
import { CONFIG } from '../../../config/config';

export const getInvitedUsers = async (userGroupId: string, fetch: typeof globalThis.fetch) => {
    const options = {
        method: 'GET',
    };

    let response;
    try {
        response = await fetch(`${CONFIG.ACROSS_SERVER_URL}/group/${userGroupId}/invite`, options);
    } catch (err: unknown) {
        logger.error({ err, userGroupId }, 'Error fetching invited users');
        throw new Error('Unexpected Error while fetching invited users');
    }

    // catch known errors from api and hide error from user
    const errorCodes = [500];
    if (errorCodes.includes(response.status)) {
        logger.error({ userGroupId, status: response.status }, 'Failed fetching invited users');
        throw new Error('Unexpected Error while fetching invited users');
    }

    const invitedUsers = (await response.json()) as GroupInvite[];

    return invitedUsers;
};
