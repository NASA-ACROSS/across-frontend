import logger from '$lib/logger';
import { fail, type ActionFailure, isHttpError, type RequestEvent } from '@sveltejs/kit';
import type { FormSubmitResult } from '$lib/types/form/FormSubmitResult';
import { callApi } from '$lib/utils/across/callApi';
import type { ObservationRequestCreate } from '$lib/types/across/ObservationRequest';
import { resolveObject } from '$lib/utils/across/resolveObject';
import { getTelescopes } from '$lib/utils/across/getTelescopes';
import type { Telescope } from '$lib/types/across/Telescope';
import guards from '$lib/utils/guards/index.js';

const demoPayload: ObservationRequestCreate = {
    science_justification: 'Demo observation for testing the observation request creation flow',
    object_name: 'Vega',
    object_coordinates: { ra: 279.23, dec: 38.78 },
    object_brightness: { value: 0.03, unit: 'ab_mag' },
    object_position_error: 3.13,
    observation_window: { begin: '2026-09-28T00:00:00Z', end: '2026-10-01T00:00:00Z' },
    exposure_time: 300.0,
    anonymize: false,
    is_too: true,
    instrument_id: 'f3a2b0c1-4d5e-4f6a-8b7c-8d9e0f1a2b3c',
    instrument_configuration: null,
    parent_id: null,
    proposal_name: 'FooProposalXYZ',
    proposal_code: 'XYZ',
};

export async function load({ fetch, locals }: RequestEvent) {
    guards.requireUser(locals);

    const telescopes: Telescope[] = await getTelescopes(fetch);

    return {
        telescopes,
    };
}

export const actions = {
    submitCreate: async ({
        fetch,
    }: RequestEvent): Promise<(FormSubmitResult & { created_id: string }) | ActionFailure<FormSubmitResult>> => {
        try {
            const apiUrl = `/observation-request/`;
            const request = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(demoPayload),
            };

            const response = await callApi<string>(fetch, apiUrl, request);

            logger.info({ msg: 'Observation request created successfully', created_id: response.data });

            return { type: 'success', message: 'Observation request created successfully', created_id: response.data };
        } catch (err: unknown) {
            if (isHttpError(err)) {
                logger.error(err);
                return fail(err.status, {
                    type: 'error',
                    errorId: err.body.errorId,
                    code: err.body.code,
                    message: err.body.message,
                });
            }

            throw err;
        }
    },
    resolveObject,
};
