import type { GroupUser } from './GroupUser';
import type { GroupRole } from './GroupRole';

export type GroupDetail = Pick<Group, 'id' | 'name' | 'short_name'>;

export type Group = {
    id: string;
    name: string;
    short_name: string;
    users: GroupUser[];
    roles: GroupRole[];
};
