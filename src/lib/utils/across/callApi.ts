import type { AcrossApiErrorResponseBody } from '$lib/types/error/AcrossApiErrorResponseBody';
import { error } from '@sveltejs/kit';
import HTTP_CODES from '../HttpCodes';
import logger from '$lib/logger';
import parseErrorResponse from '../error/parseErrorResponse';

/**
 * Get an error body from the response which can be
 * from the ACROSS API (has detail) or an App.Error
 */
const getAppError = async (status: number, response: Response): Promise<App.Error> => {
    const appError: App.Error = {
        message: 'Unknown API error',
        code: HTTP_CODES[status] || HTTP_CODES[0],
        errorId: crypto.randomUUID(),
    };

    const responseText = await response.text();
    let body: AcrossApiErrorResponseBody | null = null;

    try {
        // Attempt to parse res as json
        body = JSON.parse(responseText) as AcrossApiErrorResponseBody;

        // If the server returns an errorId, we will use that for logging and tracking purposes
        if (body.errorId) appError.errorId = body.errorId;
        appError.message = parseErrorResponse(body);
    } catch (err) {
        // Parsing fails, we can ignore this since we will use the responseText as a fallback
        logger.debug({ msg: 'Parsing the ACROSS API error response as plaintext', err, responseText });

        if (responseText) appError.message = responseText;
        else if (response.statusText) appError.message = response.statusText;
    }

    return appError;
};

export const callApi = async <T>(fetch: typeof window.fetch, url: string | URL, options: RequestInit): Promise<T> => {
    const response = await fetch(url, options);

    if (!response.ok) {
        const errorBody = await getAppError(response.status, response);

        logger.error({
            msg: 'ACROSS API request failed',
            url,
            options,
            status: response.status,
            errorBody,
        });

        return error(response.status, errorBody);
    }

    return (await response.json()) as T;
};
