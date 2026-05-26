import { fail, redirect, type ActionFailure } from '@sveltejs/kit';
import { resolve } from '$app/paths';
import { CONFIG } from '../../../config/config';
import { RetryAfterRateLimiter } from 'sveltekit-rate-limiter/server';
import type { LocalUser } from '$lib/types/User/UserCredentialsCookie';
import type { User } from '$lib/types/User/User';
import type { RequestEvent } from './$types';
import type { FormSubmitResult } from '$lib/types/form/FormSubmitResult';
import { UserCredentialsManager } from '$lib/utils/across/auth/UserCredentialsManager';
import guards from '$lib/utils/guards';
import { PUBLIC_CONFIG } from '$config/config.public';
import logger from '$lib/logger';

export function load(event: RequestEvent) {
    guards.localOnlyRoute();

    const user = event.locals.user;
    // Redirect to profile page when user is logged in
    if (user) redirect(302, resolve('/user/profile'));
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
    default: async (event: RequestEvent): Promise<FormSubmitResult | ActionFailure<FormSubmitResult>> => {
        const { url, request, cookies, fetch } = event;
        const verificationToken = url.searchParams.get('token');

        // Rate limit user login-verify
        // Every call to isLimited counts as a hit towards the rate limit for the event.
        const rateStatus = await limiter.check(event);
        if (rateStatus.limited) {
            const msg = `Too many login attempts. Please try again in ${rateStatus.retryAfter} seconds.`;
            logger.error({
                msg,
                verificationToken,
                ip: event.getClientAddress(),
                retryAfter: rateStatus.retryAfter,
            });

            return fail(429, {
                type: 'error',
                message: msg,
            });
        }

        if (!verificationToken) {
            return fail(400, { type: 'error', message: 'Verification token is required' });
        }

        const data = await request.formData();
        const rememberMe = Boolean(data.get('rememberMe'));

        const userId = await UserCredentialsManager.Verify(verificationToken, cookies, rememberMe);

        if (!userId) {
            logger.error({
                msg: 'Login-verify failed to decode user id from access token',
                verificationToken,
            });
            return fail(500, { type: 'error', message: 'Failed to login user.' });
        }

        const res = await fetch(`${CONFIG.ACROSS_SERVER_URL}/user/${userId}`, { method: 'GET' });

        const user = (await res.json()) as User;

        const localUser: LocalUser = {
            id: userId,
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            email: user.email,
            message: '',
        };

        await UserCredentialsManager.SetCookie(cookies, PUBLIC_CONFIG.USER_INFO_COOKIE_NAME, localUser, rememberMe);

        redirect(302, resolve('/user/profile'));
    },
};
