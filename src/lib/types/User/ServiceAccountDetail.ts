import type { UserDetail } from './User';
import type { GroupRole } from './GroupRole';

export type ServiceAccountDetail = {
    id: string;
    name: string;
    description: string;
    expiration: string;
    expiration_duration: number;
    group_roles: GroupRole[];
    user: UserDetail;
};
