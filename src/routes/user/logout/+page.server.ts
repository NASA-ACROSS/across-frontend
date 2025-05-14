import type { RequestEvent } from './$types';

export function load({ locals, cookies }: RequestEvent) {
    cookies.delete('user-login', {
        path: '/',
    });
    locals.user = undefined;
}
