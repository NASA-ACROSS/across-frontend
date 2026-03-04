import type { Telescope } from '$lib/types/across/Telescope';
import type { JointVisibilityWindowResponse } from '$lib/types/across/VisibilityWindow';
import { getTelescopes } from '$lib/utils/across/getTelescopes';
import { resolveObject } from '$lib/utils/across/resolveObject';
import { findKnownError } from '$lib/utils/error/findKnownError';
import type { RequestEvent } from './$types';
import { CONFIG } from '../../config/config';
import searchParams from '$lib/utils/searchParams/searchParams';

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

const knownErrors: Record<string, string> = {
    'could be used to calculate an ephemeris for observatory':
        'Invalid Ephemeris Parameters: please contact support with your search parameters to resolve this issue.',
    'type":"missing","loc":["query","ra"],': 'RA and DEC are required',
    'type":"missing","loc":["query","dec"],': 'RA and DEC are required',
    'type":"less_than_equal","loc":["query","ra"]': 'RA must be between 0° and 360°',
    'type":"less_than_equal","loc":["query","dec"]': 'DEC must be between -90° and 90°',
    'type":"greater_than_equal","loc":["query","ra"]': 'RA must be between 0° and 360°',
    'type":"greater_than_equal","loc":["query","dec"]': 'DEC must be between -90° and 90°',
    '"type":"missing","loc":["query","date_range_begin"]': 'Date Range Begin and End are required',
    '"type":"missing","loc":["query","date_range_end"]': 'Date Range Begin and End are required',
    '"type":"missing","loc":["query","instrument_ids"]': 'At least one instrument must be selected',
};

export type VisibilityWindowsData = {
    jointVisibilityWindows: JointVisibilityWindowResponse['visibility_windows'];
    visibilityWindowInstrumentIds: JointVisibilityWindowResponse['instrument_ids'];
    observatoryVisibilityWindows: JointVisibilityWindowResponse['observatory_visibility_windows'];
    error: string;
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
    calculateVisibilityWindows: async (event: RequestEvent): Promise<VisibilityWindowsData> => {
        const form = await event.request.formData();
        const params = searchParams.serialize(form, { instrument_ids: 'array' });

        // Build API URL with parameters
        const apiUrl = new URL(`${CONFIG.API_URL}/tools/visibility-calculator/windows?${params.toString()}`);

        let response: Response;
        try {
            response = await fetch(apiUrl);
        } catch (error) {
            console.error('ERROR fetching visibility windows:', error);

            return {
                jointVisibilityWindows: [],
                visibilityWindowInstrumentIds: [],
                observatoryVisibilityWindows: {},
                error: 'An error occurred while fetching visibility windows. Please contact support if it continues.',
            };
        }

        if (!response.ok) {
            const text = (await response.json()) as ErrorResponse;
            const detailText = findKnownError(text.detail, knownErrors);
            console.error('ERROR fetching visibility windows:', {
                status: response.status,
                text: await response.text(),
            });

            return {
                jointVisibilityWindows: [],
                visibilityWindowInstrumentIds: [],
                observatoryVisibilityWindows: {},
                error: detailText,
            };
        }

        const data = (await response.json()) as JointVisibilityWindowResponse;

        return {
            jointVisibilityWindows: data.visibility_windows,
            visibilityWindowInstrumentIds: data.instrument_ids,
            observatoryVisibilityWindows: data.observatory_visibility_windows,
            error: '',
        };
    },
};
