import type { ObservationsResponse } from '$lib/types/across/Observation';
import type { Telescope } from '$lib/types/across/Telescope';
import type { UserCredentialsCookie } from '$lib/types/User/UserCredentialsCookie';
import { getTelescopes } from '$lib/utils/across/getTelescopes';
import { CONFIG } from '../../config/config';
import type { RequestEvent } from './$types';
import type { PageServerLoad } from './$types';

const DEFAULTS = {
    pageLimit: 20,
    page: 1,
};

type ObservationQueryParams = {
    external_id?: string;
    schedule_ids?: string[];
    observatory_ids?: string[];
    telescope_ids?: string[];
    instrument_ids?: string[];
    status?: string;
    proposal?: string;
    object_name?: string;
    date_range_begin?: string;
    date_range_end?: string;
    bandpass_min?: string | number;
    bandpass_max?: string | number;
    bandpass_type?: string;
    cone_search_ra?: string | number;
    cone_search_dec?: string | number;
    cone_search_radius?: string | number;
    type?: string;
    depth_value?: string | number;
    depth_unit?: string;
};

export const load: PageServerLoad = async ({ fetch, url, locals, cookies }: RequestEvent) => {
    // Extract query parameters
    const page = Number(url.searchParams.get('page')) || 1;
    const sort = url.searchParams.get('sort') || '';
    const order = url.searchParams.get('order') || 'asc';

    // Extract column preferences from URL if present
    const urlColumns = url.searchParams.get('columns')?.split(',') || [];

    // Build query params object for the API call
    const queryParams: ObservationQueryParams = {};

    // Single value params
    if (url.searchParams.has('external_id')) queryParams.external_id = url.searchParams.get('external_id') || undefined;
    if (url.searchParams.has('status')) queryParams.status = url.searchParams.get('status') || undefined;
    if (url.searchParams.has('proposal')) queryParams.proposal = url.searchParams.get('proposal') || undefined;
    if (url.searchParams.has('object_name')) queryParams.object_name = url.searchParams.get('object_name') || undefined;
    if (url.searchParams.has('date_range_begin')) queryParams.date_range_begin = url.searchParams.get('date_range_begin') || undefined;
    if (url.searchParams.has('date_range_end')) queryParams.date_range_end = url.searchParams.get('date_range_end') || undefined;
    if (url.searchParams.has('bandpass_min')) queryParams.bandpass_min = url.searchParams.get('bandpass_min') || undefined;
    if (url.searchParams.has('bandpass_max')) queryParams.bandpass_max = url.searchParams.get('bandpass_max') || undefined;
    if (url.searchParams.has('bandpass_type')) queryParams.bandpass_type = url.searchParams.get('bandpass_type') || undefined;
    if (url.searchParams.has('cone_search_ra')) queryParams.cone_search_ra = url.searchParams.get('cone_search_ra') || undefined;
    if (url.searchParams.has('cone_search_dec')) queryParams.cone_search_dec = url.searchParams.get('cone_search_dec') || undefined;
    if (url.searchParams.has('cone_search_radius')) queryParams.cone_search_radius = url.searchParams.get('cone_search_radius') || undefined;
    if (url.searchParams.has('type')) queryParams.type = url.searchParams.get('type') || undefined;
    if (url.searchParams.has('depth_value')) queryParams.depth_value = url.searchParams.get('depth_value') || undefined;
    if (url.searchParams.has('depth_unit')) queryParams.depth_unit = url.searchParams.get('depth_unit') || undefined;

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
                apiParams.append(key, String(value));
            }
        }
    });

    // Add pagination params
    apiParams.append('page_limit', DEFAULTS.pageLimit.toString()); // Number of results per page
    apiParams.append('page', String(page));

    // Add sorting params if provided
    if (sort) {
        apiParams.append('sort', sort);
        apiParams.append('order', order);
    }
    console.log('apiParams', apiParams);

    apiUrl += apiParams.toString();

    console.log('apiUrl', apiUrl);

    try {
        // Fetch observations
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
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

        console.log(observations.length);

        return {
            observations,
            currentPage: page,
            totalPages,
            queryParams,
            urlColumns,
            telescopes,
        };
    } catch (error) {
        console.error('Error fetching observations:', error);

        return {
            observations: [],
            currentPage: 1,
            totalPages: 1,
            queryParams: {},
            urlColumns: [],
            error: 'Failed to load observations. Please try again later.',
        };
    }
};
