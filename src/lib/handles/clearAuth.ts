import { PUBLIC_CONFIG } from '$config/config.public';
import type { RequestEvent } from '@sveltejs/kit';

export function clearAuth(event: RequestEvent): void {
    // Clear auth cookies
    event.cookies.delete(PUBLIC_CONFIG.USER_INFO_COOKIE_NAME, { path: '/' });
    event.cookies.delete(PUBLIC_CONFIG.USER_TOKENS_COOKIE_NAME, { path: '/' });

    // Clear auth state
    event.locals.user = undefined;
    event.locals.tokens = undefined;
}
