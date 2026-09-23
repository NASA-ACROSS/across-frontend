import type { Permission } from './Permission';
import type { ServiceAccountDetail } from './ServiceAccountDetail';
import type { UserDetail } from './User';
import type { GroupDetail } from './Group';

export type GroupRole = {
    id: string;
    name: string;
    permissions: Permission[];
    group: GroupDetail;
    users?: UserDetail[];
    service_accounts?: ServiceAccountDetail[];
};
