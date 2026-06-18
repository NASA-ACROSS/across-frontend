import { resolve } from '$app/paths';
import { redirect } from '@sveltejs/kit';

export const load = () => {
    // we have no page for /user redirect to profile
    redirect(302, resolve('/user/profile'));
};
