import type { RequestEvent } from '@sveltejs/kit';
import { clearAuth } from './clearAuth';

/**
 * Update cookie state when visiting /user/logout
 * before any client load functions run
 */
export function handleLogout(event: RequestEvent) {
    if (event.url.pathname === '/user/logout') clearAuth(event);

    return event;
}
