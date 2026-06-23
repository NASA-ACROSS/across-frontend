import guards from '$lib/utils/guards';
import logger from '$lib/logger';
import { type ActionFailure } from '@sveltejs/kit';
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

        return { type: 'success', message: 'Log output written to console' };
    },
};
