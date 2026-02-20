import type { Telescope } from '$lib/types/across/Telescope';
import { getTelescopes } from '$lib/utils/across/getTelescopes';
import { resolveObject } from '$lib/utils/across/resolveObject';
import type { RequestEvent } from './$types';

export async function load({ locals, cookies }: RequestEvent) {
    try {
        const telescopes: Telescope[] = await getTelescopes(locals, cookies);

        return {
            telescopes,
        };
    } catch (err) {
        console.error('Error loading visibility calculator data:', err);
        return {
            telescopes: [],
            error: 'Failed to load telescope data',
        };
    }
}

export const actions = { resolveObject };
