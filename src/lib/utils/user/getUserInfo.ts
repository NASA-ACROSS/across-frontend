import type { UserCredentialsCookie } from '$lib/types/User/UserCredentialsCookie';
import { UserCredentials } from '$lib/types/User/UserCredentials';
import { CONFIG } from '../../../config/config';
import type { User } from '$lib/types/User/User';
import { redirect, type Cookies } from '@sveltejs/kit';
import { resolve } from '$app/paths';

export const getUserInfo = async (userCookie: UserCredentialsCookie, cookies: Cookies) => {
    const userCredentials = new UserCredentials(userCookie);
    const accessToken = await userCredentials.getAccessToken(cookies);
    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };

    let response;
    try {
        response = await fetch(`${CONFIG.API_URL}/user/${userCookie.id}`, options);
    } catch (e) {
        console.error(`ERROR: catch getting user roles [${userCookie.email}] at [${Date.now()}]`, JSON.stringify(e));
        throw new Error('Unexpected Error while fetching user roles');
    }

    // catch known errors from api and hide error from user
    const errorCodes = [500, 404, 401];
    if (errorCodes.includes(response.status)) {
        console.error(`ERROR: getting user roles [${userCookie.email}] at [${Date.now()}] with status code [${response.status}]`);
        cookies.delete('user-login', { path: '/' });
        redirect(302, resolve('/user/login'));
    }

    const user = (await response.json()) as User;

    return user;
};
