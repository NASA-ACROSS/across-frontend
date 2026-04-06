/**
 * public configuration environment variables are needed at build time
 *
 * PUBLIC_BUILD_VERSION=local npm run build
 */
import { PUBLIC_BUILD_VERSION } from '$env/static/public';
import { env } from '$env/dynamic/public';

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

    public RUNTIME_ENV: string = env.PUBLIC_RUNTIME_ENV || 'local';

    public IS_LOCAL: boolean = this.RUNTIME_ENV === 'local';

    public USER_TOKENS_COOKIE_NAME: string = 'user-tokens';
    public USER_INFO_COOKIE_NAME: string = 'user-info';
}

export const PUBLIC_CONFIG = new PublicConfiguration();
