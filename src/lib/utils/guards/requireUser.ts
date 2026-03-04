import { redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';

export function requireUser(locals: App.Locals): NonNullable<App.Locals['user']> {
    const user = locals.user;
    if (!user) redirect(302, resolve('/user/login'));
    return user;
}
