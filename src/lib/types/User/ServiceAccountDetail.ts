import type { UserDetail } from './User';

export type ServiceAccountDetail = {
    id: string;
    name: string;
    description: string;
    user: UserDetail;
};
