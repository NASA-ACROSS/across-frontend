import { redirect, fail } from '@sveltejs/kit';
import { base } from '$app/paths';
import { loggedIn } from '$lib/stores/login';
import { CONFIG } from '../../../config/config.js';
import type { CookieSerializeOptions } from 'cookie';

export function load({ cookies }) {
    const user = cookies.get('user-login');
    // Redirect on load when user is not logged in
    if (!user) {
        loggedIn.set(false);
        throw redirect(303, `${base}/user/login`);
    }
    // Respond with user cookie data
    return { user: JSON.parse(user) };
}

export const actions = {
    updateUserInformation: async (event: any) => {
        const { request, cookies } = event;
        const user = JSON.parse(cookies.get('user-login'));
        const data = await request.formData();

        const firstname = data.get('firstname') as string;
        const lastname = data.get('lastname') as string;
        const username = data.get('username') as string;
        const email = data.get('email') as string;

        const user_put_data = {
            firstname,
            lastname,
            username,
            email,
            roles: user.roles,
        };

        const USER_API_TOKEN = event.locals.user.api_token;

        const options: RequestInit = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${USER_API_TOKEN}`,
            },
        };

        const requestParams = new URLSearchParams(user_put_data);

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
                `ERROR: register user with [${email}, ${username}] at [${Date.now()}] with status code [500]`
            );
            return fail(500, { fail: true });
        }

        const cookieUserData = { ...user, ...user_put_data };
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

        cookies.set(
            'user-login',
            JSON.stringify(cookieUserData),
            cookieOptions
        );

        return { success: true, firstname, lastname, username, email };
    },
};
