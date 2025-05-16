import type { Handle, HandleServerError } from '@sveltejs/kit';
import { handleLogout } from '$lib/handles/handleLogout';
import { handleLogin } from '$lib/handles/handleLogin';
import { handleRedirect } from '$lib/handles/handleRedirect';
import { getErrorMessage } from '$lib/utils/error/getErrorMessage';
import { getErrorStack } from '$lib/utils/error/getErrorStack';
import { getErrorCause } from '$lib/utils/error/getErrorCause';
/**
 * Runs on every request including link hover prefetch
 * unless explicitly disabled using <a data-sveltekit-preload-data="false"/>
 */
export const handle: Handle = async ({ event, resolve }) => {
    event = handleLogout(event);
    event = await handleLogin(event);
    let response: Response = await resolve(event);
    response = handleRedirect(response);
    return response;
};

export const handleError: HandleServerError = ({ error, event, message }) => {
    const errorId = crypto.randomUUID();

    const errorMessage = getErrorMessage(error);
    const errorStack = getErrorStack(error);

    // undefined for some errors, present for others
    const errorCause = getErrorCause(error);

    const errorLog = {
        errorId,
        errorUrl: event?.url?.href,
        clientAddress: event?.getClientAddress(),
        errorMessage,
        errorStack,
        errorCause,
    };

    console.error(
        `[ERROR] Unhandled exception in ${event?.url?.toString()}`,
        errorLog
    );

    return {
        message,
        errorId,
    };
};
