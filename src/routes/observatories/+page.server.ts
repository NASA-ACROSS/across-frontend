import type { Observatory } from '#lib/types/across/Observatory.js';
import { getObservatories } from '#lib/utils/across/getObservatories.js';
import type { RequestEvent } from '@sveltejs/kit';

export async function load({ fetch }: RequestEvent) {
    const observatories: Observatory[] = await getObservatories(fetch);

    return { observatories };
}
