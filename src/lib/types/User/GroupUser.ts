import type { UserDetail } from './User';
import type { GroupRole } from './GroupRole';

export type GroupUser = UserDetail & {
    group_roles: GroupRole[];
};
