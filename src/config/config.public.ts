/**
 * public configuration environment variables are needed at build time
 *
 * PUBLIC_BUILD_VERSION=local npm run build
 */
import { PUBLIC_BUILD_VERSION, PUBLIC_RUNTIME_ENV, PUBLIC_DEFAULT_LOG_LEVEL, PUBLIC_PRETTY_LOGS } from '$app/env/public';

import { type Level } from 'pino';

export type RuntimeEnv = 'local' | 'feat1' | 'dev' | 'staging' | 'prod';

/**
 * Config abstraction for static build-time public environment variables
 *
 * Usage:
 *
 * import { PUBLIC_CONFIG } from '#config/config.public.js';
 *
 * // only do something locally in development
 *
 * if(PUBLIC_CONFIG.IS_LOCAL) { ... }
 */
class PublicConfiguration {
    public BUILD_VERSION: string = PUBLIC_BUILD_VERSION || '';
    public DOCUMENTATION_URL: string = 'https://science.data.nasa.gov/across/app/about';

    public RUNTIME_ENV: RuntimeEnv = (PUBLIC_RUNTIME_ENV as RuntimeEnv) || 'local';

    public IS_LOCAL: boolean = this.RUNTIME_ENV === 'local';
    // Indicates if the current environment is the development (sandbox) environment
    public IS_DEV: boolean = this.RUNTIME_ENV === 'dev';
    public IS_PROD: boolean = this.RUNTIME_ENV === 'prod';

    public USER_TOKENS_COOKIE_NAME: string = 'user-tokens';
    public USER_INFO_COOKIE_NAME: string = 'user-info';

    public DEFAULT_LOG_LEVEL: Level = (PUBLIC_DEFAULT_LOG_LEVEL as Level) || 'debug';
    public PRETTY_LOGS: number = PUBLIC_PRETTY_LOGS ? parseInt(PUBLIC_PRETTY_LOGS) : 0;

    public DEFAULT_PAGE_LIMIT: number = 100;
}

export const PUBLIC_CONFIG = new PublicConfiguration();
