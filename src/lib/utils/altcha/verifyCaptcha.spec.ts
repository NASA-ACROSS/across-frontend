import { describe, it, expect, vi } from 'vitest';

vi.mock('$lib/logger', () => ({
    default: { error: vi.fn(), warn: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

import type { RequestEvent } from '@sveltejs/kit';
import { createChallenge, solveChallenge } from 'altcha-lib';
import { deriveHmacKeySecret } from 'altcha-lib/frameworks/sveltekit';
import { deriveKey } from 'altcha-lib/algorithms/pbkdf2';
import { verifyCaptcha } from './verifyCaptcha';
import { altcha } from './altcha';
import { altchaSecretManager } from './altchaSecret';
import HTTP_CODES from '$lib/utils/HttpCodes';

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

/** Solves a cheap challenge signed with the app's secret and encodes it as the cookie payload. */
async function forgeValidPayload(): Promise<string> {
    const secret = altchaSecretManager.getKey();
    const challenge = await createChallenge({
        algorithm: 'PBKDF2/SHA-256',
        cost: 10,
        counter: 3,
        deriveKey,
        hmacSignatureSecret: secret,
        hmacKeySignatureSecret: await deriveHmacKeySecret(secret),
        expiresAt: new Date(Date.now() + 60_000),
    });
    const solution = await solveChallenge({ challenge, deriveKey });
    if (!solution) throw new Error('Failed to solve the test challenge');
    return btoa(JSON.stringify({ challenge, solution }));
}

describe('altcha challenge endpoint', () => {
    it('returns a signed challenge with no-store caching and cookie config', async () => {
        const res = await altcha.challengeHandler();

        expect(res.status).toBe(200);
        expect(res.headers.get('cache-control')).toBe('no-store');

        const body = (await res.json()) as {
            parameters: Record<string, unknown>;
            signature: string;
            configuration?: { setCookie?: { name?: string } };
        };
        expect(body).toHaveProperty('parameters');
        expect(body).toHaveProperty('signature');
        expect(body.configuration?.setCookie?.name).toBe('altcha');
    });
});

describe('verifyCaptcha', () => {
    it('fails with a 400 when no altcha payload cookie is present', async () => {
        const result = await verifyCaptcha(makeEvent(undefined), '/register');

        expect(result).not.toBeNull();
        expect(result?.status).toBe(400);
        expect(result?.data).toMatchObject({ type: 'error', code: HTTP_CODES[400] });
        expect(result?.data.message).toBeTruthy();
    });

    it('fails with a 400 when the altcha payload is malformed', async () => {
        const result = await verifyCaptcha(makeEvent('not-a-valid-payload'), '/login-verify');

        expect(result).not.toBeNull();
        expect(result?.status).toBe(400);
    });

    it('passes (returns null) for a validly solved challenge', async () => {
        const payload = await forgeValidPayload();

        const result = await verifyCaptcha(makeEvent(payload), '/register');

        expect(result).toBeNull();
    });
});
