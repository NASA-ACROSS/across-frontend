import logger from '$lib/logger';
import type { GroupInvite } from '$lib/types/User/GroupInvite';
import { CONFIG } from '../../../config/config';

export const getInvitedUsers = async (groupId: string, fetch: typeof globalThis.fetch) => {
    const options = {
        method: 'GET',
    };

    let response;
    try {
        response = await fetch(`${CONFIG.ACROSS_SERVER_URL}/group/${groupId}/invite`, options);
    } catch (err: unknown) {
        logger.error({ msg: 'Error fetching invited users for group', groupId, err });
        throw new Error('Unexpected Error while fetching invited users');
    }

    // catch known errors from api and hide error from user
    const errorCodes = [500];
    if (errorCodes.includes(response.status)) {
        logger.error({ msg: 'Error fetching invited users for group', groupId, status: response.status });
        throw new Error('Unexpected Error while fetching invited users');
    }

    const invitedUsers = (await response.json()) as GroupInvite[];

    return invitedUsers;
};
