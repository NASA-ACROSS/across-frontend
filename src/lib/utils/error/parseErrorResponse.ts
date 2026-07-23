import type { AcrossApiErrorResponseBody } from '$lib/types/error/AcrossApiErrorResponseBody';

const DEFAULT_ERROR_MESSAGE = 'There was an unknown error processing the request.';

/**
 * This will parse out the error response from the ACROSS API and return a user-friendly message.
 * If the error response is not in the expected format, it will return a default error message.
 * @param body Across API error response body: detail can be either a string or an array of error items defining what multiple pieces can be wrong with the request
 * @returns string user-friendly error message
 */
const parseErrorResponse = (body: AcrossApiErrorResponseBody): string => {
    if (typeof body.detail === 'string') {
        return body.detail;
    } else if (Array.isArray(body.detail)) {
        const errorMessages = body.detail.map(({ msg, loc }) => {
            const param = loc[1] || '';
            return `${param ? `${param}: ` : ''}${msg}`;
        });

        return errorMessages.join('; ');
    }

    return DEFAULT_ERROR_MESSAGE;
};

export default parseErrorResponse;

export { DEFAULT_ERROR_MESSAGE };
