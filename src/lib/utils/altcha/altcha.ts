import { create, deriveHmacKeySecret, randomInt } from 'altcha-lib/frameworks/sveltekit';
import { deriveKey } from 'altcha-lib/algorithms/pbkdf2';
import { altchaSecretManager } from '$lib/utils/altcha/altchaSecret';

const HMAC_SECRET = altchaSecretManager.getKey();

export const CHALLENGE_TTL_MS = 10 * 60 * 1000;

/** Self-hosted ALTCHA instance. The solved payload travels in a cookie, so verifying never consumes the form body. */
export const altcha = create({
    hmacSignatureSecret: HMAC_SECRET,
    hmacKeySignatureSecret: await deriveHmacKeySecret(HMAC_SECRET),
    createChallengeParameters: () => ({
        algorithm: 'PBKDF2/SHA-256',
        cost: 5_000,
        // The widget searches from 0, so a lower bound would only slow down real users.
        counter: randomInt(10_000),
        expiresAt: new Date(Date.now() + CHALLENGE_TTL_MS),
    }),
    deriveKey,
    setCookie: { name: 'altcha', path: '/' },
    // No `store`: the library records ids before checking signatures, so verifyCaptcha tracks replays instead.
});
