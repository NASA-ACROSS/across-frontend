/**
 * public configuration environment variables are needed at build time
 *
 * PUBLIC_BUILD_VERSION=local-dev npm run build
 */
import { PUBLIC_BUILD_VERSION } from '$env/static/public';

type PublicConfig = {
    BUILD_VERSION: string;
    DOCUMENTATION_URL: string;
};

/**
 * Config abstraction for static build-time public environment variables
 *
 * Usage:
 * import { PUBLIC_CONFIG } from '$config/config.public';
 * const apiUrl = PUBLIC_CONFIG.BUILD_VERSION; // "v0.0.1"
 */
export const PUBLIC_CONFIG: PublicConfig = {
    BUILD_VERSION: PUBLIC_BUILD_VERSION,
    DOCUMENTATION_URL: 'https://science.data.nasa.gov/data-sites/across',
};
