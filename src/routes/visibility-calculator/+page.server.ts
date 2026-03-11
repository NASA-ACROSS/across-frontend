import type { Telescope } from '$lib/types/across/Telescope';
import type { JointVisibilityWindowResponse } from '$lib/types/across/VisibilityWindow';
import { getTelescopes } from '$lib/utils/across/getTelescopes';
import { resolveObject } from '$lib/utils/across/resolveObject';
import { findKnownError } from '$lib/utils/error/findKnownError';
import type { RequestEvent } from './$types';
import { CONFIG } from '../../config/config';
import type { UserCredentialsCookie } from '$lib/types/User/UserCredentialsCookie';

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

export type VisibilityWindowsData = {
    jointVisibilityWindows: JointVisibilityWindowResponse['visibility_windows'];
    visibilityWindowInstrumentIds: JointVisibilityWindowResponse['instrument_ids'];
    observatoryVisibilityWindows: JointVisibilityWindowResponse['observatory_visibility_windows'];
    error: string;
};

export type JointVisibilityPageData = {
    queryParams: JointVisibilityQueryParams;
    telescopes: Telescope[];
    visibilityWindowsData: Promise<VisibilityWindowsData>;
};

export async function load({ url, locals, cookies }: RequestEvent): Promise<JointVisibilityPageData> {
    const userCookie = locals?.user as UserCredentialsCookie;
    const queryParams: JointVisibilityQueryParams = {} as JointVisibilityQueryParams;

    let telescopes: Telescope[] = [];

    if (url.searchParams.has('date_range_begin')) queryParams.date_range_begin = url.searchParams.get('date_range_begin');
    if (url.searchParams.has('date_range_end')) queryParams.date_range_end = url.searchParams.get('date_range_end');
    if (url.searchParams.has('ra')) queryParams.ra = url.searchParams.get('ra');
    if (url.searchParams.has('dec')) queryParams.dec = url.searchParams.get('dec');
    if (url.searchParams.has('min_visibility_duration')) queryParams.min_visibility_duration = url.searchParams.get('min_visibility_duration');
    if (url.searchParams.has('hi_res')) queryParams.hi_res = url.searchParams.get('hi_res') === 'false' ? false : true;

    const instrumentIds = url.searchParams.get('instrument_ids')?.split(',');
    if (instrumentIds?.length) queryParams.instrument_ids = instrumentIds;

    telescopes = await getTelescopes(userCookie, cookies);

    if (!Object.values(queryParams).length) {
        return {
            queryParams: queryParams,
            telescopes: telescopes,
            visibilityWindowsData: Promise.resolve({
                jointVisibilityWindows: [],
                visibilityWindowInstrumentIds: [],
                observatoryVisibilityWindows: {},
                error: '',
            }),
        };
    }

    // Build API URL with parameters
    const apiUrl = new URL(`${CONFIG.API_URL}/tools/visibility-calculator/windows/`);
    // Add all query parameters to API request
    Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined) {
            if (Array.isArray(value)) {
                value.forEach((item) => apiUrl.searchParams.append(key, item));
            } else {
                // only add valid api params
                apiUrl.searchParams.append(key, String(value));
            }
        }
    });

    // Lazy load visibility windows as a Promise
    const visibilityWindowData = fetch(apiUrl).then(async (response) => {
        // try {

        if (!response.ok) {
            console.log(`API responded with status: ${response.status} for request URL ${apiUrl.toString()}`);
            const text = (await response.json()) as ErrorResponse;
            const detailText = findKnownError(text.detail, knownErrors);
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
        // } catch (err) {
        //     console.error('Error loading visibility calculator data:', err);
        //     return {
        //         jointVisibilityWindows: [],
        //         visibilityWindowInstrumentIds: [],
        //         observatoryVisibilityWindows: {},
        //         error: 'Error loading visibility calculator data. Please contact support with your search parameters to resolve this issue.',
        //     };
        // }
    });

    return {
        queryParams: queryParams,
        telescopes: telescopes,
        visibilityWindowsData: visibilityWindowData,
    };
}

// This line is needed for the object name resolver component.
export const actions = { resolveObject };
