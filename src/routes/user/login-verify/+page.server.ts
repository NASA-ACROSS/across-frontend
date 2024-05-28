import { fail, redirect } from '@sveltejs/kit';
import { base } from "$app/paths";
import { loggedIn } from "$lib/stores/login"
import { CONFIG } from '../../../config/config.js';
import { RetryAfterRateLimiter } from 'sveltekit-rate-limiter/server';
import type { CookieSerializeOptions } from 'cookie';

export function load({ cookies }) {
    const user = cookies.get('user-login');
    // Redirect on load when user is logged in
    if (user) {
        throw redirect(303, `${base}/user/profile`);
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
        const verificationKey = url.searchParams.get('verification_key');

        // Rate limit user login-verify
        // Every call to isLimited counts as a hit towards the rate limit for the event.
        const rateStatus = await limiter.check(event);
        if (rateStatus.limited) {
            console.error(
                `ERROR: rate-limiting at /login-verify for verificationKey [${verificationKey}] at time [${Date.now()}] with IP [${event.getClientAddress()}] with retryAfter [${rateStatus.retryAfter}] seconds`
            );
            return fail(429, {
                rateLimit: true,
                retryAfter: rateStatus.retryAfter,
            });
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${CONFIG.API_TOKEN}`,
            },
        };

        // trade verification key for api key
        let response;
        try {
            response = await fetch(
                `${CONFIG.API_URL}/api/v1/across/user/login-verify/${verificationKey}`,
                options
            );
        } catch (error: any) {
            console.error(
                `ERROR: login-verify for verificationKey [${verificationKey}] at [${Date.now()}]`,
                JSON.stringify(error)
            );
            return fail(500, { error: error?.message, fail: true });
        }

        // short circuit for error status
        if (response.status != 200) {
            console.error(
                `ERROR: login-verify for verificationKey [${verificationKey}] at time [${Date.now()}] with status code [${response.status}] with status text ${response.statusText}`,
                response
            );
            return {};
        }

        // clear current login cookie
        cookies.delete('user-login', { path: '/' });

        const credentials = await response?.json();

        if (credentials) {
            const cookieOptions: CookieSerializeOptions & { path: string } = {
                path: '/',
                sameSite: true,
                secure: true,
                httpOnly: true,
            };

            const data = await request.formData();
            const rememberMe = data.get('rememberMe');
            if (rememberMe) {
                // add an expiration to the cookie so it lasts longer than one browser session
                const ONE_YEAR_IN_MS = 31536000;
                cookieOptions.maxAge = ONE_YEAR_IN_MS;
                credentials.rememberMe = true;
            }

            cookies.set(
                'user-login',
                JSON.stringify(credentials),
                cookieOptions
            );

            throw redirect(303, `${base}/user/profile`);
        }

        return {
            credentials,
        };
    },
};