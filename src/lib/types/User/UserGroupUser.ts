import type { UserDetail } from './User';
import type { UserGroupRole } from './UserGroupRole';

export type UserGroupUser = UserDetail & {
    group_roles: UserGroupRole[];
};
