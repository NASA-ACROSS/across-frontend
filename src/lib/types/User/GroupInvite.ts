import type { UserDetail } from './User';
import type { GroupDetail } from './UserGroup';

export type GroupInvite = {
    id: string;
    group: GroupDetail;
    receiver: UserDetail;
    sender: UserDetail;
};
