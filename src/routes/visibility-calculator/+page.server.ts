import type { Telescope } from '$lib/types/across/Telescope';
import type { JointVisibilityWindowResponse } from '$lib/types/across/VisibilityWindow';
import { getTelescopes } from '$lib/utils/across/getTelescopes';
import { resolveObject } from '$lib/utils/across/resolveObject';
import type { RequestEvent } from './$types';
import { CONFIG } from '../../config/config';

type ErrorResponse = {
    detail: unknown;
};

type JointVisibilityQueryParams = {
    instrument_ids?: string[] | null;
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

const isKnownError = (detail: unknown): string => {
    // Convert detail to string for pattern matching
    let detailStr: string;

    // If detail is an array, take the first element and stringify it. If it's a string, use it directly. Otherwise, stringify the whole detail.
    if (Array.isArray(detail) && detail.length > 0) {
        // If array, take first element and stringify
        detailStr = JSON.stringify(detail[0]);
    } else if (typeof detail === 'string') {
        detailStr = detail;
    } else {
        detailStr = JSON.stringify(detail);
    }

    // Check if any known error key is contained in the detail string
    for (const [key, value] of Object.entries(knownErrors)) {
        if (detailStr.includes(key)) {
            return value;
        }
    }

    // return generic message if no known error patterns matched
    return 'There was an error processing the request. Please contact support with your search parameters to resolve this issue.';
};

export async function load({ url, locals, cookies }: RequestEvent) {
    const queryParams: JointVisibilityQueryParams = {} as JointVisibilityQueryParams;

    if (url.searchParams.has('date_range_begin')) queryParams.date_range_begin = url.searchParams.get('date_range_begin');
    if (url.searchParams.has('date_range_end')) queryParams.date_range_end = url.searchParams.get('date_range_end');
    if (url.searchParams.has('ra')) queryParams.ra = url.searchParams.get('ra');
    if (url.searchParams.has('dec')) queryParams.dec = url.searchParams.get('dec');
    if (url.searchParams.has('min_visibility_duration')) queryParams.min_visibility_duration = url.searchParams.get('min_visibility_duration');
    if (url.searchParams.has('hi_res')) queryParams.hi_res = url.searchParams.get('hi_res') === 'false' ? false : true;

    queryParams.instrument_ids = url.searchParams.get('instrument_ids')?.split(',') || [];

    // Build API URL with parameters
    let apiUrl = `${CONFIG.API_URL}/tools/visibility-calculator/windows/?`;
    const apiParams = new URLSearchParams();

    // Add all query parameters to API request
    Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined) {
            if (Array.isArray(value)) {
                value.forEach((item) => apiParams.append(key, item));
            } else {
                // only add valid api params
                apiParams.append(key, String(value));
            }
        }
    });

    apiUrl += apiParams.toString();

    try {
        const telescopes: Telescope[] = await getTelescopes(locals, cookies);

        // early return if no query parameters provided - prevents unnecessary API call and allows page to load with just telescopes for selection
        if (apiParams.toString() === '') {
            return {
                telescopes: telescopes,
                joint_visibility_windows: [],
                visibility_window_instrument_ids: [],
                observatory_visibility_windows: {},
            };
        }

        // Fetch visibility windows from API
        const response = await fetch(apiUrl);

        if (!response.ok) {
            console.log(`API responded with status: ${response.status} for request URL ${apiUrl}`);
            const text = (await response.json()) as ErrorResponse;
            const detailText = isKnownError(text.detail);
            return {
                telescopes,
                joint_visibility_windows: [],
                visibility_window_instrument_ids: [],
                observatory_visibility_windows: {},
                queryParams: {} as JointVisibilityQueryParams,
                error: detailText,
            };
        }

        const joint_visibility_response = (await response.json()) as JointVisibilityWindowResponse;

        return {
            telescopes: telescopes,
            joint_visibility_windows: joint_visibility_response.visibility_windows,
            visibility_window_instrument_ids: joint_visibility_response.instrument_ids,
            observatory_visibility_windows: joint_visibility_response.observatory_visibility_windows,
        };
    } catch (err) {
        console.error('Error loading visibility calculator data:', err);
        return {
            telescopes: [] as Telescope[],
            error: 'Failed to load telescope data',
        };
    }
}

// This line is needed for the object name resolver component.
export const actions = { resolveObject };
