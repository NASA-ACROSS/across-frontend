import type { UserCredentialsCookie } from '$lib/types/User/UserCredentialsCookie';
import type { NameResolver } from '$lib/types/across/NameResolver';
import { UserCredentials } from '$lib/types/User/UserCredentials';
import { CONFIG } from '../../../config/config';
import { fail, type Cookies, type RequestEvent } from '@sveltejs/kit';

/**
 * Fetch resolved coordinates for an object name from the ACROSS API.
 *
 * @param userCookie - Auth cookie for the current user session.
 * @param cookies - SvelteKit cookies helper (for token retrieval).
 * @param targetName - Object name to resolve (e.g. "Crab", "M31").
 * @returns The resolved object data containing ra, dec, and resolver information.
 */

export const getResolve = async (userCookie: UserCredentialsCookie, cookies: Cookies, targetName: string): Promise<NameResolver> => {
    let accessToken;
    if (userCookie) {
        const userCredentials = new UserCredentials(userCookie);
        accessToken = await userCredentials.getAccessToken(cookies);
    }

    const options: RequestInit = {
        method: 'GET',
    };

    let headers = {};
    if (accessToken) {
        headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        options.headers = headers;
    }

    const url = new URL(`${CONFIG.API_URL}/tools/resolve-object/`);
    const params = {
        object_name: targetName,
    };
    url.search = new URLSearchParams(params).toString();

    let response;
    try {
        response = await fetch(url, options);
    } catch (e) {
        console.error(`ERROR: catch resolving object at [${Date.now()}]`, JSON.stringify(e));
        throw new Error('Unexpected Error while resolving object');
    }

    // catch known errors from api and hide error from user
    const errorCodes = [500, 404, 401];
    if (errorCodes.includes(response.status)) {
        console.error(`ERROR: resolving object at [${Date.now()}] with status code [${response.status}]`);
    }

    // Handle rate limiting
    if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        const waitTime = retryAfter ? parseInt(retryAfter, 10) : 60;
        console.warn(`API rate limited. Retry after ${waitTime} seconds`);
        throw new Error(`Rate limited. Please try again in ${waitTime} seconds.`);
    }

    // Return result as NameResolver
    return (await response.json()) as NameResolver;
};

/**
 * SvelteKit action helper that resolves a target name using `getResolve`.
 *
 * @param request - SvelteKit action request.
 * @param locals - SvelteKit locals (for user session data).
 * @param cookies - SvelteKit cookies helper.
 */
export const resolveTarget = async ({ request, locals, cookies }: RequestEvent) => {
    const targetName = (await request.formData()).get('targetName') as string;

    if (!targetName?.trim()) {
        return fail(400, { error: 'Target name is required' });
    }

    try {
        const userCookie = locals?.user as UserCredentialsCookie;
        const data = await getResolve(userCookie, cookies, targetName);
        return { success: true, data };
    } catch (error) {
        console.error('Error resolving target name:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to resolve target coordinates. Please try again.';
        const statusCode = errorMessage.includes('Rate limited') ? 429 : 500;
        return fail(statusCode, { error: errorMessage });
    }
};
