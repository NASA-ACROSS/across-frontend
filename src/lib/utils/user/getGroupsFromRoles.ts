import type { GroupRole } from '$lib/types/User/GroupRole';
import type { UserGroup } from '$lib/types/User/UserGroup';

export const getGroupsFromRoles = (groupRoles: GroupRole[]) => {
    return groupRoles.reduce((userGroups, groupRole) => {
        const existingGroup = userGroups.find((group) => {
            return group.id === groupRole.group.id;
        });

        if (existingGroup) {
            if (existingGroup.roles == undefined) {
                existingGroup.roles = [];
            }
            existingGroup.roles.push(groupRole);
        } else {
            const newGroup = structuredClone(groupRole.group) as UserGroup;
            newGroup.roles = [groupRole];
            userGroups.push(newGroup);
        }
        return userGroups;
    }, [] as UserGroup[]);
};
