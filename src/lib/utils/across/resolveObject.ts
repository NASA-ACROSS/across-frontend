import { CONFIG } from '../../../config/config';
import { fail, type RequestEvent } from '@sveltejs/kit';
import type { NameResolver } from '$lib/types/across/NameResolver';
import logger from '$lib/logger';

/**
 * SvelteKit action that resolves a object name to coordinates using the ACROSS API.
 *
 * @param request - SvelteKit action request.
 * @param locals - SvelteKit locals (for user session data).
 * @param cookies - SvelteKit cookies helper.
 */
export const resolveObject = async ({ request }: RequestEvent) => {
    const objectName = (await request.formData()).get('objectName') as string;

    if (!objectName?.trim()) {
        return fail(400, { error: 'Object name is required' });
    }

    try {
        // Build request options
        const options: RequestInit = {
            method: 'GET',
        };

        // Build URL with query parameters
        const url = new URL(`${CONFIG.ACROSS_SERVER_URL}/tools/resolve-object/`);
        url.searchParams.set('object_name', objectName);

        // Fetch resolved object data
        const response = await fetch(url, options);

        // Handle specific error codes
        if (response.status === 404) {
            throw new Error('Object not found. Please check the name and try again.');
        }

        if (response.status === 429) {
            const retryAfter = response.headers.get('Retry-After');
            const waitTime = retryAfter ? parseInt(retryAfter, 10) : 60;
            throw new Error(`Rate limited. Please try again in ${waitTime} seconds.`);
        }

        if (response.status === 500) {
            throw new Error('Server error while resolving object. Please try again later.');
        }

        if (!response.ok) {
            throw new Error(`Failed to resolve object. Status code: ${response.status}`);
        }

        const data = (await response.json()) as NameResolver;
        return { success: true, data };
    } catch (error) {
        logger.error({ err: error }, 'Error resolving object name');
        const errorMessage = error instanceof Error ? error.message : 'Failed to resolve object coordinates. Please try again.';
        const statusCode = errorMessage.includes('Rate limited') ? 429 : 500;
        return fail(statusCode, { error: errorMessage });
    }
};
