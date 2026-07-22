import logger from '$lib/logger';
import type { AcrossApiErrorResponseBody } from '$lib/types/error/AcrossApiErrorResponseBody';
import { error } from '@sveltejs/kit';
import HTTP_CODES from '../HttpCodes';

/**
 * Get an error body from the response which can be
 * from the ACROSS API (has detail) or an App.Error
 */
const getAppError = async (status: number, response: Response): Promise<App.Error> => {
    const appError: App.Error = {
        message: 'Unknown API error',
        code: HTTP_CODES[status] || HTTP_CODES[0],
        errorId: crypto.randomUUID(), // Temporary placeholder, will be updated later
    };

    let body: AcrossApiErrorResponseBody;
    try {
        body = (await response.json()) as AcrossApiErrorResponseBody;

        if (body.errorId) appError.errorId = body.errorId;

        if (body.detail) {
            // It may be possible that detail is an object with more info,
            // but for now we will assume it's a string
            appError.message = body.detail;
        } else {
            logger.warn({ body }, 'API error response does not contain expected fields. Using fallback message.');
        }
    } catch (err) {
        logger.debug({ err, msg: 'Failed to parse API error response as JSON. Using response text as message.' });
        appError.message = await response.text();
    }

    return appError;
};

export const callApi = async <T>(fetch: typeof window.fetch, url: string, options: RequestInit): Promise<T> => {
    const response = await fetch(url, options);

    if (!response.ok) {
        const errorBody = await getAppError(response.status, response);
        return error(response.status, errorBody);
    }

    return (await response.json()) as T;
};
