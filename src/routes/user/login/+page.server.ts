import { CONFIG } from '../../../config/config';
import { fail, redirect, type RequestEvent } from '@sveltejs/kit';
import { RetryAfterRateLimiter } from 'sveltekit-rate-limiter/server';
import { resolve } from '$app/paths';
import { autoLogin } from '$lib/utils/user/autoLogin.js';
import { emailRegex } from '$lib/utils/regex/emailRegex';
import type { Actions } from './$types';
import { clearAuth } from '$lib/handles/clearAuth';
import guards from '$lib/utils/guards';
import logger from '$lib/logger';

export function load({ locals }: RequestEvent) {
    guards.localOnlyRoute();

    const userCookie = locals?.user;
    // Redirect to profile page when user is logged in
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
        const { request, fetch } = event;
        clearAuth(event);

        const data = await request.formData();

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
            logger.error({ msg: `Rate limit exceeded for login.`, email, ip: event.getClientAddress(), retryAfter: rateStatus.retryAfter });

            return fail(429, {
                rateLimit: true,
                retryAfter: rateStatus.retryAfter,
            });
        }

        const options = {
            method: 'POST',
        };

        let response: Response;
        try {
            response = await fetch(`${CONFIG.ACROSS_SERVER_URL}/auth/login?email=${encodeURIComponent(email)}`, options);
        } catch (err: unknown) {
            logger.error({ msg: `Failed logging in user.`, email, err });

            if (err instanceof Error) {
                return fail(500, { error: err.message, fail: true });
            } else {
                return fail(500, { error: 'Unknown error trying to login.' });
            }
        }

        if (response.status == 500) {
            logger.error({ msg: `Failed logging in user.`, email, status: response.status });
            return fail(500, { fail: true });
        }

        if (response.status == 401) {
            const errorResponse = (await response.json()) as { detail: string };
            logger.warn({ msg: errorResponse.detail, email, ip: event.getClientAddress() });
            return fail(401, { notFound: true });
        }

        await autoLogin(response);

        return { success: true, email };
    },
} satisfies Actions;
