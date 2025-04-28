import { PUBLIC_BUILD_VERSION } from '$env/static/public';

type PublicConfig = {
    BUILD_VERSION: string;
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
};
