import type { GroupRole } from '$lib/types/User/GroupRole';
import type { UserGroup } from '$lib/types/User/UserGroup';

export const getGroupsFromRoles = (groupRoles: GroupRole[]) => {
    return Object.values(
        groupRoles.reduce(
            (groups, groupRole: GroupRole) => {
                const existingGroup = groups[groupRole.group.id];

                if (existingGroup) {
                    if (existingGroup.roles === undefined) {
                        existingGroup.roles = [];
                    }
                    existingGroup.roles.push(groupRole);
                } else {
                    const newGroup = structuredClone(groupRole.group) as UserGroup;
                    newGroup.roles = [groupRole];
                    groups[groupRole.group.id] = newGroup;
                }
                return groups;
            },
            {} as Record<string, UserGroup>
        )
    );
};
