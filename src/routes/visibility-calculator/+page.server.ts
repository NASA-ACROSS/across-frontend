import type { Telescope } from '#lib/types/across/Telescope.js';
import type { JointVisibilityWindowResponse } from '#lib/types/across/VisibilityWindow.js';
import { getTelescopes } from '#lib/utils/across/getTelescopes.js';
import { resolveObject } from '#lib/utils/across/resolveObject.js';
import type { RequestEvent } from './$types';
import { fail, isHttpError, type ActionFailure } from '@sveltejs/kit';
import type { FormSubmitResult } from '#lib/types/form/FormSubmitResult.js';
import searchParams from '#lib/utils/searchParams/searchParams.js';
import HTTP_CODES from '#lib/utils/HttpCodes.js';
import { callApi } from '#lib/utils/across/callApi.js';
import logger from '#lib/logger/index.js';

type JointVisibilityQueryParams = {
    instrument_ids?: string[];
    date_range_begin?: string | null;
    date_range_end?: string | null;
    ra?: string | number | null;
    dec?: string | number | null;
    min_visibility_duration?: string | number | null;
    hi_res?: boolean | null;
};

export type VisibilityWindowsData = {
    jointVisibilityWindows: JointVisibilityWindowResponse['visibility_windows'];
    visibilityWindowInstrumentIds: JointVisibilityWindowResponse['instrument_ids'];
    observatoryVisibilityWindows: JointVisibilityWindowResponse['observatory_visibility_windows'];
    error: string;
};

export type VisibilityResult = FormSubmitResult & {
    visibilityWindowsData: VisibilityWindowsData;
};

export type JointVisibilityPageData = {
    queryParams: JointVisibilityQueryParams;
    telescopes: Telescope[];
};

export async function load({ url, fetch }: RequestEvent): Promise<JointVisibilityPageData> {
    const queryParams = searchParams.deserialize<JointVisibilityQueryParams>(url.searchParams, {
        instrument_ids: 'array',
        hi_res: 'boolean',
    });

    const telescopes = await getTelescopes(fetch);

    return { queryParams, telescopes };
}

// This line is needed for the object name resolver component.
export const actions = {
    resolveObject,
    calculateVisibilityWindows: async (event: RequestEvent): Promise<VisibilityResult | ActionFailure<FormSubmitResult>> => {
        const form = await event.request.formData();
        const params = searchParams.serialize(form, { instrument_ids: 'array' });

        const route = `/tools/visibility-calculator/windows?${params.toString()}`;

        try {
            const { data } = await callApi<JointVisibilityWindowResponse>(event.fetch, route, {
                method: 'GET',
            });

            return {
                type: 'success',
                visibilityWindowsData: {
                    jointVisibilityWindows: data.visibility_windows,
                    visibilityWindowInstrumentIds: data.instrument_ids,
                    observatoryVisibilityWindows: data.observatory_visibility_windows,
                    error: '',
                },
            };
        } catch (err: unknown) {
            if (isHttpError(err)) {
                return fail(err.status, {
                    type: 'error',
                    message: err.body.message,
                    errorId: err.body.errorId,
                    code: err.body.code,
                    status: err.status,
                });
            } else {
                const errorId = crypto.randomUUID();
                logger.error({ err, errorId });
                return fail(500, {
                    type: 'error',
                    message: 'An unexpected error occurred while calculating visibility windows.',
                    errorId,
                    code: HTTP_CODES[500],
                    status: 500,
                });
            }
        }
    },
};
