import { fail, type ActionFailure, type RequestEvent } from '@sveltejs/kit';
import type { AltchaResult } from 'altcha-lib/frameworks/sveltekit';
import type { FormSubmitResult } from '$lib/types/form/FormSubmitResult';
import { altcha } from './altcha';
import logger from '$lib/logger';
import HTTP_CODES from '$lib/utils/HttpCodes';

// Nonce -> expiry (ms) of accepted challenges, per instance. Only verified payloads get in, so junk can't evict entries.
const usedNonces = new Map<string, number>();

/** Verifies the ALTCHA payload cookie. Doesn't read the request body, so it can run before `request.formData()`. */
export async function verifyCaptcha(event: RequestEvent, route: string): Promise<ActionFailure<FormSubmitResult> | null> {
    const { error, payload } = await altcha.verifyEvent(event);
    const reason = error ?? consumeNonce(payload);
    if (!reason) return null;

    const errorId = crypto.randomUUID();
    logger.error({
        msg: `ALTCHA verification failed at ${route}`,
        reason,
        errorId,
        ip: event.getClientAddress(),
    });
    return fail(400, {
        type: 'error',
        message: 'Could not verify that you are human. Please reload the page and try again.',
        errorId,
        code: HTTP_CODES[400],
    });
}

/** Marks a verified challenge as used; returns why the payload is rejected, or null. */
function consumeNonce(payload: AltchaResult['payload']): string | null {
    // Same type check as the library: only proof-of-work challenges are issued here, never server signatures.
    if (!payload || 'verificationData' in payload) return 'Unexpected ALTCHA payload type.';

    const now = Date.now();
    for (const [usedNonce, expiry] of usedNonces) if (expiry <= now) usedNonces.delete(usedNonce);

    const { nonce, expiresAt = Infinity } = payload.challenge.parameters;
    // The library checked expiry on an earlier clock read (allowing now == expiry), so the sweep may have just freed this nonce.
    if (expiresAt * 1000 <= now) return 'ALTCHA payload has expired.';
    if (usedNonces.has(nonce)) return 'ALTCHA payload has already been used.';
    usedNonces.set(nonce, expiresAt * 1000);
    return null;
}
