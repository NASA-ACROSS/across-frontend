import type { RequestEvent } from '@sveltejs/kit';
import type { SessionCookie, UserCredentialsCookie } from '$lib/types/User/UserCredentialsCookie';
import { decryptCookie } from './decryptCookie';
import { clearAuth } from './clearAuth';

export async function hydrateAuthUser(event: RequestEvent) {
    // clear defaults every request
    event.locals.user = undefined;
    event.locals.tokens = undefined;

    try {
        const [session, user] = await Promise.all([
            decryptCookie<SessionCookie>(event.cookies, 'user-session'),
            decryptCookie<UserCredentialsCookie>(event.cookies, 'user-login'),
        ]);

        if (session) event.locals.tokens = session;
        if (user) event.locals.user = user;
    } catch (e) {
        console.error('[ERROR] hydrateAuth failed', e);
        clearAuth(event);
    }

    return event;
}
