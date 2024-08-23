export type UserGroupInvite = {
    user_group_id: number;
    id: number;
    receiver_id: number;
    receiver_email: string;
    sender_id: number;
    entries: UserGroupInviteEntry[];
};

export type UserGroupInviteEntry = {
    id: number;
    created_on: string;
    modified_on: string;
    receiver_id: number;
    receiver_email: string;
    sender_id: number;
    sender_name: string;
    user_group_id: number;
    user_group_name: string;
};
