import type { GroupRole } from './GroupRole';

export type UserGroup = {
    id: string;
    name: string;
    short_name: string;
    roles: GroupRole[];
};
