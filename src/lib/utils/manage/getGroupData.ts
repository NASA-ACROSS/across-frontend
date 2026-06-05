import logger from '$lib/logger';
import type { Group } from '$lib/types/User/Group';

export const getGroupData = async (userGroupId: number, fetch: typeof globalThis.fetch): Promise<Group> => {
    const response = await fetch(`/api/group/${userGroupId}`, {
        method: 'GET',
    });

    if (!response.ok) {
        logger.error({ status: response.status, userGroupId }, 'Failed fetching user group data');
        throw new Error('Unexpected Error while fetching user group data');
    }

    const group = (await response.json()) as Group;

    return group;
};
