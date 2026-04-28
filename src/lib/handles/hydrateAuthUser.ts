import type { RequestEvent } from '@sveltejs/kit';
import type { TokensCookie, UserCredentialsCookie } from '$lib/types/User/UserCredentialsCookie';
import { decryptCookie } from './decryptCookie';
import { clearAuth } from './clearAuth';
import { PUBLIC_CONFIG } from '$config/config.public';

export async function hydrateAuthUser(event: RequestEvent) {
    // clear defaults every request
    event.locals.user = undefined;
    event.locals.tokens = undefined;

    try {
        const [tokens, user] = await Promise.all([
            decryptCookie<TokensCookie>(event.cookies, PUBLIC_CONFIG.USER_TOKENS_COOKIE_NAME),
            decryptCookie<UserCredentialsCookie>(event.cookies, PUBLIC_CONFIG.USER_INFO_COOKIE_NAME),
        ]);

        if (tokens) event.locals.tokens = tokens;
        if (user) event.locals.user = user;
    } catch (e) {
        console.error('[ERROR] hydrateAuth failed', e);
        clearAuth(event);
    }

    return event;
}
