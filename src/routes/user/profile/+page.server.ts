import { redirect } from '@sveltejs/kit';
import { base } from '$app/paths';
import { loggedIn } from '$lib/stores/login'

export function load({ cookies }) {
    const user = cookies.get('user-login');

    if (!user) {
        loggedIn.set(false);
        throw redirect(303, `${base}/user/login`);
    }

    return { user: JSON.parse(user) };
}

export const actions = {
    updateUserInformation: async (event: any) => {
        return event;
    },
}; 