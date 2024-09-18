import type { UserGroupRole } from './UserGroupRole';

export type UserGroup = {
    id: number;
    name: string;
    short_name: string;
    is_admin: boolean;
    roles: UserGroupRole[];
};
