import type { User } from '$lib/types/User/User';
import type { UserGroup } from '$lib/types/User/UserGroup';
import type { GroupRole } from '$lib/types/User/GroupRole';

/**
 * Returns True if the `user` object contains a `group_role` that belongs to the `group`
 *
 * @param user object from server GET /user/{user_id}
 * @param group object from server GET /group/{group_id}
 * @returns
 */
export const isAdmin = (user: User, group: UserGroup): boolean => {
    const adminPermissionName = 'group:user:write';

    // find group.roles which contain adminPermissionName
    const adminRoles = group.roles.reduce((roles: GroupRole[], role: GroupRole) => {
        if (role.permissions.find((permission) => permission.name == adminPermissionName)) {
            roles.push(role);
        }
        return roles;
    }, [] as GroupRole[]);

    // user has at least one adminRole
    const foundUserAdminRole = user?.group_roles?.find((user_group_role) => adminRoles.find((adminRole) => adminRole.id === user_group_role.id));
    return foundUserAdminRole ? true : false;
};
