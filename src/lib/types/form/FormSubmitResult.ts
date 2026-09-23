type FormSubmitResultBase = {
    message?: string;
    _action?: string;
};

type FormSubmitResultSuccess = {
    type: 'success';
} & FormSubmitResultBase;

type FormSubmitResultWarning = {
    type: 'warning';
    message: string;
} & FormSubmitResultBase;

type FormSubmitResultError = {
    type: 'error';
    message: string;
} & FormSubmitResultBase &
    App.Error;

export type FormSubmitResult = FormSubmitResultSuccess | FormSubmitResultWarning | FormSubmitResultError;
