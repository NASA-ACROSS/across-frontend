import { env } from '$env/dynamic/private';
import { PUBLIC_CONFIG } from './config.public';

/**
 * Config abstraction for dynamic environment variables
 */
export class PrivateConfiguration {
    /** Webserver <-> ACROSS Server host (will be the service-connect alias in deployed envs). */
    public ACROSS_SERVER_HOST: string = env.ACROSS_SERVER_HOST || 'localhost';
    public ACROSS_SERVER_ROOT_PATH: string = env.ACROSS_SERVER_ROOT_PATH || '';
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

    /** Returns the public facing URL to the ACROSS API Docs */
    public get ACROSS_SERVER_DOCS_URL(): string {
        if (this.publicConfig.IS_LOCAL) return `${this.ACROSS_SERVER_URL}/docs`;

        const envSubdomain = this.publicConfig.IS_PROD ? '' : `${this.publicConfig.RUNTIME_ENV}.`;
        const domain = `https://api.${envSubdomain}across.sciencecloud.nasa.gov`;

        return `${domain}${this.ACROSS_SERVER_ROOT_PATH}${this.ACROSS_SERVER_VERSION}/docs`;
    }

    /** Returns the internal URL used by the webserver to ACROSS API */
    public get ACROSS_SERVER_URL(): string {
        // Protocol will be HTTP since using service connect is within the AWS VPC.
        // The ACROSS Server is only allowing the VPC's CIDR block for direct access
        // through service connect. All other traffic is routed through the ALB
        const domain = `http://${this.ACROSS_SERVER_HOST}`;
        const port = this.ACROSS_SERVER_PORT ? `:${this.ACROSS_SERVER_PORT}` : '';
        const basePath = `${this.ACROSS_SERVER_ROOT_PATH}${this.ACROSS_SERVER_VERSION}`;

        return `${domain}${port}${basePath}`;
    }
}

export const CONFIG = new PrivateConfiguration(PUBLIC_CONFIG);
