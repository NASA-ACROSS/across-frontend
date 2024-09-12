import type { UserGroupRoles } from './UserGroupRoles';

export type UserGroupAdminUser = {
    id: number;
    full_name: string;
    username: string;
    is_admin: boolean;
    roles: UserGroupRoles[];
};
