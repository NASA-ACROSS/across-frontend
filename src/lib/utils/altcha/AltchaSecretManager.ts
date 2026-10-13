import { CONFIG } from '$config/config';
import { PUBLIC_CONFIG } from '$config/config.public';
import { ssm } from '$lib/utils/aws/ssm';
import { building } from '$app/environment';

const LOCAL_HMAC_KEY = 'altcha-local-dev-hmac-key-do-not-use-in-production';

/** Loads and caches the ALTCHA HMAC secret (SSM-backed, like `WebserverCredentialsManager`). */
class AltchaSecretManager {
    private key?: string;

    public async initialize(): Promise<void> {
        if (this.key) return;
        this.key = this.getEnvKey() ?? (await this.getSsmKey());
    }

    public getKey(): string {
        // Sync fallback for when `initialize()` hasn't run (e.g. build-time module analysis).
        this.key ??= this.getEnvKey();
        if (!this.key) throw new Error('AltchaSecretManager has not been initialized. Call initialize() before getKey().');
        return this.key;
    }

    /** The configured key, else the dev key when local or building; undefined means SSM. */
    private getEnvKey(): string | undefined {
        if (building || PUBLIC_CONFIG.IS_LOCAL || CONFIG.ACROSS_TEST_ACCESS_TOKEN) return LOCAL_HMAC_KEY;
        return undefined;
    }

    /** Refuses short or known values (e.g. the infra's seeded placeholder), since a guessable key makes the captcha forgeable. */
    private async getSsmKey(): Promise<string> {
        const name = `/${CONFIG.APP_ENV}/${CONFIG.ALTCHA_HMAC_KEY_PATH}`;
        const { Value } = await ssm.getParameter(name);
        if (Value.length < 32 || Value === LOCAL_HMAC_KEY) {
            throw new Error(`ALTCHA HMAC key at ${name} is a placeholder or too short; set a random value of 32+ characters.`);
        }
        return Value;
    }
}

const altchaSecretManager = new AltchaSecretManager();

export { altchaSecretManager };
