import type { Permission } from './Permission';
import type { ServiceAccountDetail } from './ServiceAccountDetail';
import type { UserDetail } from './User';

export type GroupRole = {
    id: number;
    name: string;
    permissions: Permission[];
    users: UserDetail[];
    service_accounts: ServiceAccountDetail[];
};
