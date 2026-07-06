import { create, deriveHmacKeySecret, randomInt, CappedMap } from 'altcha-lib/frameworks/sveltekit';
import { deriveKey } from 'altcha-lib/algorithms/pbkdf2';
import { altchaSecretManager } from '$lib/utils/altcha/altchaSecret';

const HMAC_SECRET = altchaSecretManager.getKey();

const CHALLENGE_TTL_MS = 10 * 60 * 1000;

/** Self-hosted ALTCHA instance. The solved payload travels in a cookie, so verifying never consumes the form body. */
export const altcha = create({
    hmacSignatureSecret: HMAC_SECRET,
    hmacKeySignatureSecret: await deriveHmacKeySecret(HMAC_SECRET),
    createChallengeParameters: () => ({
        algorithm: 'PBKDF2/SHA-256',
        cost: 5_000,
        counter: randomInt(5_000, 10_000),
        expiresAt: new Date(Date.now() + CHALLENGE_TTL_MS),
    }),
    deriveKey,
    setCookie: { name: 'altcha', path: '/' },
    // In-memory, per-instance replay store: a solved payload can be replayed on another instance within its TTL.
    store: new CappedMap<string, boolean>({ maxSize: 1_000 }),
});
