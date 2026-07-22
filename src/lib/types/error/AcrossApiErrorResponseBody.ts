export type AcrossApiErrorResponseBody = {
    detail: string;
    // Future for trace/error IDs passed from the server. likely just want to call this `traceId`
    errorId?: string;
};
