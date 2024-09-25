export type UserGroup = {
    id: number;
    name: string;
    short_name: string;
    is_admin: boolean;
    roles: UserGroupRoles[];
};

type UserGroupRoles = {
    id: number;
    name: string;
    user_group_id: number;
};
