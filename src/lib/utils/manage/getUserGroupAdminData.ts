import type { UserCredentialsCookie } from '$lib/types/User/UserCredentialsCookie';
import type { UserGroupAdminData } from '$lib/types/User/UserGroupAdminData';
import { CONFIG } from '../../../config/config';

export const getUserGroupAdminData = async (
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
            `${CONFIG.API_URL}/api/v1/across/user-group/${userGroupId}`,
            options
        );
    } catch (e: any) {
        console.error(
            `ERROR: catch getting user group admin data [${userCookie.email}] at [${Date.now()}]`,
            JSON.stringify(e)
        );
        throw new Error('Unexpeted Error while fetching user group admin data');
    }

    // catch known errors from api and hide error from user
    const errorCodes = [500, 404];
    if (errorCodes.includes(response.status)) {
        console.error(
            `ERROR: getting user group admin data [${userCookie.email}] at [${Date.now()}] with status code [${response.status}]`
        );
        throw new Error('Unexpeted Error while fetching user group admin data');
    }

    const userGroupAdminData: UserGroupAdminData = await response.json();

    return userGroupAdminData;
};
