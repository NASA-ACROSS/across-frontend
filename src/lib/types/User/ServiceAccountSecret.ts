import type { ServiceAccountDetail } from './ServiceAccountDetail';

export type ServiceAccountSecret = ServiceAccountDetail & {
    secret_key: string;
};
