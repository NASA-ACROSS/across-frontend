import type { UserCredentialsCookie } from '$lib/types/User/UserCredentialsCookie';
import { UserCredentials } from '$lib/types/User/UserCredentials';
import { CONFIG } from '../../../config/config';
import { type Cookies } from '@sveltejs/kit';
import type { Telescope } from '$lib/types/across/Telescope';

export const getTelescopes = async (userCookie: UserCredentialsCookie, cookies: Cookies) => {
    let accessToken;
    if (userCookie) {
        const userCredentials = new UserCredentials(userCookie);
        accessToken = await userCredentials.getAccessToken(cookies);
    }

    const options: RequestInit = {
        method: 'GET',
    };

    let headers = {};
    if (accessToken) {
        headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        options.headers = headers;
    }

    let response;
    try {
        response = await fetch(`${CONFIG.API_URL}/telescope/`, options);
    } catch (e) {
        console.error(`ERROR: catch getting telescopes at [${Date.now()}]`, JSON.stringify(e));
        throw new Error('Unexpected Error while fetching telescopes');
    }

    // catch known errors from api and hide error from user
    const errorCodes = [500, 404, 401];
    if (errorCodes.includes(response.status)) {
        console.error(`ERROR: getting telescopes at [${Date.now()}] with status code [${response.status}]`);
    }

    const telescopes = (await response.json()) as Telescope[];

    return telescopes;
};
