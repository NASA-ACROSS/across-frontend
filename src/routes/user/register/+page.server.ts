import { emailRegex } from '$lib/utils/regex/emailRegex';
import { backendAlphaNumRegex } from '$lib/utils/regex/internationalAlphanumericRegex';
import { validate } from '$lib/utils/regex/validate';
import { CONFIG } from '../../../config/config';
import { fail, redirect } from '@sveltejs/kit';
import { RetryAfterRateLimiter } from 'sveltekit-rate-limiter/server';
import { resolve } from '$app/paths';
import { autoLogin } from '$lib/utils/user/autoLogin.js';
import type { RequestEvent } from './$types';
import type { UserCredentialsCookie } from '$lib/types/User/UserCredentialsCookie';
import guards from '$lib/utils/guards';
import logger from '$lib/logger';
import type { ErrorResponse } from '$lib/types/error/ErrorResponse';

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
    default: async (event: RequestEvent) => {
        const { request, fetch } = event;
        const data = await request.formData();

        // validate and sanitize input
        const firstname = validate(data.get('firstname') as string, backendAlphaNumRegex, 'firstname');
        const lastname = validate(data.get('lastname') as string, backendAlphaNumRegex, 'lastname');
        const username = validate(data.get('username') as string, backendAlphaNumRegex, 'username');
        const email = validate(data.get('email') as string, emailRegex, 'email');

        const user_post_data = {
            first_name: firstname,
            last_name: lastname,
            username,
            email,
            roles: 'user',
        };

        // reject if any inputs are null after sanitization, this should never happen
        if (firstname === null || lastname === null || username === null || email === null) {
            logger.error({
                msg: 'Failed to validate user input to register user, something is null.',
                user_post_data,
            });
            return fail(500, { failValidation: true });
        }

        // Rate limit user registration
        // Every call to isLimited counts as a hit towards the rate limit for the event.
        const rateStatus = await limiter.check(event);
        if (rateStatus.limited) {
            logger.error({
                msg: 'Rate-limit at /register for provided email',
                user_post_data,
                email,
                ip: event.getClientAddress(),
                retryAfter: rateStatus.retryAfter,
            });

            return fail(429, {
                rateLimit: true,
                retryAfter: rateStatus.retryAfter,
                error: `Too many registration attempts. Please try again in ${rateStatus.retryAfter} seconds.`,
            });
        }

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user_post_data),
        };

        let response;
        try {
            response = await fetch(`${CONFIG.ACROSS_SERVER_URL}/user`, options);
        } catch (err: unknown) {
            const errorLog = 'Request failed to register user.';
            logger.error({
                msg: errorLog,
                err,
                user_post_data,
            });
            return fail(500, { error: errorLog, fail: true });
        }

        if (response.status === 401) {
            logger.error({
                msg: 'Unauthenticated while registering email',
                email,
                status: response.status,
            });
            return fail(401, { fail: true });
        }

        if (response.status === 409) {
            const errorResponse = (await response.json()) as ErrorResponse;
            logger.error({
                msg: 'User already exists',
                email,
                username,
                status: response.status,
                error: errorResponse.detail,
            });

            return fail(500, {
                error: 'User already exists',
                userAlreadyExists: true,
            });
        }

        if (response.status === 500 || response.status === 422) {
            const errorResponse = (await response.json()) as ErrorResponse;
            logger.error({
                msg: 'Error registering user',
                email,
                username,
                status: response.status,
                error: errorResponse.detail,
            });
            return fail(500, { fail: true });
        }

        await autoLogin(response);

        return { success: true, firstname, lastname, username, email };
    },
};
