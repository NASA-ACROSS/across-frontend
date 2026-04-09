import { env } from '$env/dynamic/private';
import { PUBLIC_CONFIG } from './config.public';

/**
 * Config abstraction for dynamic environment variables
 *
 * Usage:
 * import { CONFIG } from '$config/config';
 * const apiUrl = CONFIG.ACROSS_SERVER_URL; // "http://127.0.0.1:8000"
 */
export class PrivateConfiguration {
    /**
     * Webserver <-> ACROSS Server host. This is not used for user-facing browser domains.
     * For browser facing domains use `ACROSS_SERVER_DOMAIN`
     */
    public ACROSS_SERVER_HOST: string = env.ACROSS_SERVER_HOST || 'http://localhost';
    public ACROSS_SERVER_ROOT_PATH: string = env.ACROSS_SERVER_ROOT_PATH || '/api';
    public ACROSS_SERVER_VERSION: string = env.ACROSS_SERVER_VERSION || '/v1';
    public ACROSS_SERVER_PORT: string = env.ACROSS_SERVER_PORT || '8000';

    public APP_ENV: string = env.APP_ENV || 'across-plat-lcl-local';

    public ACROSS_SERVER_ID_PATH: string = env.ACROSS_SERVER_ID_PATH || 'frontend/core-server/client_id';
    public ACROSS_SERVER_SECRET_PATH: string = env.ACROSS_SERVER_SECRET_PATH || 'frontend/core-server/client_secret';

    public ACROSS_SERVER_ID: string = env.ACROSS_SERVER_ID || '';
    public ACROSS_SERVER_SECRET: string = env.ACROSS_SERVER_SECRET || '';

    /** Only used in test environment */
    public ACROSS_TEST_ACCESS_TOKEN: string = env.ACROSS_TEST_ACCESS_TOKEN || '';

    public AWS_REGION: string = env.AWS_REGION || 'us-east-2';
    public AWS_PROFILE?: string = env.AWS_PROFILE;

    /**  build will always be `deploy` when running the `npm run build` command.
     * `BUILD_ENV` is also hardcoded in CICD pipelines to `deploy` when building and running CI checks.
     */
    public IS_BUILD: boolean = env.BUILD_ENV === 'deploy';

    constructor(private publicConfig: typeof PUBLIC_CONFIG) {}

    public get ACROSS_SERVER_URL(): string {
        const path = `${this.ACROSS_SERVER_ROOT_PATH}${this.ACROSS_SERVER_VERSION}`;

        return `${this.ACROSS_SERVER_DOMAIN}${path}`;
    }

    /** ACROSS server domain that is accessible from the browser */
    public get ACROSS_SERVER_DOMAIN(): string {
        if (this.publicConfig.IS_LOCAL) return `http://localhost:${this.ACROSS_SERVER_PORT}`;

        return `https://server.${this.publicConfig.RUNTIME_ENV}.across.smce.nasa.gov`;
    }

    public get ACROSS_SERVER_DOCS_URL(): string {
        return `${this.ACROSS_SERVER_DOMAIN}${this.ACROSS_SERVER_ROOT_PATH}${this.ACROSS_SERVER_VERSION}/docs`;
    }
}

export const CONFIG = new PrivateConfiguration(PUBLIC_CONFIG);
