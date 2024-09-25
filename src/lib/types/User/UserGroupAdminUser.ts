import type { UserGroupRole } from './UserGroupRole';

export type UserGroupAdminUser = {
    id: number;
    full_name: string;
    email: string;
    username: string;
    is_admin: boolean;
    roles: UserGroupRole[];
};
