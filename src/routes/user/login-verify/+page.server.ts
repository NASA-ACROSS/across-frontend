import { fail, redirect } from '@sveltejs/kit';
import { base } from '$app/paths';
import { CONFIG } from '../../../config/config.js';
import { jwtDecode } from "jwt-decode";
import { RetryAfterRateLimiter } from 'sveltekit-rate-limiter/server';
import type { CookieSerializeOptions } from 'cookie';
import { aesGcmEncrypt } from '$lib/utils/crypto/crypto-aes-gcm';
import type { UserCredentialsCookie, AccessDataResponse } from '$lib/types/User/UserCredentialsCookie.js';
import type { User } from '$lib/types/User/User.js';

export function load({ locals }: { locals: { user: UserCredentialsCookie } }) {
    const user = locals.user;
    // Redirect on load when user is logged in
    if (user) {
        throw redirect(302, `${base}/user/profile`);
    }
    return {};
}

// rate limit is defined as [number, unit]
// see documentation for more info
// https://github.com/ciscoheat/sveltekit-rate-limiter?tab=readme-ov-file#valid-units
const limiter = new RetryAfterRateLimiter({
    // IP + User Agent limiter, 5 login requests per 15 mins, resetting every 15 minutes
    IPUA: [5, '15m'],
    // IP address limiter, triple the limit to ensure multiple users from the same IP don't become limited
    IP: [15, '15m'],
});

export const actions = {
    default: async (event) => {
        const { url, request, cookies } = event;
        const verificationToken = url.searchParams.get('token');

        // Rate limit user login-verify
        // Every call to isLimited counts as a hit towards the rate limit for the event.
        const rateStatus = await limiter.check(event);
        if (rateStatus.limited) {
            console.error(
                `ERROR: rate-limiting at /verify for verificationToken [${verificationToken}] at time [${Date.now()}] with IP [${event.getClientAddress()}] with retryAfter [${rateStatus.retryAfter}] seconds`
            );
            return fail(429, {
                rateLimit: true,
                retryAfter: rateStatus.retryAfter,
            });
        }

        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${CONFIG.API_TOKEN}`,
            },
        };

        // trade verification token for access token
        let response;
        try {
            response = await fetch(
                `${CONFIG.API_URL}/api/auth/verify?token=${verificationToken}`,
                options
            );
        } catch (error: any) {
            console.error(
                `ERROR: login-verify for verificationToken [${verificationToken}] at [${Date.now()}]`,
                JSON.stringify(error)
            );
            return fail(500, { error: error?.message, fail: true });
        }

        // short circuit for error status
        if (response.status != 200) {
            console.error(
                `ERROR: login-verify for verificationToken [${verificationToken}] at time [${Date.now()}] with status code [${response.status}] with status text ${response.statusText}`,
                response
            );
            return {};
        }

        // clear current login cookie
        cookies.delete('user-login', { path: '/' });

        const credentials = await response?.json() as AccessDataResponse;
        const headers = response.headers;

        if (credentials) {
            const cookieOptions: CookieSerializeOptions & { path: string } = {
                path: '/',
                sameSite: true,
                secure: true,
                httpOnly: true,
            };

            const userCredentialsCookie: UserCredentialsCookie = {
                id: '',
                first_name: '',
                last_name: '',
                username: '',
                email: '',
                access_token: credentials.access_token,
                refresh_token: '',
                rememberMe: false,
                message: ''
            };

            const data = await request.formData();
            const rememberMe = data.get('rememberMe');
            if (rememberMe) {
                // add an expiration to the cookie so it lasts longer than one browser session
                const ONE_YEAR_IN_MS = 31536000;
                cookieOptions.maxAge = ONE_YEAR_IN_MS;
                userCredentialsCookie.rememberMe = true;
            }

            // get user id from access token
            const decodedToken = jwtDecode(credentials.access_token);
            const userId = decodedToken.sub;

            // Get the User info using the ID
            if (userId) {

                userCredentialsCookie.id = userId;

                const userOptions = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: `Bearer ${credentials.access_token}`,
                    },
                };
        
                let userResponse;
                try {
                    userResponse = await fetch(
                        `${CONFIG.API_URL}/api/user/${userId}`,
                        userOptions
                    );
                } catch (error: any) {
                    console.error(
                        `ERROR: getting information for user [${userId}] at [${Date.now()}]`,
                        JSON.stringify(error)
                    );
                    return fail(500, { error: error?.message, fail: true });
                }

                const userAPIInfo = await userResponse.json() as User;
                userCredentialsCookie.first_name = userAPIInfo.first_name;
                userCredentialsCookie.last_name = userAPIInfo.last_name;
                userCredentialsCookie.username = userAPIInfo.username;
                userCredentialsCookie.email = userAPIInfo.email;

                // Get the refresh token from the response headers
                const cookies = headers.get('set-cookie');
                let refresh_token = '';
                if (cookies) {
                    const cookieArray = cookies.split(';');
                    for (let index = 0; index < cookieArray.length; ++index) {
                        const cookie = cookieArray[index];
                        if (cookie.includes('refresh_token')) {
                            refresh_token = cookie.split('=')[1];
                        }
                    }
                }
                userCredentialsCookie.refresh_token = refresh_token;
            }

            const encryptedCredentials = await aesGcmEncrypt(
                JSON.stringify(userCredentialsCookie),
                CONFIG.API_TOKEN
            );

            cookies.set('user-login', encryptedCredentials, cookieOptions);

            throw redirect(302, `${base}/user/profile`);
        }

        return {
            credentials,
        };
    },
};
