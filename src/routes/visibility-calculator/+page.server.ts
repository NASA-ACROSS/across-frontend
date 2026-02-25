import type { Telescope } from '$lib/types/across/Telescope';
import type { JointVisibilityWindowResponse } from '$lib/types/across/VisibilityWindow';
import { getTelescopes } from '$lib/utils/across/getTelescopes';
import { resolveObject } from '$lib/utils/across/resolveObject';
import type { RequestEvent } from './$types';
import { CONFIG } from '../../config/config';

type ErrorResponse = {
    detail: string;
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
            console.log(`API error detail: ${text.detail}`);
            // const knownError = isKnownError(text.detail);
            return {
                telescopes,
                joint_visibility_windows: [],
                visibility_window_instrument_ids: [],
                observatory_visibility_windows: {},
                queryParams: {} as JointVisibilityQueryParams,
                error: text.detail,
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
            telescopes: [],
            error: 'Failed to load telescope data',
        };
    }
}

export const actions = { resolveObject };
