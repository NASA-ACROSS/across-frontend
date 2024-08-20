import { redirect, fail } from '@sveltejs/kit';
import { base } from '$app/paths';
import { loggedIn } from '$lib/stores/login';
import { CONFIG } from '../../../config/config';
import type { CookieSerializeOptions } from 'cookie';
import type { UserCredentialsCookie } from '$lib/types/UserCredentialsCookie';
import { aesGcmEncrypt } from '$lib/utils/crypto/crypto-aes-gcm';
import { getUserInfo } from '$lib/utils/user/getUserInfo';
import { validate } from '$lib/utils/regex/validate';
import { backendAlphaNumRegex } from '$lib/utils/regex/internationalAlphanumericRegex';
import { emailRegex } from '$lib/utils/regex/emailRegex';
import type { User } from '$lib/types/User';

export async function load({ locals }) {
    const userCookie = locals.user;
    // Redirect on load when user is not logged in
    if (!userCookie) {
        loggedIn.set(false);
        throw redirect(303, `${base}/user/login`);
    }

    loggedIn.set(true);

    const user: User = await getUserInfo(userCookie);

    console.log(user);

    // Respond with user cookie data
    return { user };
}

export const actions = {
    updateUserInformation: async (event: any) => {
        const { request, locals, cookies } = event;
        const user: UserCredentialsCookie = locals.user;
        const data = await request.formData();

        // validate and sanitize input
        const firstname = validate(
            data.get('firstname'),
            backendAlphaNumRegex,
            'firstname'
        );
        const lastname = validate(
            data.get('lastname'),
            backendAlphaNumRegex,
            'lastname'
        );
        const username = validate(
            data.get('username'),
            backendAlphaNumRegex,
            'username'
        );
        const email = validate(data.get('email'), emailRegex, 'email');

        const userPutData = {
            firstname,
            lastname,
            username,
            email,
        };

        // reject if any inputs are null after sanitization, this should never happen
        if (
            firstname === null ||
            lastname === null ||
            username === null ||
            email === null
        ) {
            console.error(
                `ERROR: could not validate user input to update user info, something is null.`,
                JSON.stringify(userPutData, null, 2)
            );
            return fail(500, { failValidation: true });
        }

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
            return fail(500, {
                error: error.message,
                failUpdateUserInformation: true,
            });
        }

        if (response.status == 403) {
            console.error(`ERROR: API not accessible or API TOKEN not valid`);
            return fail(500, { failUpdateUserInformation: true });
        }

        if (response.status == 500) {
            console.error(
                `ERROR: updating user information with [${email}, ${username}] at [${Date.now()}] with status code [500]`
            );
            return fail(500, { failUpdateUserInformation: true });
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
        const encryptedCredentials = await aesGcmEncrypt(
            JSON.stringify(cookieUserData),
            CONFIG.API_TOKEN
        );

        cookies.set('user-login', encryptedCredentials, cookieOptions);

        return {
            successUpdateUserInformation: true,
            firstname,
            lastname,
            username,
            email,
        };
    },
};
