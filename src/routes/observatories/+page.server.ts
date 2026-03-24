import type { Observatory } from '$lib/types/across/Observatory';
import { getObservatories } from '$lib/utils/across/getObservatories';
import type { RequestEvent } from '@sveltejs/kit';

export async function load({ fetch }: RequestEvent) {
    const observatories: Observatory[] = await getObservatories(fetch);

    return { observatories };
}
