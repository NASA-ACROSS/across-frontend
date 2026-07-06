import { emailRegex } from '$lib/utils/regex/emailRegex';
import { backendAlphaNumRegex } from '$lib/utils/regex/internationalAlphanumericRegex';
import { validate } from '$lib/utils/regex/validate';
import { CONFIG } from '../../../config/config';
import { fail, redirect } from '@sveltejs/kit';
import { RetryAfterRateLimiter } from 'sveltekit-rate-limiter/server';
import { resolve } from '$app/paths';
import { autoLogin } from '$lib/utils/user/autoLogin.js';
import { verifyCaptcha } from '$lib/utils/altcha/verifyCaptcha';
import type { RequestEvent } from './$types';
import type { UserCredentialsCookie } from '$lib/types/User/UserCredentialsCookie';
import guards from '$lib/utils/guards';
import logger from '$lib/logger';

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

        // Verify the ALTCHA proof-of-work before doing any work. The payload is
        // carried via a cookie, so this does not consume the request body.
        const captchaFailure = await verifyCaptcha(event, '/register');
        if (captchaFailure) return captchaFailure;

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
            return fail(500, { failValidation: true });
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
                rateLimit: true,
                retryAfter: rateStatus.retryAfter,
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
            logger.error({ err }, errorLog);
            return fail(500, { error: errorLog, fail: true });
        }

        if (response.status === 401) {
            logger.error({ email, status: response.status }, `Unauthenticated while registering email`);
            return fail(401, { fail: true });
        }

        if (response.status === 409) {
            const errorResponse = (await response.json()) as { detail: string };
            logger.error({ email, username, status: response.status }, `User already exists.`);
            return fail(500, {
                error: errorResponse.detail,
                userAlreadyExists: true,
            });
        }

        if (response.status === 500 || response.status === 422) {
            logger.error({ email, username, status: response.status }, `Failed registering user.`);
            return fail(500, { fail: true });
        }

        await autoLogin(response);

        return { success: true, firstname, lastname, username, email };
    },
};
