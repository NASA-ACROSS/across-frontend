import type { Permission } from './Permission';
import type { ServiceAccountDetail } from './ServiceAccountDetail';
import type { UserDetail } from './User';

export type UserGroupRole = {
    id: number;
    name: string;
    permissions: Permission[];
    users: UserDetail[];
    service_accounts: ServiceAccountDetail[];
};
