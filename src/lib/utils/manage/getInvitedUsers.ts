import type { GroupInvite } from '$lib/types/User/GroupInvite';
import { callApi } from '../across/callApi';

export const getInvitedUsers = async (fetch: typeof globalThis.fetch, groupId: string) => {
    const { data } = await callApi<GroupInvite[]>(fetch, `/group/${groupId}/invite`, {
        method: 'GET',
    });

    return data;
};
