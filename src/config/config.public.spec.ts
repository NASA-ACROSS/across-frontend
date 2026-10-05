import { beforeEach, describe, it, expect, vi } from 'vitest';

const fakeEnv = vi.hoisted(() => ({ PUBLIC_RUNTIME_ENV: undefined as string | undefined }));

vi.mock('$env/dynamic/public', () => ({ env: fakeEnv }));

/** PUBLIC_CONFIG reads env when the module loads, so re-import it per test. */
async function loadConfig() {
    vi.resetModules();
    return (await import('./config.public')).PUBLIC_CONFIG;
}

describe('PublicConfiguration', () => {
    beforeEach(() => {
        fakeEnv.PUBLIC_RUNTIME_ENV = undefined;
    });

    it('defaults IS_LOCAL to true but keeps IS_EXPLICITLY_LOCAL false when PUBLIC_RUNTIME_ENV is unset', async () => {
        const config = await loadConfig();

        expect(config.IS_LOCAL).toBe(true);
        expect(config.IS_EXPLICITLY_LOCAL).toBe(false);
    });

    it.each([
        ['local', true],
        ['dev', false],
        ['prod', false],
    ])('sets IS_EXPLICITLY_LOCAL for PUBLIC_RUNTIME_ENV=%s to %s', async (runtimeEnv, expected) => {
        fakeEnv.PUBLIC_RUNTIME_ENV = runtimeEnv;
        const config = await loadConfig();

        expect(config.IS_EXPLICITLY_LOCAL).toBe(expected);
    });
});
