import type { UserCredentialsCookie } from '$lib/types/User/UserCredentialsCookie';
import type { UserGroupInvite } from '$lib/types/User/UserGroupInvite';
import { CONFIG } from '../../../config/config';

export const getInvitedUsers = async (
    userCookie: UserCredentialsCookie,
    userGroupId: number
) => {
    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${userCookie.api_token}`,
        },
    };

    let response;
    try {
        response = await fetch(
            `${CONFIG.API_URL}/api/v1/across/user-group/${userGroupId}/invite`,
            options
        );
    } catch (e: any) {
        console.error(
            `ERROR: catch getting invited users [${userCookie.email}] at [${Date.now()}]`,
            JSON.stringify(e)
        );
        throw new Error('Unexpeted Error while fetching invited users');
    }

    // catch known errors from api and hide error from user
    const errorCodes = [500, 404];
    if (errorCodes.includes(response.status)) {
        console.error(
            `ERROR: getting invited users [${userCookie.email}] at [${Date.now()}] with status code [${response.status}]`
        );
        throw new Error('Unexpeted Error while fetching invited users');
    }

    const invitedUsers: UserGroupInvite[] = await response.json();

    return invitedUsers;
};
