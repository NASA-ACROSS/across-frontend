import type { UserInvite } from './UserInvite';
import type { UserGroup } from './UserGroup';

export type User = {
    id: string;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    api_token: string;
    rememberMe: boolean;
    message: string;
    received_invites: UserInvite[];
    user_groups: UserGroup[];
};
