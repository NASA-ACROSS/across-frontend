import type { GroupUser } from './GroupUser';
import type { GroupRole } from './GroupRole';

export type Group = {
    id: number;
    name: string;
    short_name: string;
    users: GroupUser[];
    roles: GroupRole[];
};
