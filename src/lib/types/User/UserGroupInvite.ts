import type { UserDetail } from './User';

export type UserGroupInvite = {
    id: string;
    group: GroupDetail;
    receiver: UserDetail;
    sender: UserDetail;
};
