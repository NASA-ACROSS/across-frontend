import type { RequestEvent } from '@sveltejs/kit';

export function clearAuth(event: RequestEvent): void {
    // Clear auth cookies
    event.cookies.delete('user-login', { path: '/' });
    event.cookies.delete('user-session', { path: '/' });

    // Clear auth state
    event.locals.user = undefined;
    event.locals.tokens = undefined;
}
