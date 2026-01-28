import type { UserCredentialsCookie } from '$lib/types/User/UserCredentialsCookie';
import { UserCredentials } from '$lib/types/User/UserCredentials';
import { CONFIG } from '../../../config/config';
import { fail, type Cookies, type RequestEvent } from '@sveltejs/kit';

/**
 * Fetch resolved coordinates for an object name from the ACROSS API.
 *
 * @param userCookie - Auth cookie for the current user session.
 * @param cookies - SvelteKit cookies helper (for token retrieval).
 * @param targetName - Object name to resolve (e.g. "Crab", "M31").
 */

export const getResolve = async (userCookie: UserCredentialsCookie, cookies: Cookies, targetName: string) => {
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

    const resolved = (await response.json()) as Record<string, unknown>;

    return resolved;
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
        return fail(500, { error: 'Failed to resolve target coordinates. Please try again.' });
    }
};
