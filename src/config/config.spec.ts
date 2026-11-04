import { describe, it, expect, vi } from 'vitest';
import { PrivateConfiguration } from './config';
import { beforeEach } from 'node:test';

const fakeEnv = vi.hoisted(() => ({
    ACROSS_SERVER_HOST: 'http://localhost',
    ACROSS_SERVER_PORT: 8000,
    ACROSS_SERVER_DOCS_HOST: 'https://public-facing-host',
    ACROSS_SERVER_ROOT_PATH: '/across/api',
    ACROSS_SERVER_VERSION: '/v1',
}));

vi.mock('$env/dynamic/private', () => ({
    env: fakeEnv,
}));

describe('PrivateConfiguration', () => {
    beforeEach(() => {
        fakeEnv.ACROSS_SERVER_HOST = 'http://localhost';
        fakeEnv.ACROSS_SERVER_PORT = 8000;
        fakeEnv.ACROSS_SERVER_DOCS_HOST = 'https://public-facing-host';
    });

    describe('ACROSS_SERVER_DOCS_URL', () => {
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
        it('should add the port when it exists', () => {
            const config = new PrivateConfiguration();
            expect(config.ACROSS_SERVER_URL).toContain(':8000');
        });
        it('should add the protocol when it is missing from the host', () => {
            fakeEnv.ACROSS_SERVER_HOST = 'core-server';
            const config = new PrivateConfiguration();
            expect(config.ACROSS_SERVER_URL).toMatch(/^http:\/\//);
        });
    });
});
