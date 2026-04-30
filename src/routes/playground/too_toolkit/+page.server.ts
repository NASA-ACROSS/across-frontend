import { CONFIG } from '../../../config/config';
import type { RequestEvent } from './$types';
import { resolveObject } from '$lib/utils/across/resolveObject';

export async function load({ url, fetch }: RequestEvent) {
    const instrument_id = 'testid';
    const apiUrl = `${CONFIG.API_URL}/tools/too_request/${instrument_id}`;
    const res = await fetch(apiUrl);
    const schema = await res.json();

    return schema;
}

export const actions = { resolveObject };
