import { CONFIG } from '$config/config';
import { PUBLIC_CONFIG } from '$config/config.public';
import { ssm } from '$lib/utils/aws/ssm';

const LOCAL_DEV_HMAC_KEY = 'altcha-local-dev-hmac-key-do-not-use-in-production';

/** Loads and caches the ALTCHA HMAC secret (SSM-backed, like `WebserverCredentialsManager`). */
class AltchaSecretManager {
    private key?: string;

    public async initialize(): Promise<void> {
        if (this.key) return;
        this.key = this.getEnvKey() ?? (await ssm.getParameter(`/${CONFIG.APP_ENV}/${CONFIG.ALTCHA_HMAC_KEY_PATH}`)).Value;
    }

    public getKey(): string {
        // Sync fallback for when `initialize()` hasn't run (e.g. build-time module analysis).
        this.key ??= this.getEnvKey();
        if (!this.key) throw new Error('AltchaSecretManager has not been initialized. Call initialize() before getKey().');
        return this.key;
    }

    /** The configured key, else the dev key when local or building; undefined means SSM. */
    private getEnvKey(): string | undefined {
        if (CONFIG.ALTCHA_HMAC_KEY) return CONFIG.ALTCHA_HMAC_KEY;
        if (CONFIG.IS_BUILD || PUBLIC_CONFIG.IS_LOCAL) return LOCAL_DEV_HMAC_KEY;
        return undefined;
    }
}

const altchaSecretManager = new AltchaSecretManager();

export { altchaSecretManager };
