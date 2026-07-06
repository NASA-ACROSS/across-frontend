import { CONFIG } from '$config/config';
import { PUBLIC_CONFIG } from '$config/config.public';
import { ssm } from '$lib/utils/aws/ssm';

const LOCAL_DEV_HMAC_KEY = 'altcha-local-dev-hmac-key-do-not-use-in-production';

/** Loads and caches the ALTCHA HMAC secret (SSM-backed, like `WebserverCredentialsManager`). */
class AltchaSecretManager {
    private key?: string;

    public async initialize(): Promise<void> {
        if (this.key) return;

        if (CONFIG.ALTCHA_HMAC_KEY) {
            this.key = CONFIG.ALTCHA_HMAC_KEY;
            return;
        }

        // No SSM access locally or at build time.
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

        // Sync fallback for when `initialize()` hasn't run (e.g. build-time module analysis).
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
