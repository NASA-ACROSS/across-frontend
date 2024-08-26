export type UserGroup = {
    id: number;
    name: string;
    short_name: string;
    is_admin: boolean;
    roles: UserGroupRoles[];
};

export type UserInvite = {
    id: number;
    name: string;
    group_id: number;
};

type UserGroupRoles = {
    id: number;
    name: string;
    user_group_id: number;
};

export type User = {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    api_token: string;
    rememberMe: boolean;
    message: string;
    received_invites: UserInvite[];
    user_groups: UserGroup[];
};
