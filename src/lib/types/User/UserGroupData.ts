import type { User } from './User';
import type { UserGroupRole } from './UserGroupRole';

export type UserGroupData = {
    id: number;
    name: string;
    short_name: string;
    users: User[];
    roles: UserGroupRole[];
    invites: [];
};
