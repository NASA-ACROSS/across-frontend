type RequestedRoles = {
    id: number;
    name: string;
    status: string;
    status_reason: string;
    request_reason: string;
};

export type UserRequestRoles = {
    approved_roles: string[];
    requested_roles: RequestedRoles[];
    requestable_roles: string[];
};
