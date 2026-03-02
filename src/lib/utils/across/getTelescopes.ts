import type { UserCredentialsCookie } from '$lib/types/User/UserCredentialsCookie';
import { UserCredentials } from '$lib/types/User/UserCredentials';
import { CONFIG } from '../../../config/config';
import { type Cookies } from '@sveltejs/kit';
import type { Telescope } from '$lib/types/across/Telescope';

type GetTelescopesParams = {
    id?: string;
    name?: string;
};

export const getTelescopes = async (userCookie: UserCredentialsCookie, cookies: Cookies, params?: GetTelescopesParams) => {
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

    const apiUrl = `${CONFIG.API_URL}/telescope/`;
    let requestUrl = apiUrl;

    if (params?.id) {
        requestUrl = `${apiUrl}${params.id}`;
    } else if (params) {
        const apiParams = new URLSearchParams();
        // Add all query parameters to API request
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined) {
                apiParams.append(key, String(value));
            }
        });

        requestUrl = `${apiUrl}?${apiParams.toString()}`;
    }

    let response;
    try {
        response = await fetch(requestUrl, options);
    } catch (e) {
        console.error(`ERROR: catch getting telescopes at [${Date.now()}]`, JSON.stringify(e));
        throw new Error('Unexpected Error while fetching telescopes');
    }

    // catch known errors from api and hide error from user
    const errorCodes = [500, 404, 401];
    if (errorCodes.includes(response.status)) {
        console.error(`ERROR: getting telescopes at [${Date.now()}] with status code [${response.status}]`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    let telescopes: Telescope[] = await response.json();

    if (!Array.isArray(telescopes)) {
        telescopes = [telescopes];
    }

    return telescopes;
};
