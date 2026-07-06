import { create, deriveHmacKeySecret, randomInt, CappedMap } from 'altcha-lib/frameworks/sveltekit';
import { deriveKey } from 'altcha-lib/algorithms/pbkdf2';
import { altchaSecretManager } from '$lib/utils/altcha/altchaSecret';

const HMAC_SECRET = altchaSecretManager.getKey();

// Challenge lifetime before the widget must request a fresh one (10 minutes).
const CHALLENGE_TTL_MS = 10 * 60 * 1000;

/**
 * Shared, self-hosted ALTCHA instance.
 *
 * The payload is carried via a cookie (see `setCookie`), so `verifyEvent` reads
 * the cookie rather than the request body and never consumes `request.formData()`.
 */
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
    // Send the solved payload as a cookie so the form body stays untouched.
    setCookie: { name: 'altcha', path: '/' },
    // In-memory replay protection. Note: not shared across instances; a solved
    // challenge could in theory be replayed on another instance within its TTL.
    // Rate limiting on the protected routes provides an additional layer.
    store: new CappedMap<string, boolean>({ maxSize: 1_000 }),
});
