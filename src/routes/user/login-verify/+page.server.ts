import { fail, redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';
import { CONFIG } from '../../../config/config.js';
import { jwtDecode, type JwtPayload } from 'jwt-decode';
import { RetryAfterRateLimiter } from 'sveltekit-rate-limiter/server';
import type { UserCredentialsCookie, AccessDataResponse } from '$lib/types/User/UserCredentialsCookie.js';
import type { User } from '$lib/types/User/User.js';
import { UserCredentials } from '$lib/types/User/UserCredentials.js';
import type { RequestEvent } from './$types.js';
import { localOnlyRoute } from '$lib/utils/dev/localOnlyRoute.js';

export function load({ locals }: { locals: { user: UserCredentialsCookie } }) {
    localOnlyRoute();

    const user = locals.user;
    // Redirect on load when user is logged in
    if (user) {
        redirect(302, resolve('/user/profile'));
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
    default: async (event: RequestEvent) => {
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
            response = await fetch(`${CONFIG.API_URL}/auth/verify?token=${verificationToken}`, options);
        } catch (error: unknown) {
            const errorLog = `ERROR: login-verify for verificationToken [${verificationToken}] at [${Date.now()}]`;
            console.error(errorLog, JSON.stringify(error));
            return fail(500, { error: errorLog, fail: true });
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

        const credentials = (await response?.json()) as AccessDataResponse;
        const headers = response.headers;

        if (credentials) {
            const userCredentialsCookie: UserCredentialsCookie = {
                id: '',
                first_name: '',
                last_name: '',
                username: '',
                email: '',
                access_token: credentials.access_token,
                refresh_token: '',
                rememberMe: false,
                message: '',
            };

            const data = await request.formData();
            const rememberMe = data.get('rememberMe');
            if (rememberMe) {
                userCredentialsCookie.rememberMe = true;
            }

            // get user id from access token
            const decodedToken: JwtPayload = jwtDecode(credentials.access_token);
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
                    userResponse = await fetch(`${CONFIG.API_URL}/user/${userId}`, userOptions);
                } catch (error: unknown) {
                    const errorLog = `ERROR: getting information for user [${userId}] at [${Date.now()}]`;
                    console.error(errorLog, JSON.stringify(error));
                    return fail(500, { error: errorLog, fail: true });
                }

                const userAPIInfo = (await userResponse.json()) as User;
                userCredentialsCookie.first_name = userAPIInfo.first_name;
                userCredentialsCookie.last_name = userAPIInfo.last_name;
                userCredentialsCookie.username = userAPIInfo.username;
                userCredentialsCookie.email = userAPIInfo.email;

                // Get the refresh token from the response headers
                const cookiesStr = headers.get('set-cookie');
                let refresh_token = cookiesStr
                    ?.split(';')
                    .find((element) => element.includes('refresh_token'))
                    ?.split('=')[1];

                if (refresh_token == null) {
                    refresh_token = '';
                }

                userCredentialsCookie.refresh_token = refresh_token;
            }

            const userCredentials = new UserCredentials(userCredentialsCookie);
            await userCredentials.setCookie(cookies);

            redirect(302, resolve('/user/profile'));
        }

        return {
            credentials,
        };
    },
};
