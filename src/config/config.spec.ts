import { describe, it, expect, vi } from 'vitest';
import { PrivateConfiguration } from './config';
import type { PUBLIC_CONFIG } from './config.public';

vi.mock('$env/dynamic/private', () => ({
    env: {
        ACROSS_SERVER_PORT: 8000,
    },
}));

describe('PrivateConfiguration', () => {
    describe('ACROSS_SERVER_DOCS_URL', () => {
        it('should return the localhost url for the docs when the env is local', () => {
            const config = new PrivateConfiguration({ IS_LOCAL: true } as typeof PUBLIC_CONFIG);
            expect(config.ACROSS_SERVER_DOCS_URL).toContain('localhost');
        });

        it('should return the production url when the env is prod', () => {
            const config = new PrivateConfiguration({ IS_PROD: true } as typeof PUBLIC_CONFIG);
            expect(config.ACROSS_SERVER_DOCS_URL).toContain('api.across.sciencecloud.nasa.gov');
        });

        it.each(['feat1', 'dev', 'staging'])('should return the deployed url when the env is not local or prod', (env) => {
            const config = new PrivateConfiguration({ RUNTIME_ENV: env } as typeof PUBLIC_CONFIG);
            expect(config.ACROSS_SERVER_DOCS_URL).toContain(`api.${env}.across.sciencecloud.nasa.gov`);
        });
    });
    describe('ACROSS_SERVER_URL', () => {
        it('should add the port when it exists', () => {
            const config = new PrivateConfiguration({} as typeof PUBLIC_CONFIG);
            expect(config.ACROSS_SERVER_URL).toContain(':8000');
        });
    });
});
