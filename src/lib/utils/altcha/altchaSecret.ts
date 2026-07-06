import { CONFIG } from '$config/config';
import { PUBLIC_CONFIG } from '$config/config.public';
import { ssm } from '$lib/utils/aws/ssm';

// Static HMAC key used only for local development and build/test
const LOCAL_DEV_HMAC_KEY = 'altcha-local-dev-hmac-key-do-not-use-in-production';

/**
 * Loads and caches the ALTCHA HMAC secret used to sign and verify proof-of-work
 * challenges. Mirrors the SSM-backed credential pattern used by the
 * {@link WebserverCredentialsManager}.
 */
class AltchaSecretManager {
    private key?: string;

    public async initialize(): Promise<void> {
        if (this.key) return;

        // Prefer an explicitly provided key (local/test) over a remote lookup.
        if (CONFIG.ALTCHA_HMAC_KEY) {
            this.key = CONFIG.ALTCHA_HMAC_KEY;
            return;
        }

        // Local and build/test contexts have no access to SSM.
        if (CONFIG.IS_BUILD || PUBLIC_CONFIG.IS_LOCAL) {
            this.key = LOCAL_DEV_HMAC_KEY;
            return;
        }

        const name = `/${CONFIG.APP_ENV}/${CONFIG.ALTCHA_HMAC_KEY_PATH}`;
        const { Value } = await ssm.getParameter(name);
        this.key = Value;
    }

    public getKey(): string {
        if (this.key) return this.key;

        // Defensive synchronous fallback for build/local contexts where
        // `initialize()` may not have run (e.g. module analysis at build time).
        if (CONFIG.ALTCHA_HMAC_KEY) {
            this.key = CONFIG.ALTCHA_HMAC_KEY;
            return this.key;
        }

        if (CONFIG.IS_BUILD || PUBLIC_CONFIG.IS_LOCAL) {
            this.key = LOCAL_DEV_HMAC_KEY;
            return this.key;
        }

        throw new Error('AltchaSecretManager has not been initialized. Call initialize() before getKey().');
    }
}

const altchaSecretManager = new AltchaSecretManager();

export { altchaSecretManager };
