import { CONFIG } from '../../../config/config.js';
import { fail, redirect, type RequestEvent } from '@sveltejs/kit';
import { RetryAfterRateLimiter } from 'sveltekit-rate-limiter/server';
import { resolve } from '$app/paths';
import type { UserCredentialsCookie } from '$lib/types/User/UserCredentialsCookie.js';
import { emailRegex } from '$lib/utils/regex/emailRegex.js';
import type { Actions } from './$types.js';
import { localOnlyRoute } from '$lib/utils/dev/localOnlyRoute';

export function load({ locals }: RequestEvent) {
    localOnlyRoute();

    const userCookie = locals?.user as UserCredentialsCookie;
    // Redirect on load when user is logged in
    if (userCookie) {
        redirect(302, resolve('/user/profile'));
    }
}

// rate limit is defined as [number, unit]
// see documentation for more info
// https://github.com/ciscoheat/sveltekit-rate-limiter?tab=readme-ov-file#valid-units
const limiter = new RetryAfterRateLimiter({
    // IP + User Agent limiter, 5 login requests per 15 mins, resetting every 15 minutes
    IPUA: [50, '15m'],
    // IP address limiter, triple the limit to ensure multiple users from the same IP don't become limited
    IP: [150, '15m'],
});

export const actions = {
    default: async (event: RequestEvent) => {
        event.cookies.delete('user-login', {
            path: '/',
        });
        event.locals.user = undefined;

        const data = await event.request.formData();

        const email = data.get('email');

        if (typeof email !== 'string' || !email.match(emailRegex)) {
            return fail(400, {
                invalidEmail: true,
                message: 'Please provide a valid email.',
            });
        }

        // Rate limit user login
        // Every call to isLimited counts as a hit towards the rate limit for the event.
        const rateStatus = await limiter.check(event);
        if (rateStatus.limited) {
            console.error(
                `ERROR: rate-limiting at /login for user email [${email}] at time [${Date.now()}] with IP [${event.getClientAddress()}] with retryAfter [${rateStatus.retryAfter}] seconds`
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

        let response: Response;
        try {
            response = await fetch(`${CONFIG.API_URL}/auth/login?email=${encodeURIComponent(email)}`, options);
        } catch (error) {
            console.error(`ERROR: logging in user [${email}] at [${Date.now()}]`, JSON.stringify(error));

            if (error instanceof Error) {
                return fail(500, { error: error.message, fail: true });
            } else {
                return fail(500, { error: 'Unknown error trying to login.' });
            }
        }

        if (response.status == 500) {
            console.error(`ERROR: logging in user [${email}] at [${Date.now()}] with status code [500]`);
            return fail(500, { fail: true });
        }

        if (response.status == 401) {
            const errorResponse = (await response.json()) as { detail: string };
            console.warn(errorResponse.detail, JSON.stringify({ email: email, ip: event.getClientAddress() }));
            return fail(401, { notFound: true });
        }

        return { success: true, email };
    },
} satisfies Actions;
