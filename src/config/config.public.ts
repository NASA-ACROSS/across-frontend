/**
 * public configuration environment variables are needed at build time
 *
 * PUBLIC_BUILD_VERSION=local npm run build
 */
import { PUBLIC_BUILD_VERSION, PUBLIC_RUNTIME_ENV } from '$env/static/public';

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
    public BUILD_VERSION: string = PUBLIC_BUILD_VERSION;
    public DOCUMENTATION_URL: string = 'https://science.data.nasa.gov/data-sites/across';

    // default to local for safety, this will be overridden in hooks.server.ts with the
    // value from config.ts which is private dynamic and can be set with env vars.
    // This directly relates to the env var set from the infrastructure on the service.
    public RUNTIME_ENV: string = PUBLIC_RUNTIME_ENV || 'local';

    public get IS_LOCAL(): boolean {
        return this.RUNTIME_ENV === 'local';
    }
}

export const PUBLIC_CONFIG = new PublicConfiguration();
