import logger from '$lib/logger';
import type { Group } from '$lib/types/User/Group';

export const getGroupData = async (groupId: string, fetch: typeof globalThis.fetch): Promise<Group> => {
    const response = await fetch(`/api/group/${groupId}`, {
        method: 'GET',
    });

    if (!response.ok) {
        logger.error({ msg: `Failed to get group data.`, status: response.status, groupId });
        throw new Error('Unexpected Error while fetching group data');
    }

    const group = (await response.json()) as Group;

    return group;
};
