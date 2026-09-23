import type { Group } from '$lib/types/User/Group';
import { callApi } from '../across/callApi';

export const getGroupData = async (fetch: typeof globalThis.fetch, groupId: string): Promise<Group> => {
    const { data } = await callApi<Group>(fetch, `/group/${groupId}`, {
        method: 'GET',
    });

    return data;
};
