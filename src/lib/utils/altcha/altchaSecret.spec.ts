import { beforeEach, describe, it, expect, vi } from 'vitest';

const { PUBLIC_CONFIG, CONFIG, ssm, environment } = vi.hoisted(() => ({
    PUBLIC_CONFIG: { IS_LOCAL: false },
    CONFIG: { APP_ENV: 'across-plat-ue2-dev', ALTCHA_HMAC_KEY_PATH: 'frontend/altcha/hmac_key' },
    ssm: { getParameter: vi.fn() },
    environment: { building: false },
}));

vi.mock('$app/environment', () => environment);
vi.mock('$config/config.public', () => ({ PUBLIC_CONFIG }));
vi.mock('$config/config', () => ({ CONFIG }));
vi.mock('$lib/utils/aws/ssm', () => ({ ssm }));

const SSM_KEY = 'nH3vQ8sT1xK6pZ2wR9yL4mB7cD0fG5jA';

/** Fresh manager per test, since it caches the key. */
async function loadManager() {
    vi.resetModules();
    return (await import('./AltchaSecretManager')).altchaSecretManager;
}

describe('altchaSecretManager', () => {
    beforeEach(() => {
        PUBLIC_CONFIG.IS_LOCAL = false;
        environment.building = false;
        ssm.getParameter.mockReset().mockResolvedValue({ Value: SSM_KEY });
    });

    it('reads the key from SSM when not local', async () => {
        const manager = await loadManager();
        await manager.initialize();

        expect(ssm.getParameter).toHaveBeenCalledWith('/across-plat-ue2-dev/frontend/altcha/hmac_key');
        expect(manager.getKey()).toBe(SSM_KEY);
    });

    it.each(['placeholder-hmac-key', 'altcha-local-dev-hmac-key-do-not-use-in-production'])(
        'refuses a guessable SSM key (%s)',
        async (value) => {
            ssm.getParameter.mockResolvedValue({ Value: value });
            const manager = await loadManager();

            await expect(manager.initialize()).rejects.toThrow('placeholder or too short');
        }
    );

    it('does not fall back to the dev key when not local', async () => {
        const manager = await loadManager();

        expect(() => manager.getKey()).toThrow('has not been initialized');
    });

    it('uses the dev key without SSM when local', async () => {
        PUBLIC_CONFIG.IS_LOCAL = true;
        const manager = await loadManager();
        await manager.initialize();

        expect(ssm.getParameter).not.toHaveBeenCalled();
        expect(manager.getKey()).toContain('local-dev');
    });
});
