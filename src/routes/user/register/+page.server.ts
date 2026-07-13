import { emailRegex } from '$lib/utils/regex/emailRegex';
import { backendAlphaNumRegex } from '$lib/utils/regex/internationalAlphanumericRegex';
import { validate } from '$lib/utils/regex/validate';
import { CONFIG } from '../../../config/config';
import { fail, redirect, type ActionFailure } from '@sveltejs/kit';
import { RetryAfterRateLimiter } from 'sveltekit-rate-limiter/server';
import { resolve } from '$app/paths';
import { autoLogin } from '$lib/utils/user/autoLogin.js';
import type { RequestEvent } from './$types';
import type { UserCredentialsCookie } from '$lib/types/User/UserCredentialsCookie';
import type { FormSubmitResult } from '$lib/types/form/FormSubmitResult';
import guards from '$lib/utils/guards';
import logger from '$lib/logger';
import type { AcrossApiErrorResponse } from '$lib/types/error/AcrossApiErrorResponse';
import HTTP_CODES from '$lib/utils/HttpCodes';

type RegisterResult = FormSubmitResult & {
    firstname?: string;
    lastname?: string;
    username?: string;
    email?: string;
    retryAfter?: number;
};

// rate limit is defined as [number, unit]
// see documentation for more info
// https://github.com/ciscoheat/sveltekit-rate-limiter?tab=readme-ov-file#valid-units
const limiter = new RetryAfterRateLimiter({
    // IP + User Agent limiter, 5 login requests per 15 mins, resetting every 15 minutes
    IPUA: [5, '15m'],
    // IP address limiter, triple the limit to ensure multiple users from the same IP don't become limited
    IP: [15, '15m'],
});

export function load({ locals }: RequestEvent) {
    guards.localOnlyRoute();

    const userCookie = locals?.user as UserCredentialsCookie;
    // Redirect to profile page when user is logged in
    if (userCookie) {
        redirect(302, resolve('/user/profile'));
    }
}

export const actions = {
    default: async (event: RequestEvent): Promise<RegisterResult | ActionFailure<FormSubmitResult>> => {
        const { request, fetch } = event;
        const data = await request.formData();

        // validate and sanitize input
        const firstname = validate(data.get('firstname') as string, backendAlphaNumRegex, 'firstname');
        const lastname = validate(data.get('lastname') as string, backendAlphaNumRegex, 'lastname');
        const username = validate(data.get('username') as string, backendAlphaNumRegex, 'username');
        const email = validate(data.get('email') as string, emailRegex, 'email');

        const user = {
            first_name: firstname,
            last_name: lastname,
            username,
            email,
            roles: 'user',
        };

        // reject if any inputs are null after sanitization, this should never happen
        if (firstname === null || lastname === null || username === null || email === null) {
            logger.error({
                msg: `Could not validate user input to register user, something is null.`,
                user,
            });
            return fail(500, {
                type: 'error',
                message: 'Form validation failed. Please try again. If this error persists, contact support.',
                errorId: crypto.randomUUID(),
                code: HTTP_CODES[500],
            });
        }

        // Rate limit user registration
        // Every call to isLimited counts as a hit towards the rate limit for the event.
        const rateStatus = await limiter.check(event);
        if (rateStatus.limited) {
            logger.error({
                msg: 'Rate-limiting at /register',
                email,
                ip: event.getClientAddress(),
                retryAfter: rateStatus.retryAfter,
            });

            return fail(429, {
                type: 'error',
                message: `You are being rate limited, please retry after ${rateStatus.retryAfter} seconds.`,
                retryAfter: rateStatus.retryAfter,
                error: `Too many registration attempts. Please try again in ${rateStatus.retryAfter} seconds.`,
                errorId: crypto.randomUUID(),
                code: HTTP_CODES[429],
            });
        }

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        };

        let response;
        try {
            response = await fetch(`${CONFIG.ACROSS_SERVER_URL}/user`, options);
        } catch (err: unknown) {
            const errorLog = `Request failed registering user`;
            logger.error({ err, msg: errorLog });
            return fail(500, {
                type: 'error',
                message: errorLog,
                errorId: crypto.randomUUID(),
                code: HTTP_CODES[500],
            });
        }

        if (response.status === 401) {
            logger.error({ email, status: response.status, msg: `Unauthenticated while registering email` });
            return fail(401, {
                type: 'error',
                message: 'Something went wrong, please try again. If this error persists, contact support.',
                errorId: crypto.randomUUID(),
                code: HTTP_CODES[401],
            });
        }

        if (response.status === 409) {
            const errorResponse = (await response.json()) as AcrossApiErrorResponse;
            logger.error({ email, username, status: response.status, msg: `User already exists.`, error: errorResponse.detail });
            return fail(409, {
                type: 'error',
                message: 'The email address is unavailable.',
                errorId: crypto.randomUUID(),
                code: HTTP_CODES[409],
            });
        }

        if (response.status === 500 || response.status === 422) {
            const errorResponse = (await response.json()) as AcrossApiErrorResponse;
            logger.error({ email, username, status: response.status, msg: `Failed registering user.`, error: errorResponse.detail });
            return fail(500, {
                type: 'error',
                message: 'Something went wrong, please try again. If this error persists, contact support.',
                errorId: crypto.randomUUID(),
                code: HTTP_CODES[500],
            });
        }

        await autoLogin(response);

        return { type: 'success', message: 'Please check your email for a verification link!', firstname, lastname, username, email };
    },
};
