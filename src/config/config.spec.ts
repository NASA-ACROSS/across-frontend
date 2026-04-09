import { describe, it, expect } from 'vitest';
import { PrivateConfiguration } from './config';
import type { PUBLIC_CONFIG } from './config.public';

describe('PrivateConfiguration', () => {
    describe('ACROSS_SERVER_DOMAIN', () => {
        it('should return the localhost url for the docs when the env is local', () => {
            const config = new PrivateConfiguration({ IS_LOCAL: true } as typeof PUBLIC_CONFIG);
            expect(config.ACROSS_SERVER_DOMAIN).toContain('localhost');
        });

        it('should return the deployed url when the env is not local', () => {
            const config = new PrivateConfiguration({ RUNTIME_ENV: 'dev' } as typeof PUBLIC_CONFIG);
            expect(config.ACROSS_SERVER_DOMAIN).toContain('server.dev.across.smce.nasa.gov');
        });
    });
    describe('ACROSS_SERVER_DOCS_URL', () => {
        it('should return the localhost url for the docs when the env is local', () => {
            const config = new PrivateConfiguration({ IS_LOCAL: true } as typeof PUBLIC_CONFIG);
            expect(config.ACROSS_SERVER_DOCS_URL).toContain('localhost');
        });

        it('should return the deployed url when the env is not local', () => {
            const config = new PrivateConfiguration({ RUNTIME_ENV: 'dev' } as typeof PUBLIC_CONFIG);
            expect(config.ACROSS_SERVER_DOCS_URL).toContain('server.dev.across.smce.nasa.gov');
        });
    });
});
