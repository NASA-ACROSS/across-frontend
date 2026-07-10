import type { Telescope } from '$lib/types/across/Telescope';
import type { JointVisibilityWindowResponse } from '$lib/types/across/VisibilityWindow';
import { getTelescopes } from '$lib/utils/across/getTelescopes';
import { resolveObject } from '$lib/utils/across/resolveObject';
import type { RequestEvent } from './$types';
import { CONFIG } from '../../config/config';
import { fail, type ActionFailure } from '@sveltejs/kit';
import type { FormSubmitResult } from '$lib/types/form/FormSubmitResult';
import searchParams from '$lib/utils/searchParams/searchParams';
import parseErrorResponse from '$lib/utils/error/parseErrorResponse';
import logger from '$lib/logger';
import HTTP_CODES from '$lib/utils/HttpCodes';

type ErrorResponse = {
    detail: unknown;
};

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

        // Build API URL with parameters
        const apiUrl = new URL(`${CONFIG.ACROSS_SERVER_URL}/tools/visibility-calculator/windows?${params.toString()}`);

        let response: Response;
        try {
            response = await fetch(apiUrl);
        } catch (err: unknown) {
            logger.error({ err, params: params.toString(), msg: 'Request failed fetching visibility windows.' });

            return fail(500, {
                type: 'error',
                message: 'An error occurred while fetching visibility windows. Please contact support if it continues.',
                errorId: crypto.randomUUID(),
                code: HTTP_CODES[500],
            });
        }

        if (!response.ok) {
            const result = (await response.json()) as ErrorResponse;
            const detailText = parseErrorResponse(result);

            return fail(response.status, {
                type: 'error',
                message: detailText,
                errorId: crypto.randomUUID(),
                code: HTTP_CODES[response.status],
            });
        }

        const data = (await response.json()) as JointVisibilityWindowResponse;

        return {
            type: 'success',
            visibilityWindowsData: {
                jointVisibilityWindows: data.visibility_windows,
                visibilityWindowInstrumentIds: data.instrument_ids,
                observatoryVisibilityWindows: data.observatory_visibility_windows,
                error: '',
            },
        };
    },
};
