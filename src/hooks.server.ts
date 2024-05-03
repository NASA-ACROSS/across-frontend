import type { HandleServerError } from "@sveltejs/kit";

export const handleError: HandleServerError = ({ error, event, status, message }) => {
    const errorId = crypto.randomUUID();

    const errorLog = {
        errorId,
        errorUrl: event.url.href,
        clientAddress: event.getClientAddress(),
        stackTrace: error?.stack,
        cause: error?.cause // undefined for some errors, present for others
    };

    console.error(`[ERROR] Unhandled exception in ${event.url}`, errorLog)

    return {
        message,
        errorId
    }
}