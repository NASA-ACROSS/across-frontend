import { env } from '$env/dynamic/private';

/**
 * Config abstraction for dynamic environment variables
 *
 * Usage:
 * import { CONFIG } from '$config/config';
 * const apiUrl = CONFIG.API_URL; // "http://127.0.0.1:8000"
 */
class Configuration {
    public API_URL: string = env.API_URL || 'https://server.prod.across.smce.nasa.gov/api/v1';
    public API_DOCS_URL: string = `${this.API_URL}/docs`;

    public APP_ENV: string = env.APP_ENV || 'across-plat-lcl-local';

    public ACROSS_SERVER_ID_PATH: string = env.ACROSS_SERVER_ID_PATH || 'frontend/core-server/client_id';
    public ACROSS_SERVER_SECRET_PATH: string = env.ACROSS_SERVER_SECRET_PATH || 'frontend/core-server/client_secret';

    public ACROSS_SERVER_ID: string = env.ACROSS_SERVER_ID || '';
    public ACROSS_SERVER_SECRET: string = env.ACROSS_SERVER_SECRET || '';

    /** Only used in test environment */
    public ACROSS_TEST_ACCESS_TOKEN: string = env.ACROSS_TEST_ACCESS_TOKEN || '';

    public AWS_REGION: string = env.AWS_REGION || 'us-east-2';
    public AWS_PROFILE?: string = env.AWS_PROFILE;

    // build will always be `deploy` when running the `npm run build` command.
    // BUILD_ENV is also hardcoded in CICD pipelines to `deploy` when building and running CI checks.
    public IS_BUILD: boolean = env.BUILD_ENV === 'deploy';
}

export const CONFIG = new Configuration();
