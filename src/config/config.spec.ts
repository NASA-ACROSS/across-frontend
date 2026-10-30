import { describe, it, expect, vi } from 'vitest';
import { PrivateConfiguration } from './config';

const fakeEnv = vi.hoisted(() => ({
    ACROSS_SERVER_HOST: 'http://mockserver-host',
    ACROSS_SERVER_PORT: '8000',
    ACROSS_SERVER_DOCS_HOST: 'https://public-facing-host',
    ACROSS_SERVER_ROOT_PATH: '/across/api',
    ACROSS_SERVER_VERSION: '/v1',
}));

vi.mock(import('$app/env/private'), async (importOriginal) => {
    const actual = await importOriginal();
    return Object.assign(fakeEnv, {
        ...actual,
        ...fakeEnv,
    });
});

describe('PrivateConfiguration', () => {
    describe('ACROSS_SERVER_DOCS_URL', () => {
        it.beforeEach(() => {
            fakeEnv.ACROSS_SERVER_DOCS_HOST = 'https://public-facing-host';
        });
        it('should return the localhost url for the docs when the env is local', () => {
            const config = new PrivateConfiguration();
            expect(config.ACROSS_SERVER_DOCS_URL).toContain('public-facing-host');
        });

        it('should include the https protocol when it is missing from the host', () => {
            fakeEnv.ACROSS_SERVER_DOCS_HOST = 'public-facing-host';
            const config = new PrivateConfiguration();
            expect(config.ACROSS_SERVER_DOCS_URL).toContain('https');
        });

        it('should build the expected url for public facing docs', () => {
            const config = new PrivateConfiguration();
            expect(config.ACROSS_SERVER_DOCS_URL).toBe('https://public-facing-host/across/api/v1/docs');
        });
    });

    describe('ACROSS_SERVER_URL', () => {
        it.beforeEach(() => {
            fakeEnv.ACROSS_SERVER_HOST = 'http://mockserver-host';
            fakeEnv.ACROSS_SERVER_PORT = '8000';
        });
        it('should add the port when the server is not local', () => {
            const config = new PrivateConfiguration();
            expect(config.ACROSS_SERVER_URL).toContain(':8000');
        });
        it('should add the protocol when it is missing from the host', () => {
            fakeEnv.ACROSS_SERVER_HOST = 'no-protocol-host';
            const config = new PrivateConfiguration();
            expect(config.ACROSS_SERVER_URL).toMatch(/^http:\/\//);
        });

        it('should use the ACROSS_SERVER_HOST env var as the domain', () => {
            const config = new PrivateConfiguration();
            expect(config.ACROSS_SERVER_URL).toContain(`http://mockserver-host`);
        });
    });
});
