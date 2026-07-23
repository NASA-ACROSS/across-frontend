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
type AcrossErrorItem = {
    type: string;
    loc: string[];
    msg: string;
};

export type AcrossApiErrorResponseBody = {
    detail: string | AcrossErrorItem[];
    // Future for trace/error IDs passed from the server. likely just want to call this `traceId`
    errorId?: string;
};
