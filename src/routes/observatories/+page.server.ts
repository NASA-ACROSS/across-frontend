import type { Observatory } from '$lib/types/across/Observatory';
import type { UserCredentialsCookie } from '$lib/types/User/UserCredentialsCookie';
import { getObservatories } from '$lib/utils/across/getObservatories';
import type { RequestEvent } from '@sveltejs/kit';

export async function load({ locals, cookies }: RequestEvent) {
    const userCookie = locals?.user as UserCredentialsCookie;
    const observatories: Observatory[] = await getObservatories(userCookie, cookies);

    return { observatories };
}
