import type { Group } from '$lib/types/User/Group';

export const getGroupData = async (userGroupId: string, fetch: typeof globalThis.fetch): Promise<Group> => {
    const response = await fetch(`/api/group/${userGroupId}`, {
        method: 'GET',
    });

    if (!response.ok) {
        console.error(`ERROR: getting user group data at with status code [${response.status}]`);
        throw new Error('Unexpected Error while fetching user group data');
    }

    const group = (await response.json()) as Group;

    return group;
};
