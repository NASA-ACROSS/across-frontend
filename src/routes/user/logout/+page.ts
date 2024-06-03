import { loggedIn } from '$lib/stores/login.js';

// client side load function which resets local store state boolean
export function load(event) {
    if (event.url.pathname == '/user/logout') loggedIn.set(false);
}
