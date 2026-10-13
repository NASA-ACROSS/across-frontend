import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';

import type { RequestEvent } from '@sveltejs/kit';
import { verifyCaptcha } from './verifyCaptcha';
import altcha from './altcha';

vi.mock('$lib/logger', () => ({
    default: { error: vi.fn(), warn: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

/** Minimal RequestEvent: the `altcha` cookie (read, then deleted) and a client IP for the log. */
function makeEvent(cookieValue?: string): RequestEvent {
    return {
        cookies: {
            get: (name: string) => (name === 'altcha' ? cookieValue : undefined),
            delete: () => {},
        },
        getClientAddress: () => '127.0.0.1',
    } as unknown as RequestEvent;
}

afterEach(() => {
    vi.restoreAllMocks();
});

describe('verifyCaptcha', () => {
    const verifyEventResult = (result: Record<string, unknown>) => result as unknown as Awaited<ReturnType<typeof altcha.verifyEvent>>;

    describe('altcha.verifyEvent returns an error', () => {
        beforeEach(() => {
            vi.spyOn(altcha, 'verifyEvent').mockResolvedValue(
                verifyEventResult({ error: new Error('Invalid challenge'), payload: null, verification: null })
            );
        });

        it('should return a 400 status', async () => {
            const result = await verifyCaptcha(makeEvent('invalid-payload'), '/register');

            expect(result?.status).toBe(400);
        });
    });
});
