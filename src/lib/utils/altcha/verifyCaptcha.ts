import { fail, type RequestEvent } from '@sveltejs/kit';
import { altcha } from './altcha';
import logger from '$lib/logger';

/**
 * Verifies the ALTCHA proof-of-work for a form submission. The payload is carried
 * via a cookie, so this does NOT consume the request body and can be called before
 * `request.formData()`.
 */
export async function verifyCaptcha(event: RequestEvent, route: string) {
    const captcha = await altcha.verifyEvent(event);
    if (captcha.error) {
        logger.error({
            msg: `ALTCHA verification failed at ${route}`,
            reason: captcha.error,
            ip: event.getClientAddress(),
        });
        return fail(400, { captchaFailed: true });
    }
    return null;
}
