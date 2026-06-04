export type FormSubmitResult = {
    type: 'success' | 'warning' | 'error';
    message?: string;
    _action?: string;
};

export interface FormSubmitResultError extends FormSubmitResult, App.Error {
    type: 'error';
    message: string;
}
