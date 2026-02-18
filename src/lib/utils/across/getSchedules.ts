import type { UserCredentialsCookie } from '$lib/types/User/UserCredentialsCookie';
import { UserCredentials } from '$lib/types/User/UserCredentials';
import { CONFIG } from '../../../config/config';
import { type Cookies } from '@sveltejs/kit';
import type { Schedule } from '$lib/types/across/Schedule';
import type { Paginate } from '$lib/types/Paginate';

export const getSchedules = async (userCookie: UserCredentialsCookie, cookies: Cookies, telescopeIds: string[]) => {
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

    const url = new URL(`${CONFIG.API_URL}/schedule/`);
    const params = {
        telescopeIds: telescopeIds.toString(),
    };
    url.search = new URLSearchParams(params).toString();

    let response;
    try {
        response = await fetch(url, options);
    } catch (e) {
        console.error(`ERROR: catch getting schedules at [${Date.now()}]`, JSON.stringify(e));
        throw new Error('Unexpected Error while fetching schedules');
    }

    // catch known errors from api and hide error from user
    const errorCodes = [500, 404, 401];
    if (errorCodes.includes(response.status)) {
        console.error(`ERROR: getting schedules at [${Date.now()}] with status code [${response.status}]`);
    }

    const schedules = (await response.json()) as Paginate<Schedule>;

    return schedules;
};
