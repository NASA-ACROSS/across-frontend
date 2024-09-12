import type { UserGroupRoles } from './UserGroupRoles';
import type { UserGroupAdminUser } from './UserGroupAdminUser';

export type UserGroupAdminData = {
    id: number;
    name: string;
    short_name: string;
    users: UserGroupAdminUser[];
    roles: UserGroupRoles[];
    invites: [];
};
