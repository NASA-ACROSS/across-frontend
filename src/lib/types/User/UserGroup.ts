import type { UserGroupRole } from './UserGroupRole';

export type UserGroup = {
    id: number;
    name: string;
    short_name: string;
    roles: UserGroupRole[];
};

export type GroupDetail = Pick<UserGroup, 'id' | 'name' | 'short_name'>;
