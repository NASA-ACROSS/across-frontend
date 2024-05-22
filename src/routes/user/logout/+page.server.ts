import { loggedIn } from '$lib/stores/login.js';

export function load({ cookies }) {
    cookies.delete('user-login', {
        path: '/'
    });
    loggedIn.set(false);
}