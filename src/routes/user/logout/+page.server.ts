import { loggedIn } from '$lib/stores/login.js';

export function load({ locals, cookies }) {
    cookies.delete('user-login', {
        path: '/',
    });
    locals.user = undefined;
}