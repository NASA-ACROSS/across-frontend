import { fail, type ActionFailure, type RequestEvent } from '@sveltejs/kit';
import type { FormSubmitResult } from '$lib/types/form/FormSubmitResult';
import { altcha } from './altcha';
import logger from '$lib/logger';
import HTTP_CODES from '$lib/utils/HttpCodes';

/** Verifies the ALTCHA payload cookie. Doesn't read the request body, so it can run before `request.formData()`. */
export async function verifyCaptcha(event: RequestEvent, route: string): Promise<ActionFailure<FormSubmitResult> | null> {
    const captcha = await altcha.verifyEvent(event);
    if (captcha.error) {
        const errorId = crypto.randomUUID();
        logger.error({
            msg: `ALTCHA verification failed at ${route}`,
            reason: captcha.error,
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
    return null;
}
