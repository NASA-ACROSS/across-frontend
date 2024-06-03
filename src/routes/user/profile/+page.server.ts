import { redirect, fail } from '@sveltejs/kit';
import { base } from '$app/paths';
import { loggedIn } from '$lib/stores/login';
import { CONFIG } from '../../../config/config.js';
import type { CookieSerializeOptions } from 'cookie';
import type { UserCredentialsCookie } from '$lib/types/UserCredentialsCookie.js';
import { aesGcmEncrypt } from '$lib/utils/crypto/crypto-aes-gcm';

export function load({ locals }: { locals: { user: UserCredentialsCookie } }) {
    const user = locals.user;
    // Redirect on load when user is not logged in
    if (!user) {
        loggedIn.set(false);
        throw redirect(303, `${base}/user/login`);
    }

    loggedIn.set(true);
    // Respond with user cookie data
    return { user };
}

export const actions = {
    updateUserInformation: async (event: any) => {
        const { request, locals, cookies } = event;
        const user: UserCredentialsCookie = locals.user;
        const data = await request.formData();

        const firstname = data.get('firstname') as string;
        const lastname = data.get('lastname') as string;
        const username = data.get('username') as string;
        const email = data.get('email') as string;

        const userPutData = {
            firstname,
            lastname,
            username,
            email,
        };

        const USER_API_TOKEN = event.locals.user.api_token;

        const options: RequestInit = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${USER_API_TOKEN}`,
            },
        };

        const requestParams = new URLSearchParams(userPutData);

        let response;
        try {
            response = await fetch(
                `${CONFIG.API_URL}/api/v1/across/user/${user.id}?${requestParams.toString()}`,
                options
            );
        } catch (error: any) {
            console.error(
                `ERROR: updating user information [${email}] at [${Date.now()}]`,
                JSON.stringify(error)
            );
            return fail(500, { error: error.message, fail: true });
        }

        if (response.status == 403) {
            console.error(`ERROR: API not accessible or API TOKEN not valid`);
            return fail(500, { fail: true });
        }

        if (response.status == 500) {
            console.error(
                `ERROR: updating user information with [${email}, ${username}] at [${Date.now()}] with status code [500]`
            );
            return fail(500, { fail: true });
        }

        const cookieUserData = { ...user, ...userPutData };
        const cookieOptions: CookieSerializeOptions & { path: string } = {
            path: '/',
            sameSite: true,
            secure: true,
            httpOnly: true,
        };

        if (cookieUserData.rememberMe) {
            // add an expiration to the cookie so it lasts longer than one browser session
            const ONE_YEAR_IN_MS = 31536000;
            cookieOptions.maxAge = ONE_YEAR_IN_MS;
        }

        locals.user = cookieUserData;
        const encryptedCredentials = await aesGcmEncrypt(JSON.stringify(cookieUserData), CONFIG.API_TOKEN);

        cookies.set(
            'user-login',
            encryptedCredentials,
            cookieOptions
        );

        return { success: true, firstname, lastname, username, email };
    },
};
