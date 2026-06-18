import type { GroupInvite } from '$lib/types/User/GroupInvite';
import { CONFIG } from '../../../config/config';

export const getInvitedUsers = async (userGroupId: string, fetch: typeof globalThis.fetch) => {
    const options = {
        method: 'GET',
    };

    let response;
    try {
        response = await fetch(`${CONFIG.ACROSS_SERVER_URL}/group/${userGroupId}/invite`, options);
    } catch (e: unknown) {
        console.error(`ERROR: catch getting invited users.`, JSON.stringify(e));
        throw new Error('Unexpected Error while fetching invited users');
    }

    // catch known errors from api and hide error from user
    const errorCodes = [500];
    if (errorCodes.includes(response.status)) {
        console.error(`ERROR: getting invited users failed `, { userGroupId, status: response.status, time: Date.now() });
        throw new Error('Unexpected Error while fetching invited users');
    }

    const invitedUsers = (await response.json()) as GroupInvite[];

    return invitedUsers;
};
