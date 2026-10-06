import { afterEach, describe, it, expect, vi } from 'vitest';

vi.mock('$lib/logger', () => ({
    default: { error: vi.fn(), warn: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

import type { RequestEvent } from '@sveltejs/kit';
import { createChallenge, solveChallenge } from 'altcha-lib';
import { deriveHmacKeySecret, type AltchaResult } from 'altcha-lib/frameworks/sveltekit';
import { deriveKey } from 'altcha-lib/algorithms/pbkdf2';
import { verifyCaptcha } from './verifyCaptcha';
import { altcha, CHALLENGE_TTL_MS } from './altcha';
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
async function forgeValidPayload(expiresAt = new Date(Date.now() + 60_000)): Promise<string> {
    const secret = altchaSecretManager.getKey();
    const challenge = await createChallenge({
        algorithm: 'PBKDF2/SHA-256',
        cost: 10,
        counter: 3,
        deriveKey,
        hmacSignatureSecret: secret,
        hmacKeySignatureSecret: await deriveHmacKeySecret(secret),
        expiresAt,
    });
    const solution = await solveChallenge({ challenge, deriveKey });
    if (!solution) throw new Error('Failed to solve the test challenge');
    return btoa(JSON.stringify({ challenge, solution }));
}

afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
});

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

    it('issues challenges that expire after CHALLENGE_TTL_MS', async () => {
        const { parameters } = (await (await altcha.challengeHandler()).json()) as { parameters: { expiresAt: number } };

        expect(Math.abs(parameters.expiresAt * 1000 - (Date.now() + CHALLENGE_TTL_MS))).toBeLessThan(5_000);
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
        const result = await verifyCaptcha(makeEvent('not-a-valid-payload'), '/login');

        expect(result).not.toBeNull();
        expect(result?.status).toBe(400);
    });

    it('passes (returns null) for a validly solved challenge', async () => {
        const payload = await forgeValidPayload();

        const result = await verifyCaptcha(makeEvent(payload), '/register');

        expect(result).toBeNull();
    });

    it('rejects a replayed payload', async () => {
        const payload = await forgeValidPayload();

        expect(await verifyCaptcha(makeEvent(payload), '/register')).toBeNull();
        expect((await verifyCaptcha(makeEvent(payload), '/register'))?.status).toBe(400);
    });

    it('keeps rejecting a replay after a flood of unsigned junk payloads', async () => {
        const payload = await forgeValidPayload();
        expect(await verifyCaptcha(makeEvent(payload), '/register')).toBeNull();

        for (let i = 0; i < 1_000; i++) {
            const junk = btoa(JSON.stringify({ challenge: { parameters: { nonce: `junk-${i}` } }, solution: {} }));
            expect((await verifyCaptcha(makeEvent(junk), '/register'))?.status).toBe(400);
        }

        expect((await verifyCaptcha(makeEvent(payload), '/register'))?.status).toBe(400);
    });

    it('rejects an expired payload', async () => {
        const payload = await forgeValidPayload(new Date(Date.now() - 1_000));

        expect((await verifyCaptcha(makeEvent(payload), '/register'))?.status).toBe(400);
    });

    it('rejects a replay at the instant the challenge expires', async () => {
        // Whole seconds, since challenges store expiresAt in seconds.
        vi.useFakeTimers({ toFake: ['Date'] });
        vi.setSystemTime(new Date('2030-01-01T00:00:00Z'));
        const payload = await forgeValidPayload();
        expect(await verifyCaptcha(makeEvent(payload), '/register')).toBeNull();

        vi.setSystemTime(new Date('2030-01-01T00:01:00Z'));
        expect((await verifyCaptcha(makeEvent(payload), '/register'))?.status).toBe(400);
    });

    it.each([
        ['a server-signature payload', { verificationData: 'verified=true', verified: true }],
        [
            'a server-signature payload with a challenge attached',
            { verificationData: 'verified=true', verified: true, challenge: { parameters: { nonce: 'n' } } },
        ],
    ])('rejects %s, since only proof-of-work challenges are issued', async (_, payload) => {
        vi.spyOn(altcha, 'verifyEvent').mockResolvedValueOnce({
            error: null,
            payload: payload as unknown as AltchaResult['payload'],
            verification: null,
        });

        expect((await verifyCaptcha(makeEvent('server-signature'), '/register'))?.status).toBe(400);
    });
});
