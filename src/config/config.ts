import { env } from '$env/dynamic/private';

type Config = {
    API_URL: string;
    API_DOCS_URL: string;
    API_TOKEN: string;
    PAGINATION_BUTTONS: number;
};

/**
 * Config abstraction for dynamic environment variables
 *
 * Usage:
 * import { CONFIG } from '$config/config';
 * const apiUrl = CONFIG.API_URL; // "http://127.0.0.1:8000"
 */
export const CONFIG: Config = {
    API_URL: env.API_URL || 'https://server.prod.across.smce.nasa.gov/api/v1',
    API_DOCS_URL: env.API_URL + '/docs',
    API_TOKEN: env.ACROSS_API_TOKEN || 'WEBSERVER_SECRET_KEY',
    PAGINATION_BUTTONS: Number(env.PUBLIC_PAGINATION_BUTTONS) || 4,
};
