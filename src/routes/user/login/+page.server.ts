import { CONFIG } from '../../../config/config';
import { fail, redirect, type ActionFailure, type RequestEvent } from '@sveltejs/kit';
import { RetryAfterRateLimiter } from 'sveltekit-rate-limiter/server';
import { resolve } from '$app/paths';
import { autoLogin } from '$lib/utils/user/autoLogin.js';
import { emailRegex } from '$lib/utils/regex/emailRegex';
import type { Actions } from './$types';
import type { FormSubmitResult } from '$lib/types/form/FormSubmitResult';
import { clearAuth } from '$lib/handles/clearAuth';
import guards from '$lib/utils/guards';
import logger from '$lib/logger';
import HTTP_CODES from '$lib/utils/HttpCodes';

type LoginResult = FormSubmitResult & {
    email?: string;
    retryAfter?: number;
};

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
    default: async (event: RequestEvent): Promise<LoginResult | ActionFailure<FormSubmitResult>> => {
        const { request, fetch } = event;
        clearAuth(event);

        const data = await request.formData();

        const email = data.get('email');

        if (typeof email !== 'string' || !email.match(emailRegex)) {
            return fail(400, {
                type: 'error',
                message: 'Please provide a valid email.',
                errorId: crypto.randomUUID(),
                code: HTTP_CODES[400],
            });
        }

        // Rate limit user login
        // Every call to isLimited counts as a hit towards the rate limit for the event.
        const rateStatus = await limiter.check(event);
        if (rateStatus.limited) {
            logger.error({ msg: `Rate limit exceeded for login.`, email, ip: event.getClientAddress(), retryAfter: rateStatus.retryAfter });

            return fail(429, {
                type: 'error',
                message: `You are being rate limited, please retry after ${rateStatus.retryAfter} seconds.`,
                retryAfter: rateStatus.retryAfter,
                error: `Too many login attempts. Please try again in ${rateStatus.retryAfter} seconds.`,
                errorId: crypto.randomUUID(),
                code: HTTP_CODES[429],
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
                return fail(500, {
                    type: 'error',
                    message: err.message,
                    errorId: crypto.randomUUID(),
                    code: HTTP_CODES[500],
                });
            } else {
                return fail(500, {
                    type: 'error',
                    message: 'Unknown error trying to login. If this error persists, please contact support.',
                    errorId: crypto.randomUUID(),
                    code: HTTP_CODES[500],
                });
            }
        }

        if (response.status == 500) {
            logger.error({ msg: `Failed logging in user.`, email, status: response.status });
            return fail(500, {
                type: 'error',
                message: 'Something went wrong, please try again. If this error persists, contact support.',
                errorId: crypto.randomUUID(),
                code: HTTP_CODES[500],
            });
        }

        if (response.status === 401) {
            const errorResponse = (await response.json()) as { detail: string };
            logger.warn({ msg: errorResponse.detail, email, ip: event.getClientAddress() });
            return fail(401, {
                type: 'error',
                message: 'The email address is not registered.',
                errorId: crypto.randomUUID(),
                code: HTTP_CODES[401],
            });
        }

        await autoLogin(response);

        return { type: 'success', message: 'Please check your email for a login link!', email };
    },
} satisfies Actions;
