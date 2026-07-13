import logger from '$lib/logger';
import type { AcrossApiErrorResponse } from '$lib/types/error/AcrossApiErrorResponse';
import { error } from '@sveltejs/kit';
import HTTP_CODES from '../HttpCodes';

type ApiErrorBody = AcrossApiErrorResponse | App.Error;

/** An error ID is either produced in the errorHandler hook
 * or generated here
 */
const getErrorId = (body: ApiErrorBody): string => {
    const hasErrorId = 'errorId' in body && body.errorId;
    return hasErrorId ? body.errorId : crypto.randomUUID();
};

/**
 * Get an error body from the response which can be
 * from the ACROSS API (has detail) or an App.Error
 */
const getErrorBody = (status: number, body: ApiErrorBody): App.Error => {
    const errorId = getErrorId(body);
    const errorBody: App.Error = {
        message: 'Unknown API error',
        code: HTTP_CODES[status] || HTTP_CODES[0],
        errorId,
    };

    if ('detail' in body && body.detail) {
        // It may be possible that detail is an object with more info,
        // but for now we will assume it's a string
        errorBody.message = body.detail;
    } else if ('message' in body && body.message) {
        errorBody.message = body.message;
    } else {
        logger.warn({ body, errorId }, 'API error response does not contain expected fields. Using fallback message.');
    }

    return errorBody;
};

export const callApi = async <T>(fetch: typeof window.fetch, url: string, options: RequestInit): Promise<T> => {
    const response = await fetch(url, options);

    if (!response.ok) {
        const body = (await response.json()) as ApiErrorBody;
        const errorBody = getErrorBody(response.status, body);

        return error(response.status, errorBody);
    }

    return (await response.json()) as T;
};
