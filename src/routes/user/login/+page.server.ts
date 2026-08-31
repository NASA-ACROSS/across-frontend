import { fail, isHttpError, redirect, type ActionFailure, type RequestEvent } from '@sveltejs/kit';
import { RetryAfterRateLimiter } from 'sveltekit-rate-limiter/server';
import { resolve } from '$app/paths';
import { autoLogin } from '$lib/utils/user/autoLogin.js';
import { emailRegex } from '$lib/utils/regex/emailRegex';
import type { Actions } from './$types';
import type { FormSubmitResult } from '$lib/types/form/FormSubmitResult';
import { clearAuth } from '$lib/handles/clearAuth';
import guards from '$lib/utils/guards';
import logger from '$lib/logger';
import { callApi } from '$lib/utils/across/callApi';
import HTTP_CODES from '$lib/utils/HttpCodes';
import { type MagicLinkDTO } from '$lib/types/auth/MagicLinkDTO';

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
            return fail(422, {
                type: 'error',
                message: 'Please provide a valid email.',
                errorId: crypto.randomUUID(),
                code: HTTP_CODES[422],
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

        try {
            const { data } = await callApi(fetch, `/auth/login?email=${encodeURIComponent(email)}`, options);
            autoLogin(data as MagicLinkDTO);
        } catch (err: unknown) {
            if (isHttpError(err)) {
                if (err.status === 401 || err.status === 404) {
                    // noop for 401 or 404 as the system should not leak that the email does not exist to avoid
                    // leaking information about registered emails as per NASA security requirements. The ACROSS
                    // server returns a 401 when a user is not found to comply with the above security requirements,
                    // and _should not_ return a 404 for this endpoint. However, if it ever does, we will treat it
                    // the same as a 401.
                } else {
                    return fail(err.status, {
                        type: 'error',
                        message: 'An unexpected error occurred. Please try again later. If this issue persists, please contact support.',
                        errorId: err.body?.errorId ?? crypto.randomUUID(),
                        code: err.body?.code ?? HTTP_CODES[err.status] ?? HTTP_CODES[500],
                    });
                }
            } else {
                throw err;
            }
        }

        return { type: 'success', message: `An email has been sent to ${email}`, email };
    },
} satisfies Actions;
