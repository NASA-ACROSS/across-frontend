/**
 * public configuration environment variables are needed at build time
 *
 * PUBLIC_BUILD_VERSION=local npm run build
 */
import { PUBLIC_BUILD_VERSION } from '$env/static/public';
import { env } from '$env/dynamic/public';
import { type Level } from 'pino';

export type RuntimeEnv = 'local' | 'feat1' | 'dev' | 'staging' | 'prod';

export type RuntimeEnv = 'local' | 'feat1' | 'dev' | 'stag' | 'prod';

/**
 * Config abstraction for static build-time public environment variables
 *
 * Usage:
 *
 * import { PUBLIC_CONFIG } from '$config/config.public';
 *
 * // only do something locally in development
 *
 * if(PUBLIC_CONFIG.IS_LOCAL) { ... }
 */
class PublicConfiguration {
    public BUILD_VERSION: string = PUBLIC_BUILD_VERSION || '';
    public DOCUMENTATION_URL: string = 'https://science.data.nasa.gov/data-sites/across';

    public RUNTIME_ENV: RuntimeEnv = (env.PUBLIC_RUNTIME_ENV as RuntimeEnv) || 'local';

    public IS_LOCAL: boolean = this.RUNTIME_ENV === 'local';
    public IS_PROD: boolean = this.RUNTIME_ENV === 'prod';

    public USER_TOKENS_COOKIE_NAME: string = 'user-tokens';
    public USER_INFO_COOKIE_NAME: string = 'user-info';

    public DEFAULT_LOG_LEVEL: Level = (env.PUBLIC_DEFAULT_LOG_LEVEL as Level) || 'debug';
}

export const PUBLIC_CONFIG = new PublicConfiguration();
