import { loggedIn } from '$lib/stores/login.js';
import type { RequestEvent } from './$types';

// client side load function which resets local store state boolean
export function load(event: RequestEvent) {
    if (event?.url.pathname == '/user/logout') loggedIn.set(false);
}
