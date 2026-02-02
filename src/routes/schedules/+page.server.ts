import type { SchedulesResponse } from '$lib/types/across/Schedule';
import type { Telescope } from '$lib/types/across/Telescope';
import type { UserCredentialsCookie } from '$lib/types/User/UserCredentialsCookie';
import { getTelescopes } from '$lib/utils/across/getTelescopes';
import { CONFIG } from '../../config/config';
import type { RequestEvent } from './$types';

const DEFAULTS = {
    pageLimit: 20,
    page: 1,
};

type ScheduleQueryParams = {
    external_id?: string | null;
    name?: string | null;
    observatory_ids?: string[] | null;
    telescope_ids?: string[] | null;
    status?: string | null;
    fidelity?: string | null;
    date_range_begin?: string | null;
    date_range_end?: string | null;
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
    const queryParams: ScheduleQueryParams = {} as ScheduleQueryParams;

    // Single value params
    if (url.searchParams.has('external_id')) queryParams.external_id = url.searchParams.get('external_id');
    if (url.searchParams.has('status')) queryParams.status = url.searchParams.get('status');
    if (url.searchParams.has('name')) queryParams.name = url.searchParams.get('name');
    if (url.searchParams.has('date_range_begin')) queryParams.date_range_begin = url.searchParams.get('date_range_begin');
    if (url.searchParams.has('date_range_end')) queryParams.date_range_end = url.searchParams.get('date_range_end');
    if (url.searchParams.has('fidelity')) queryParams.fidelity = url.searchParams.get('fidelity');

    // Array params
    queryParams.observatory_ids = url.searchParams.get('observatory_ids')?.split(',') || [];
    queryParams.telescope_ids = url.searchParams.get('telescope_ids')?.split(',') || [];

    // Build API URL with parameters
    let apiUrl = `${CONFIG.API_URL}/schedule/?`;
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
                schedules: [],
                currentPage: 1,
                totalPages: 1,
                queryParams: {} as ScheduleQueryParams,
                urlColumns: [],
                error: knownError,
            };
        }

        const schedulesResponse = (await response.json()) as SchedulesResponse;
        const schedules = schedulesResponse.items;

        // In a real implementation, the total count might be returned in headers or response metadata
        // For now, we'll estimate based on the returned results
        const totalCount = schedulesResponse.total_number;
        const totalPages = Math.ceil(totalCount / DEFAULTS.pageLimit);

        // Fetch instrument details for mapping IDs to names
        // In a real implementation, you might have a separate endpoint for this
        // For now, we'll create a simple mock mapping
        const userCookie = locals?.user as UserCredentialsCookie;
        const telescopes: Telescope[] = await getTelescopes(userCookie, cookies);

        return {
            schedules,
            currentPage: page,
            totalPages,
            queryParams,
            urlColumns,
            telescopes,
            totalCount,
        };
    } catch (error) {
        console.error('Error fetching schedules:', error);

        return {
            schedules: [],
            currentPage: 1,
            totalPages: 1,
            queryParams: {} as ScheduleQueryParams,
            urlColumns: [],
            totalCount: 0,
            error: 'Failed to load schedules. Please try again later.',
        };
    }
}
