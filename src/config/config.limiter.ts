import { LOGIN_IPUA_LIMIT, LOGIN_IPUA_LIMIT_EVERY, LOGIN_IP_LIMIT, LOGIN_IP_LIMIT_EVERY } from '$app/env/private';
import type { RateUnit } from 'sveltekit-rate-limiter/server';

export class LimiterConfiguration {
    /**
     * The maximum number of login requests allowed per IP + User Agent
     * @default 5
     */
    public LOGIN_IPUA_LIMIT = parseInt(LOGIN_IPUA_LIMIT || '5');
    /**
     * The time window in minutes for the IP + User Agent rate limiter
     * @default 15
     */
    public LOGIN_IPUA_LIMIT_EVERY: RateUnit = (LOGIN_IPUA_LIMIT_EVERY as RateUnit) || '15m';

    /**
     * The maximum number of login requests allowed per IP address
     * Triple the limit of IPUA to ensure multiple users from the same IP don't become limited
     * @default 15
     */
    public LOGIN_IP_LIMIT = parseInt(LOGIN_IP_LIMIT || '15');
    /**
     * The time window for the IP address rate limiter
     * @default '15m'
     */
    public LOGIN_IP_LIMIT_EVERY: RateUnit = (LOGIN_IP_LIMIT_EVERY as RateUnit) || '15m';
}

export const CONFIG = new LimiterConfiguration();
