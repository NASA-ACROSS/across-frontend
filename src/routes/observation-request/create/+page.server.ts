import logger from '$lib/logger';
import { fail, type ActionFailure, isHttpError, type RequestEvent } from '@sveltejs/kit';
import type { FormSubmitResult } from '$lib/types/form/FormSubmitResult';
import { callApi } from '$lib/utils/across/callApi';
import type { ObservationRequestCreate } from '$lib/types/across/ObservationRequest';
import { resolveObject } from '$lib/utils/across/resolveObject';
import { getTelescopes } from '$lib/utils/across/getTelescopes';
import type { Telescope } from '$lib/types/across/Telescope';
import guards from '$lib/utils/guards/index.js';
import type { TelescopeInstrument } from '$lib/types/across/TelescopeInstrument.js';

export async function load({ fetch, locals }: RequestEvent) {
    guards.requireUser(locals);

    const telescopes: Telescope[] = await getTelescopes(fetch);

    // reduce the available selections of observatories/telescopes/instruments based on instrument.is_observation_request_enabled
    const enabledTelescopes = telescopes.reduce((telescopes: Telescope[], telescope) => {
        telescope.instruments = telescope.instruments.reduce((instruments: TelescopeInstrument[], instrument) => {
            if (instrument.is_observation_request_enabled === true) {
                instruments.push(instrument);
            }
            return instruments;
        }, []);
        if (telescope.instruments.length) telescopes.push(telescope);
        return telescopes;
    }, []);

    return {
        telescopes: enabledTelescopes,
    };
}

export const actions = {
    submitCreate: async ({
        fetch,
        request,
    }: RequestEvent): Promise<(FormSubmitResult & { created_id: string }) | ActionFailure<FormSubmitResult>> => {
        const form = await request.formData();

        const observationRequestPayload: ObservationRequestCreate = {
            object_name: form.get('objectName') as string,
            object_coordinates: {
                ra: Number(form.get('ra')),
                dec: Number(form.get('dec')),
            },
            object_brightness: {
                value: Number(form.get('brightness')),
                unit: form.get('brightnessUnit') as string,
            },
            object_position_error: Number(form.get('positionOffset')) || null,
            observation_window: {
                begin: form.get('dateRangeBegin') as string,
                end: (form.get('dateRangeEnd') as string) || null,
            },
            exposure_time: 300.0, // exposure time placeholder until instrument configuration is implemented. this field is required on the core-server.
            anonymize: (form.get('anonymize') as string) === 'true' || false,
            is_too: true,
            instrument_id: form.get('instrumentId') as string,
            proposal_name: form.get('proposalName') as string,
            proposal_code: form.get('proposalCode') as string,
            science_justification: form.get('justification') as string,
        };

        try {
            const apiUrl = `/observation-request/`;
            const request = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(observationRequestPayload),
            };

            const response = await callApi<string>(fetch, apiUrl, request);

            logger.info({ msg: 'Observation request created successfully', created_id: response.data });

            return { type: 'success', message: 'Observation request created successfully', created_id: response.data };
        } catch (err: unknown) {
            if (isHttpError(err)) {
                logger.error(err);
                return fail(err.status, {
                    _action: 'submitCreate',
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
