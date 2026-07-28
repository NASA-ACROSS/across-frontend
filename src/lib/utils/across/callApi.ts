import type { AcrossApiErrorResponseBody } from '$lib/types/error/AcrossApiErrorResponseBody';
import { error } from '@sveltejs/kit';
import HTTP_CODES from '../HttpCodes';
import logger from '$lib/logger';
import parseErrorResponse from '../error/parseErrorResponse';
import { CONFIG } from '$config/config';

type CallApiOptions = RequestInit & {
    responseType?: 'json' | 'empty';
};
type JsonResult<T> = { data: T; response: Response };
type EmptyResult = { data: undefined; response: Response };
type Result<T> = JsonResult<T> | EmptyResult;

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

/**
 * Main wrapper to call the ACROSS API. This will handle error parsing and return a consistent error responses.
 *
 * @param fetch - The fetch function to use for making the API call. This is typically the fetch function provided by SvelteKit's RequestEvent.
 * @param route - The API route to call, relative to the ACROSS server URL.
 * @param options - DEFAULT: `{ method: 'GET', responseType: 'json' }`. The options to pass
 * to the fetch function, such as method, headers, and body. The `responseType` option can be set to 'json' or 'empty' to specify the expected response type. When there is no content, the `responseType` should be set to 'empty' to avoid parsing errors.
 * @returns A promise that resolves with an object containing the data from the API response and the response object itself.
 */
export function callApi<T>(
    fetch: typeof globalThis.fetch,
    route: string,
    options?: CallApiOptions & { responseType?: 'json' }
): Promise<JsonResult<T>>;

export function callApi(
    fetch: typeof globalThis.fetch,
    route: string,
    options: CallApiOptions & { responseType: 'empty' }
): Promise<EmptyResult>;

export async function callApi<T>(
    fetch: typeof globalThis.fetch,
    route: string,
    options: CallApiOptions = { method: 'GET', responseType: 'json' }
): Promise<Result<T>> {
    const responseType = options.responseType || 'json';

    const url = new URL(`${CONFIG.ACROSS_SERVER_URL}${route}`);

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

        error(response.status, errorBody);
    }

    if (responseType === 'empty' || response.status === 204) {
        return { data: undefined, response };
    } else {
        return { data: (await response.json()) as T, response };
    }
}
