import type { ObservationsResponse } from '$lib/types/across/Observation';
import type { Telescope } from '$lib/types/across/Telescope';
import type { UserCredentialsCookie } from '$lib/types/User/UserCredentialsCookie';
import { getTelescopes } from '$lib/utils/across/getTelescopes';
import { CONFIG } from '../../config/config';
import type { RequestEvent } from './$types';

const DEFAULTS = {
    pageLimit: 20,
    page: 1,
};

type ObservationQueryParams = {
    external_id?: string | null;
    schedule_ids?: string[] | null;
    observatory_ids?: string[] | null;
    telescope_ids?: string[] | null;
    instrument_ids?: string[] | null;
    status?: string | null;
    proposal?: string | null;
    object_name?: string | null;
    date_range_begin?: string | null;
    date_range_end?: string | null;
    bandpass_min?: string | number | null;
    bandpass_max?: string | number | null;
    bandpass_type?: string | null;
    bandpass_regime?: string | null;
    cone_search_ra?: string | number | null;
    cone_search_dec?: string | number | null;
    cone_search_radius?: string | number | null;
    type?: string | null;
    depth_value?: string | number | null;
    depth_unit?: string | null;
};

type ErrorResponse = {
    detail: string;
};

const knownErrors = [
    'Cone search parameters are not complete. Please provide all cone search parameters.',
    'Depth parameters are not complete. Please provide all depth parameters.',
    'Bandpass parameters are not complete. Please provide all bandpass parameters.',
    'Max wavelength cannot be less than min wavelength.',
    'Frequency values must be positive.',
    'Energy values must be positive.',
    'Wavelength values must be positive.',
];

// This is not an api param, but is used to select the energy regime in the frontend, so it should be preserved and shared for WYSIWYG
const excluded_params = ['bandpass_regime'];

const isKnownError = (errorText: string): string => {
    for (const knownError of knownErrors) {
        if (errorText.includes(knownError)) {
            return knownError;
        }
    }
    return 'There was an error processing the request, please modify your selection and try again';
};

export async function load({ url, locals, cookies }: RequestEvent) {
    // Extract query parameters
    const page = Number(url.searchParams.get('page')) || 1;
    // const sort = url.searchParams.get('sort') || '';
    // const order = url.searchParams.get('order') || 'asc';

    // Extract column preferences from URL if present
    const urlColumns = url.searchParams.get('columns')?.split(',') || [];

    // Build query params object for the API call
    const queryParams: ObservationQueryParams = {} as ObservationQueryParams;

    // Single value params
    if (url.searchParams.has('external_id')) queryParams.external_id = url.searchParams.get('external_id');
    if (url.searchParams.has('status')) queryParams.status = url.searchParams.get('status');
    if (url.searchParams.has('proposal')) queryParams.proposal = url.searchParams.get('proposal');
    if (url.searchParams.has('object_name')) queryParams.object_name = url.searchParams.get('object_name');
    if (url.searchParams.has('date_range_begin')) queryParams.date_range_begin = url.searchParams.get('date_range_begin');
    if (url.searchParams.has('date_range_end')) queryParams.date_range_end = url.searchParams.get('date_range_end');
    if (url.searchParams.has('bandpass_min')) queryParams.bandpass_min = url.searchParams.get('bandpass_min');
    if (url.searchParams.has('bandpass_max')) queryParams.bandpass_max = url.searchParams.get('bandpass_max');
    if (url.searchParams.has('bandpass_regime')) queryParams.bandpass_regime = url.searchParams.get('bandpass_regime');
    if (url.searchParams.has('bandpass_type')) queryParams.bandpass_type = url.searchParams.get('bandpass_type');
    if (url.searchParams.has('cone_search_ra')) queryParams.cone_search_ra = url.searchParams.get('cone_search_ra');
    if (url.searchParams.has('cone_search_dec')) queryParams.cone_search_dec = url.searchParams.get('cone_search_dec');
    if (url.searchParams.has('cone_search_radius')) queryParams.cone_search_radius = url.searchParams.get('cone_search_radius');
    if (url.searchParams.has('type')) queryParams.type = url.searchParams.get('type');
    if (url.searchParams.has('depth_value')) queryParams.depth_value = url.searchParams.get('depth_value');
    if (url.searchParams.has('depth_unit')) queryParams.depth_unit = url.searchParams.get('depth_unit');

    // Array params
    queryParams.schedule_ids = url.searchParams.get('schedule_ids')?.split(',') || [];
    queryParams.observatory_ids = url.searchParams.get('observatory_ids')?.split(',') || [];
    queryParams.telescope_ids = url.searchParams.get('telescope_ids')?.split(',') || [];
    queryParams.instrument_ids = url.searchParams.get('instrument_ids')?.split(',') || [];

    // Build API URL with parameters
    let apiUrl = `${CONFIG.API_URL}/observation/?`;
    const apiParams = new URLSearchParams();

    // Add all query parameters to API request
    Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined) {
            if (Array.isArray(value)) {
                value.forEach((item) => apiParams.append(key, item));
            } else {
                // only add valid api params
                if (!excluded_params.includes(key)) apiParams.append(key, String(value));
            }
        }
    });

    // Add pagination params
    apiParams.append('page_limit', DEFAULTS.pageLimit.toString()); // Number of results per page
    apiParams.append('page', String(page));

    // Add sorting params if provided
    // if (sort) {
    //     apiParams.append('sort', sort);
    //     apiParams.append('order', order);
    // }

    apiUrl += apiParams.toString();

    try {
        // Fetch observations
        const response = await fetch(apiUrl);

        if (!response.ok) {
            console.log(`API responded with status: ${response.status} for request URL ${apiUrl}`);
            const text = (await response.json()) as ErrorResponse;
            const knownError = isKnownError(text.detail);
            return {
                observations: [],
                currentPage: 1,
                totalPages: 1,
                queryParams: {} as ObservationQueryParams,
                urlColumns: [],
                error: knownError,
            };
        }

        const observationsResponse = (await response.json()) as ObservationsResponse;
        const observations = observationsResponse.items;

        // In a real implementation, the total count might be returned in headers or response metadata
        // For now, we'll estimate based on the returned results
        const totalCount = observationsResponse.total_number;
        const totalPages = Math.ceil(totalCount / DEFAULTS.pageLimit);

        // Fetch instrument details for mapping IDs to names
        // In a real implementation, you might have a separate endpoint for this
        // For now, we'll create a simple mock mapping
        const userCookie = locals?.user as UserCredentialsCookie;
        const telescopes: Telescope[] = await getTelescopes(userCookie, cookies);

        return {
            observations,
            currentPage: page,
            totalPages,
            queryParams,
            urlColumns,
            telescopes,
            totalCount,
            pagination_buttons: CONFIG.PAGINATION_BUTTONS,
        };
    } catch (error) {
        console.error('Error fetching observations:', error);

        return {
            observations: [],
            currentPage: 1,
            totalPages: 1,
            queryParams: {} as ObservationQueryParams,
            urlColumns: [],
            totalCount: 0,
            error: 'Failed to load observations. Please try again later.',
        };
    }
}
