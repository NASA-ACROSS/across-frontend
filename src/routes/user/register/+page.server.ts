import { emailRegex } from '$lib/utils/regex/emailRegex.js';
import { backendAlphaNumRegex } from '$lib/utils/regex/internationalAlphanumericRegex.js';
import { validate } from '$lib/utils/regex/validate.js';
import { CONFIG } from '../../../config/config.js';
import { fail } from '@sveltejs/kit';
import { RetryAfterRateLimiter } from 'sveltekit-rate-limiter/server';
import type { RequestEvent } from './$types.js';

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
        const { request } = event;
        const data = await request.formData();

        // validate and sanitize input
        const firstname = validate(
            data.get('firstname') as string,
            backendAlphaNumRegex,
            'firstname'
        );
        const lastname = validate(
            data.get('lastname') as string,
            backendAlphaNumRegex,
            'lastname'
        );
        const username = validate(
            data.get('username') as string,
            backendAlphaNumRegex,
            'username'
        );
        const email = validate(
            data.get('email') as string,
            emailRegex,
            'email'
        );

        const user_post_data = {
            first_name: firstname,
            last_name: lastname,
            username,
            email,
            roles: 'user',
        };

        // reject if any inputs are null after sanitization, this should never happen
        if (
            firstname === null ||
            lastname === null ||
            username === null ||
            email === null
        ) {
            console.error(
                `ERROR: could not validate user input to register user, something is null.`,
                JSON.stringify(user_post_data, null, 2)
            );
            return fail(500, { failValidation: true });
        }

        // Rate limit user registration
        // Every call to isLimited counts as a hit towards the rate limit for the event.
        const rateStatus = await limiter.check(event);
        if (rateStatus.limited) {
            console.error(
                `ERROR: rate-limiting at /register for email [${email}] at time [${Date.now()}] with IP [${event.getClientAddress()}] with retryAfter [${rateStatus.retryAfter}] seconds.`,
                user_post_data
            );
            return fail(429, {
                rateLimit: true,
                retryAfter: rateStatus.retryAfter,
            });
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${CONFIG.API_TOKEN}`,
            },
            body: JSON.stringify(user_post_data),
        };

        let response;
        try {
            response = await fetch(`${CONFIG.API_URL}/api/user`, options);
        } catch (error: unknown) {
            const errorLog = `ERROR: registering [${email}] at [${Date.now()}]`;
            console.error(errorLog, JSON.stringify(error));
            return fail(500, { error: errorLog, fail: true });
        }

        if (response.status == 403) {
            console.error(
                `ERROR: API not accessible or no API TOKEN not valid`
            );
            return fail(500, { fail: true });
        }

        if (response.status == 409) {
            const errorResponse = (await response.json()) as { detail: string };
            console.error(
                `ERROR: user already exists  [${email}, ${username}] at [${Date.now()}] with status code [409]`
            );
            return fail(500, {
                error: errorResponse.detail,
                userAlreadyExists: true,
            });
        }

        if (response.status == 500 || response.status == 422) {
            console.error(
                `ERROR: register user with [${email}, ${username}] at [${Date.now()}] with status code [${response.status}]`
            );
            return fail(500, { fail: true });
        }

        return { success: true, firstname, lastname, username, email };
    },
};
