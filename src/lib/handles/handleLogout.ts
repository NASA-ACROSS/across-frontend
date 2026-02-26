import { PUBLIC_CONFIG } from '$config/config.public';
import type { UserCredentialsCookie } from '$lib/types/User/UserCredentialsCookie';
import type { RequestEvent } from '@sveltejs/kit';

// update user state before any client load functions run
export function handleLogout(
    event: RequestEvent & {
        locals: { user: UserCredentialsCookie | undefined };
    }
) {
    // when visiting logout or running in production
    if (event.url.pathname === '/user/logout' || !PUBLIC_CONFIG.isLocal()) {
        // remove cookie and local state
        event.cookies.delete('user-login', { path: '/' });
        event.locals.user = undefined;
    }

    return event;
}
