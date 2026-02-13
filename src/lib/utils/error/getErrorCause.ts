type ErrorWithCause = {
    cause: string;
};

function isErrorWithCause(error: unknown): error is ErrorWithCause {
    return typeof error === 'object' && error !== null && 'cause' in error && typeof (error as Record<string, unknown>).cause === 'string';
}

export function getErrorCause(error: unknown) {
    if (isErrorWithCause(error)) return error.cause || 'unknown cause';
}
