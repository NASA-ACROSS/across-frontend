import type { User } from '#lib/types/User/User.js';
import { callApi } from '../across/callApi';

export const getUserInfo = async (fetch: typeof globalThis.fetch, id: string) => {
    const { data } = await callApi<User>(fetch, `/user/${id}`, {
        method: 'GET',
    });

    return data;
};
