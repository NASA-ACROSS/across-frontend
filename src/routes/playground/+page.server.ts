import guards from '#lib/utils/guards/index.ts';
import logger from '#lib/logger/index.ts';
import { fail, type ActionFailure, type RequestEvent, isHttpError } from '@sveltejs/kit';
import type { FormSubmitResult } from '#lib/types/form/FormSubmitResult.ts';
import searchParams from '#lib/utils/searchParams/searchParams.ts';
import HTTP_CODES from '#lib/utils/HttpCodes.ts';
import { getKrabbyPattySecretFormula } from './util/getKrabbyPattySecretFormula';

const userFriendlyErrors: Record<number, string> = {
    401: 'The Krusty Krab is closed.',
    403: "Now only the really real Mr. Krabs can answer this...If we're discussing the secret formula on the third Wednesday in January and it's not raining outside after we've gargled with vanilla pudding, what do we do?",
    404: 'The Krabby Patty secret formula cannot be found anywhere.',
    500: 'Oops! Spongebob forgot how to make the Krabby Patty!',
};

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
        logger.error({ foo: 'bar', err: new Error('Error message is both log message and error.message') });
        logger.error({ msg: 'this log msg Overrides error.message', foo: 'bar', err: new Error('This is a test error.message') });
        logger.error({ foo: 'bar', err: new Error('This is a test error.message') }, 'second arg message overrides error.message');

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
                    errorId: crypto.randomUUID(),
                    code: HTTP_CODES[400],
                    status: 400,
                });
            default:
                return fail(400, {
                    type: 'error',
                    message: `Unknown feedback type: ${feedbackType}`,
                    _action: 'mockFormSubmitFeedback',
                    errorId: crypto.randomUUID(),
                    code: HTTP_CODES[400],
                    status: 400,
                });
        }
    },

    mockCallApi: async ({ request }: RequestEvent): Promise<(FormSubmitResult & { data: unknown }) | ActionFailure<FormSubmitResult>> => {
        guards.localOnlyRoute();

        const form = await request.formData();
        const qp = searchParams.serialize(form);

        const status = qp.get('status') || undefined;

        if (status === 'BOOM') {
            throw new Error('GARY! YOU ARE GONNA FINISH YOUR DESSERT, AND YOU ARE GONNA LIKE IT!');
        }

        // Initial error handling for the page.
        if (isNaN(Number(status))) {
            return fail(400, {
                type: 'error',
                message: "That's not a valid status code or failure type. Pick one and try again.",
                errorId: crypto.randomUUID(),
                code: HTTP_CODES[400],
                status: 400,
            });
        }

        try {
            // use the utility function to help simulate an api call. Internally this will use `callApi` to make the request, but
            // it will use a mock fetch that simulates the API response based on the query parameters.
            const data = await getKrabbyPattySecretFormula(Number(status));

            logger.info({ msg: 'Fake-Route API call successful', data });

            return { type: 'success', data, status: Number(status) };
        } catch (err: unknown) {
            if (isHttpError(err)) {
                return fail(err.status, {
                    type: 'error',
                    errorId: err.body.errorId,
                    status: err.status,
                    code: err.body.code,
                    message: userFriendlyErrors[err.status] || err.body.message,
                });
            }

            throw err;
        }
    },
};
