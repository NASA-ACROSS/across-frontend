import type { User } from '$lib/types/User/User';

export const getUserInfo = async (id: string, fetch: typeof globalThis.fetch) => {
    const options = {
        method: 'GET',
    };

    const response = await fetch(`/api/user/${id}`, options);

    if (!response.ok) {
        throw new Error(`[${response.status}] Failed to fetch user info: ${response.statusText}`);
    }

    const user = (await response.json()) as User;

    return user;
};
