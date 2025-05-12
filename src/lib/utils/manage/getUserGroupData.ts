import type { UserCredentialsCookie } from '$lib/types/User/UserCredentialsCookie';
import type { UserGroupData } from '$lib/types/User/UserGroupData';
import { CONFIG } from '../../../config/config';

export const getUserGroupData = async (
    userCookie: UserCredentialsCookie,
    userGroupId: number
) => {
    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${userCookie.access_token}`,
        },
    };

    let response;
    try {
        response = await fetch(
            `${CONFIG.API_URL}/api/group/${userGroupId}`,
            options
        );
    } catch (e: any) {
        console.error(
            `ERROR: catch getting user group data [${userCookie.email}] at [${Date.now()}]`,
            JSON.stringify(e)
        );
        throw new Error('Unexpeted Error while fetching user group data');
    }

    // catch known errors from api and hide error from user
    const errorCodes = [500, 404];
    if (errorCodes.includes(response.status)) {
        console.error(
            `ERROR: getting user group data [${userCookie.email}] at [${Date.now()}] with status code [${response.status}]`
        );
        throw new Error('Unexpeted Error while fetching user group data');
    }

    const userGroupData: UserGroupData = await response.json();

    return userGroupData;
};
