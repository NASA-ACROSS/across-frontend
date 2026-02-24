import type { UserCredentialsCookie } from '$lib/types/User/UserCredentialsCookie';
import type { GroupInvite } from '$lib/types/User/GroupInvite';
import { CONFIG } from '../../../config/config';

export const getInvitedUsers = async (userCookie: UserCredentialsCookie, userGroupId: number) => {
    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${userCookie.access_token}`,
        },
    };

    let response;
    try {
        response = await fetch(`${CONFIG.API_URL}/group/${userGroupId}/invite`, options);
    } catch (e: unknown) {
        console.error(`ERROR: catch getting invited users [${userCookie.email}] at [${Date.now()}]`, JSON.stringify(e));
        throw new Error('Unexpected Error while fetching invited users');
    }

    // catch known errors from api and hide error from user
    const errorCodes = [500, 404];
    if (errorCodes.includes(response.status)) {
        console.error(`ERROR: getting invited users [${userCookie.email}] at [${Date.now()}] with status code [${response.status}]`);
        throw new Error('Unexpected Error while fetching invited users');
    }

    const invitedUsers = (await response.json()) as GroupInvite[];

    return invitedUsers;
};
