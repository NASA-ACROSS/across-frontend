import type { RequestEvent } from './$types';
import { getTelescopes } from '$lib/utils/across/getTelescopes';
import type { UserCredentialsCookie } from '$lib/types/User/UserCredentialsCookie';
import type { Telescope } from '$lib/types/across/Telescope';

export async function load({ locals, cookies }: RequestEvent) {
    const userCookie = locals?.user as UserCredentialsCookie;
    const telescopes: Telescope[] = await getTelescopes(userCookie, cookies);

    // Respond with user data
    return { telescopes };
}
