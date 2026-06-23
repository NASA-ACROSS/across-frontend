import guards from '$lib/utils/guards';
import logger from '$lib/logger';
import { fail, type ActionFailure, type RequestEvent } from '@sveltejs/kit';
import type { FormSubmitResult } from '$lib/types/form/FormSubmitResult';

export const load = () => {
    guards.localOnlyRoute();

    return {};
};

export const actions = {
    logTest: (): FormSubmitResult | ActionFailure<FormSubmitResult> => {
        guards.localOnlyRoute();

        logger.debug({ msg: 'Debug log in Component Playground server page', foo: 'bar' });
        logger.info({ msg: 'Info log in Component Playground server page', foo: 'bar' });
        logger.warn({ msg: 'Warning log in Component Playground server page', foo: 'bar' });
        logger.error({ foo: 'bar', err: new Error('This is a test error') }, 'Override server error message');

        const childLogger = logger.child({ context: 'logTest' });
        childLogger.info({ msg: 'Info child log in Component Playground server page', fizz: 'buzz' });

        return { type: 'success', message: 'Log output written to console', _action: 'logTest' };
    },
    mockFormSubmitFeedback: async ({ request }: RequestEvent): Promise<FormSubmitResult | ActionFailure<FormSubmitResult>> => {
        guards.localOnlyRoute();
        const data = await request.formData();
        const feedbackType = data.get('feedbackType') as string;

        switch (feedbackType) {
            case 'success':
                return { type: 'success', message: 'Mock operation completed successfully!', _action: 'mockFormSubmitFeedback' };
            case 'warning':
                return {
                    type: 'warning',
                    message: 'This is a mock warning message. Something may need attention.',
                    _action: 'mockFormSubmitFeedback',
                };
            case 'error':
                return fail(400, {
                    type: 'error',
                    message: 'A mock error occurred while processing your request.',
                    _action: 'mockFormSubmitFeedback',
                });
            default:
                return fail(400, { type: 'error', message: `Unknown feedback type: ${feedbackType}`, _action: 'mockFormSubmitFeedback' });
        }
    },
};
