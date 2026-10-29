import { env } from '$env/dynamic/private';
import { PUBLIC_CONFIG } from './config.public';

/**
 * Config abstraction for dynamic environment variables
 */
export class PrivateConfiguration {
    /**
     * Webserver <-> ACROSS Server host
     *
     * Locally, the the server is behind the local nginx proxy.
     * Deployed envs will use the service-connect alias for the ACROSS server.
     */
    public ACROSS_SERVER_HOST: string = env.ACROSS_SERVER_HOST || 'localhost/across/api';
    public ACROSS_SERVER_ROOT_PATH: string = env.ACROSS_SERVER_ROOT_PATH || '/across/api';
    public ACROSS_SERVER_VERSION: string = env.ACROSS_SERVER_VERSION || '/v1';
    public ACROSS_SERVER_PORT: string = env.ACROSS_SERVER_PORT || '8000';
    public ACROSS_SERVER_DOCS_HOST: string = env.ACROSS_SERVER_DOCS_HOST || 'http://localhost';

    public APP_ENV: string = env.APP_ENV || 'across-plat-lcl-local';

    public ACROSS_SERVER_ID_PATH: string = env.ACROSS_SERVER_ID_PATH || 'frontend/core-server/client_id';
    public ACROSS_SERVER_SECRET_PATH: string = env.ACROSS_SERVER_SECRET_PATH || 'frontend/core-server/client_secret';

    public ACROSS_SERVER_ID: string = env.ACROSS_SERVER_ID || '';
    public ACROSS_SERVER_SECRET: string = env.ACROSS_SERVER_SECRET || '';

    /** Only used in test environment */
    public ACROSS_TEST_ACCESS_TOKEN: string = env.ACROSS_TEST_ACCESS_TOKEN || '';
    /** Only used in playwright integration testing */
    public MOCKSERVER_NAMESPACE_HEADER: string = env.MOCKSERVER_NAMESPACE_HEADER || 'X-Mockserver-Namespace';

    public AWS_REGION: string = env.AWS_REGION || 'us-east-2';
    public AWS_PROFILE?: string = env.AWS_PROFILE;

    constructor() {}

    /** Returns the public facing URL to the ACROSS API Docs */
    public get ACROSS_SERVER_DOCS_URL(): string {
        const url = `${this.ACROSS_SERVER_DOCS_HOST}${this.ACROSS_SERVER_ROOT_PATH}${this.ACROSS_SERVER_VERSION}/docs`;

        if (!url.startsWith('http')) return `https://${url}`;
        return url;
    }

    /** Returns the internal URL used by the webserver to ACROSS API */
    public get ACROSS_SERVER_URL(): string {
        let domain = `${this.ACROSS_SERVER_HOST}`;

        // deployed environments requires specifying the port
        // explicitly for service connect.
        if (!PUBLIC_CONFIG.IS_LOCAL) {
            domain += `:${this.ACROSS_SERVER_PORT}`;
        }

        const url = `${domain}${this.ACROSS_SERVER_VERSION}`;

        // Protocol will be HTTP since using service connect is within the AWS VPC.
        // The ACROSS Server is only allowing the VPC's CIDR block for direct access
        // through service connect. All other traffic is routed through the ALB
        if (!url.startsWith('http')) return `http://${url}`;
        return url;
    }
}

export const CONFIG = new PrivateConfiguration();
