/**
 * Example:
 *   ```json
 *   {
 *      "type":"missing",
 *      "loc":["query","instrument_ids"],
 *      "msg": "At least one instrument must be selected"
 *   }
 *   ```
 */
type ErrorResponse = {
    detail: { loc: [string, string]; msg: string; type: string }[] | string;
};

const DEFAULT_ERROR_MESSAGE = 'There was an error processing the request, please modify your selection and try again';

/** Confirms ErrorResponse structure */
const isErrorResponse = (result: unknown): result is ErrorResponse => {
    return typeof result === 'object' && result !== null && 'detail' in result;
};

const parseErrorResponse = (result: unknown): string => {
    if (isErrorResponse(result)) {
        if (typeof result.detail === 'string') {
            return result.detail;
        } else if (Array.isArray(result.detail)) {
            const errorMessages = result.detail.map(({ msg, loc }) => {
                const param = loc[1] || '';

                return `${param ? `${param}: ` : ''}${msg}`;
            });

            return errorMessages.join('; ');
        }
    }

    return DEFAULT_ERROR_MESSAGE;
};

export default parseErrorResponse;

export { DEFAULT_ERROR_MESSAGE };
