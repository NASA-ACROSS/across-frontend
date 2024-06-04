export type UserRequestedRole = {
    id: number;
    name: string;
    status: string;
    status_reason: string;
    request_reason: string;
};

export type UserRequestRoles = {
    approved_roles: string[];
    requested_roles: UserRequestedRole[];
    requestable_roles: string[];
};
