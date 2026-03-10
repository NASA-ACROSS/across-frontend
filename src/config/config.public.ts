/**
 * public configuration environment variables are needed at build time
 *
 * PUBLIC_BUILD_VERSION=local npm run build
 */
import { PUBLIC_BUILD_VERSION } from '$env/static/public';

type PublicConfig = {
    BUILD_VERSION: string;
    DOCUMENTATION_URL: string;
    isLocal: () => boolean;
};

/**
 * Config abstraction for static build-time public environment variables
 *
 * Usage:
 *
 * import { PUBLIC_CONFIG } from '$config/config.public';
 *
 * // only do something locally in development
 *
 * if(PUBLIC_CONFIG.isLocal()) { ... }
 */
export const PUBLIC_CONFIG: PublicConfig = {
    BUILD_VERSION: PUBLIC_BUILD_VERSION,
    DOCUMENTATION_URL: 'https://science.data.nasa.gov/data-sites/across',
    isLocal: () => PUBLIC_BUILD_VERSION === 'local',
};
