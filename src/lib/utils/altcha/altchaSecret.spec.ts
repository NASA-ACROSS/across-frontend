import { beforeEach, describe, it, expect, vi } from 'vitest';

const { PUBLIC_CONFIG, CONFIG, ssm } = vi.hoisted(() => ({
    PUBLIC_CONFIG: { IS_EXPLICITLY_LOCAL: false },
    CONFIG: { ALTCHA_HMAC_KEY: '', IS_BUILD: false, APP_ENV: 'across-plat-ue2-dev', ALTCHA_HMAC_KEY_PATH: 'frontend/altcha/hmac_key' },
    ssm: { getParameter: vi.fn() },
}));

vi.mock('$config/config.public', () => ({ PUBLIC_CONFIG }));
vi.mock('$config/config', () => ({ CONFIG }));
vi.mock('$lib/utils/aws/ssm', () => ({ ssm }));

/** Fresh manager per test, since it caches the key. */
async function loadManager() {
    vi.resetModules();
    return (await import('./altchaSecret')).altchaSecretManager;
}

describe('altchaSecretManager', () => {
    beforeEach(() => {
        PUBLIC_CONFIG.IS_EXPLICITLY_LOCAL = false;
        CONFIG.ALTCHA_HMAC_KEY = '';
        CONFIG.IS_BUILD = false;
        ssm.getParameter.mockReset().mockResolvedValue({ Value: 'ssm-key' });
    });

    it('reads the key from SSM unless explicitly local', async () => {
        const manager = await loadManager();
        await manager.initialize();

        expect(ssm.getParameter).toHaveBeenCalledWith('/across-plat-ue2-dev/frontend/altcha/hmac_key');
        expect(manager.getKey()).toBe('ssm-key');
    });

    it('does not fall back to the dev key unless explicitly local', async () => {
        const manager = await loadManager();

        expect(() => manager.getKey()).toThrow('has not been initialized');
    });

    it('uses the dev key without SSM when explicitly local', async () => {
        PUBLIC_CONFIG.IS_EXPLICITLY_LOCAL = true;
        const manager = await loadManager();
        await manager.initialize();

        expect(ssm.getParameter).not.toHaveBeenCalled();
        expect(manager.getKey()).toContain('local-dev');
    });

    it('prefers an explicit ALTCHA_HMAC_KEY', async () => {
        PUBLIC_CONFIG.IS_EXPLICITLY_LOCAL = true;
        CONFIG.ALTCHA_HMAC_KEY = 'explicit-key';
        const manager = await loadManager();
        await manager.initialize();

        expect(manager.getKey()).toBe('explicit-key');
    });
});
