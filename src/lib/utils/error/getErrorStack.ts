type ErrorWithStack = {
    stack: string;
};

function isErrorWithStack(error: unknown): error is ErrorWithStack {
    return typeof error === 'object' && error !== null && 'stack' in error && typeof (error as Record<string, unknown>).stack === 'string';
}

export function getErrorStack(error: unknown) {
    if (isErrorWithStack(error)) return error.stack;
}
