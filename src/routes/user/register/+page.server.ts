import { CONFIG } from '../../../config/config.js';
import { fail } from '@sveltejs/kit'
import { RetryAfterRateLimiter } from 'sveltekit-rate-limiter/server';

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
    default: async (event: any) => {
        const { request } = event;
        const data = await request.formData();

        const firstname = data.get('firstname') as string;
        const lastname = data.get('lastname') as string;
        const username = data.get('username') as string;
        const email = data.get('email') as string;

        const user_post_data = {
            firstname,
            lastname,
            username,
            email,
            roles: "user"
        }

        // Rate limit user login-verify
        // Every call to isLimited counts as a hit towards the rate limit for the event.
        const rateStatus = await limiter.check(event);
        if (rateStatus.limited){
            console.error(`ERROR: rate-limiting at /register for email [${email}] at time [${Date.now()}] with IP [${event.getClientAddress()}] with retryAfter [${rateStatus.retryAfter}] seconds.`, user_post_data)
            return fail(429, { rateLimit: true, retryAfter: rateStatus.retryAfter });
        } 

        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Bearer ${CONFIG.API_TOKEN}`
            },
            body: new URLSearchParams(user_post_data)
        }

        let response;
        try {
            response = await fetch(`${CONFIG.API_URL}/api/v1/across/user/`, options)
        } catch (error: any) {
            console.error(`ERROR: logging in registering [${email}] at [${Date.now()}]`, JSON.stringify(error))
            return fail(500, { error: error.message, fail: true });
        }

        if (response.status == 403) {
            console.error(`ERROR: API not accessible or no API TOKEN not valid`)
            return fail(500, { fail: true });
        }

        if (response.status == 409) {
            const errorResponse = await response.json();
            console.error(`ERROR: user already exists  [${email}, ${username}] at [${Date.now()}] with status code [409]`)
            return fail(500, { error: errorResponse.detail, userAlreadyExists: true });
        }

        if (response.status == 500) {
            console.error(`ERROR: register user with [${email}, ${username}] at [${Date.now()}] with status code [500]`)
            return fail(500, { fail: true });
        }

        return { success: true, firstname, lastname, username, email}
    }
}