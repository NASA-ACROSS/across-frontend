import type { Handle, HandleServerError } from '@sveltejs/kit';
import { handleLogout } from '$lib/handles/handleLogout';
import { handleLogin } from '$lib/handles/handleLogin';
/**
 * Runs on every request including link hover prefetch
 * unless explicitly disabled using <a data-sveltekit-preload-data="false"/>
 */
export const handle: Handle = async ({ event, resolve }) => {
    event = handleLogout(event);
    event = await handleLogin(event);
    return await resolve(event);
};

export const handleError: HandleServerError = ({
    error,
    event,
    status,
    message,
}) => {
    const errorId = crypto.randomUUID();

    const errorLog = {
        errorId,
        errorUrl: event.url.href,
        clientAddress: event.getClientAddress(),
        stackTrace: error?.stack,
        cause: error?.cause, // undefined for some errors, present for others
    };

    console.error(`[ERROR] Unhandled exception in ${event.url}`, errorLog);

    return {
        message,
        errorId,
    };
};
