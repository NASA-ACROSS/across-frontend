import type { UserDetail } from './User';

export type UserInvite = {
    id: number;
    group: InviteGroupDetail;
    sender: UserDetail;
};

type InviteGroupDetail = {
    id: string;
    name: string;
    short_name: string;
    created_on: string;
};
