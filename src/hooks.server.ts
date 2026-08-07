import type { Handle, HandleFetch, HandleServerError, ServerInit } from '@sveltejs/kit';
import { handleLogout } from '$lib/handles/handleLogout';
import { handleRedirect } from '$lib/handles/handleRedirect';
import { getErrorCause } from '$lib/utils/error/getErrorCause';
import { CONFIG } from '$config/config';
import { webserverCredentialsManager } from '$lib/utils/across/auth/WebserverCredentialsManager';
import { UserCredentialsManager } from '$lib/utils/across/auth/UserCredentialsManager';
import { hydrateAuthUser } from '$lib/handles/hydrateAuthUser';
import logger, { setLogLevel } from '$lib/logger';
import { PUBLIC_CONFIG } from '$config/config.public';

export const init: ServerInit = async () => {
    setLogLevel(PUBLIC_CONFIG.RUNTIME_ENV);
    await webserverCredentialsManager.initialize();
};

/**
 * Runs on every request including link hover prefetch
 * unless explicitly disabled using <a data-sveltekit-preload-data="false"/>
 */
export const handle: Handle = async ({ event, resolve }) => {
    event = handleLogout(event);

    // hydrate auth user into locals on page loads when the cookies are present.
    await hydrateAuthUser(event);

    let response: Response = await resolve(event);

    response = handleRedirect(response);

    return response;
};

export const handleFetch: HandleFetch = async ({ event, request, fetch }): Promise<Response> => {
    // Add an authorization header to internal API calls
    if (request.url.startsWith(CONFIG.ACROSS_SERVER_URL)) {
        // set external client ip for core-server to parse for rate-limiting
        const ip = event.getClientAddress();
        request.headers.set('x-real-ip', ip);

        // test-only: forward MockServer's namespace header so Playwright tests can scope
        // expectations to a single test (via MockServer's built-in multi-tenancy feature)
        // without colliding with other tests running in parallel against the same instance.
        // No-op outside test environments since ACROSS_TEST_ACCESS_TOKEN is never set otherwise.
        if (CONFIG.ACROSS_TEST_ACCESS_TOKEN) {
            const namespace = event.request.headers.get('x-mockserver-namespace');
            if (namespace) request.headers.set('x-mockserver-namespace', namespace);
        }

        if (request.url.endsWith('/auth/token') || request.url.endsWith('/auth/refresh')) {
            // pass-thru to prevent infinite loops of token refreshing
            return fetch(request);
        }

        // hydrate auth locals from the cookies on every fetch to the API
        await hydrateAuthUser(event);

        const tokens = event.locals.tokens;
        let access_token: string | undefined;

        // check if the request is from the client or server and use the appropriate strategy
        if (tokens) {
            // client will have the token in the cookie
            access_token = await UserCredentialsManager.GetAccessToken(fetch, event.cookies, tokens);
        } else {
            // this is for server-side requests that need to authenticate with the API, such as login and registering
            access_token = await webserverCredentialsManager.getAccessToken(fetch);
        }

        if (access_token) {
            request.headers.set('Authorization', `Bearer ${access_token}`);
        }
    }

    logger.info({ msg: 'Request Initiated', url: request.url, method: request.method, clientIP: event.getClientAddress() });

    // when no access_token, run the request without it anyways to avoid full page 500 (usually this means the core server is down)
    return fetch(request);
};

export const handleError: HandleServerError = ({ error, event, message, status }) => {
    const errorId = crypto.randomUUID();

    // undefined for some errors, present for others
    const errorCause = getErrorCause(error);

    logger.error(
        {
            err: error,
            errorCause,
            errorId,
            url: event?.url?.href,
            clientIP: event?.getClientAddress(),
            status,
        },
        message
    );

    return {
        message,
        errorId,
        code: 'UNKNOWN_ERROR',
    };
};
