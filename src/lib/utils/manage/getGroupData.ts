import type { UserCredentialsCookie } from '$lib/types/User/UserCredentialsCookie';
import type { Group } from '$lib/types/User/Group';
import { CONFIG } from '../../../config/config';

export const getGroupData = async (userCookie: UserCredentialsCookie, userGroupId: number): Promise<Group> => {
    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${userCookie.access_token}`,
        },
    };

    let response;
    try {
        response = await fetch(`${CONFIG.API_URL}/group/${userGroupId}`, options);
    } catch (e: unknown) {
        const errorLog = `ERROR: catch getting user group data [${userCookie.email}] at [${Date.now()}]`;
        console.error(errorLog, JSON.stringify(e));
        throw new Error('Unexpeted Error while fetching user group data');
    }

    // catch known errors from api and hide error from user
    const errorCodes = [500, 404];
    if (errorCodes.includes(response.status)) {
        console.error(`ERROR: getting user group data [${userCookie.email}] at [${Date.now()}] with status code [${response.status}]`);
        throw new Error('Unexpeted Error while fetching user group data');
    }

    const group = (await response.json()) as Group;

    return group;
};
