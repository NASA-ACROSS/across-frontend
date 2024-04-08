import { env } from '$env/dynamic/private'

type Config = {
    API_URL: string;
}

/**
 * Config abstraction for environment variables
 * 
 * Usage:
 * import { CONFIG } from '$config/config';
 * const apiUrl = CONFIG.API_URL; // "http://127.0.0.1:8000"
 */
export const CONFIG: Config = {
    API_URL: env.API_URL || "",
}
