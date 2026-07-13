import logger from '$lib/logger';

const DEFAULT_ERROR_MESSAGE =
    'There was an error processing the request. Please contact support with your search parameters to resolve this issue.';

export const findKnownError = (detail: unknown, knownErrors: Record<string, string> = {}): string => {
    let detailStr: string;

    try {
        // If detail is an array, take the first element and stringify it. If it's a string, use it directly. Otherwise, stringify the whole detail.
        if (Array.isArray(detail) && detail.length > 0) {
            // If array, take first element and stringify
            detailStr = JSON.stringify(detail[0]);
        } else if (typeof detail === 'string') {
            detailStr = detail;
        } else {
            detailStr = JSON.stringify(detail);
        }

        // Check if any known error key is contained in the detail string
        for (const [key, errMsg] of Object.entries(knownErrors)) {
            if (detailStr.includes(key)) {
                return errMsg;
            }
        }
    } catch (err) {
        logger.error({ msg: 'Error processing error detail', detail, err });
        return DEFAULT_ERROR_MESSAGE;
    }

    // If no known error patterns matched, return a generic error message
    return DEFAULT_ERROR_MESSAGE;
};
