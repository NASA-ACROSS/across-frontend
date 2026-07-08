export type FormSubmitResult = {
    type: 'success' | 'warning' | 'error';
    message?: string;
    _action?: string;
};
