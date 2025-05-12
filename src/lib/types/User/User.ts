import type { UserInvite } from './UserInvite';
import type { UserGroup } from './UserGroup';
import type { UserGroupRole } from './UserGroupRole';

export type User = {
    id: string;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    rememberMe: boolean;
    message: string;
    received_invites: UserInvite[];
    groups: UserGroup[];
    group_roles: UserGroupRole[];
};

export type UserDetail = Pick<
    User,
    'id' | 'first_name' | 'last_name' | 'username' | 'email'
>;