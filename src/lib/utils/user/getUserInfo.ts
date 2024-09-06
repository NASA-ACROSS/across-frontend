import type { UserCredentialsCookie } from '$lib/types/User/UserCredentialsCookie';
import { CONFIG } from '../../../config/config';
import type { User } from '$lib/types/User/User';

export const getUserInfo = async (userCookie: UserCredentialsCookie) => {
    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${userCookie.api_token}`,
        },
    };

    let response;
    try {
        response = await fetch(
            `${CONFIG.API_URL}/api/v1/across/user/${userCookie.id}`,
            options
        );
    } catch (e: any) {
        console.error(
            `ERROR: catch getting user roles [${userCookie.email}] at [${Date.now()}]`,
            JSON.stringify(e)
        );
        throw new Error('Unexpeted Error while fetching user roles');
    }

    // catch known errors from api and hide error from user
    const errorCodes = [500, 404];
    if (errorCodes.includes(response.status)) {
        console.error(
            `ERROR: getting user roles [${userCookie.email}] at [${Date.now()}] with status code [${response.status}]`
        );
        throw new Error('Unexpeted Error while fetching user roles');
    }

    const user: User = await response.json();

    return user;
};
