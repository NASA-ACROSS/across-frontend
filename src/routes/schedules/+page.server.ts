import type { Paginate } from '$lib/types/Paginate';
import type { Telescope } from '$lib/types/across/Telescope';
import { getTelescopes } from '$lib/utils/across/getTelescopes';
import type { RequestEvent } from './$types';
import type { Schedule } from '$lib/types/across/Schedule';
import { PUBLIC_CONFIG } from '$config/config.public';
import { callApi } from '$lib/utils/across/callApi';
import { isHttpError } from '@sveltejs/kit';

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
const excludedParams = ['bandpass_regime'];

const isKnownError = (errorText: string): string | undefined => {
    for (const knownError of knownErrors) {
        if (errorText.includes(knownError)) {
            return knownError;
        }
    }
};

export async function load({ url, fetch }: RequestEvent) {
    // Extract query parameters
    const page = Number(url.searchParams.get('page')) || 1;

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
    let route = `/schedule`;
    const qp = new URLSearchParams();

    Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined) {
            if (Array.isArray(value)) {
                value.forEach((item) => qp.append(key, item));
            } else {
                // only add valid api params
                if (!excludedParams.includes(key)) qp.append(key, String(value));
            }
        }
    });

    // Add pagination params
    qp.append('page_limit', PUBLIC_CONFIG.DEFAULT_PAGE_LIMIT.toString()); // Number of results per page
    qp.append('page', String(page));

    route += `?${qp.toString()}`;

    try {
        // Fetch schedules
        const { data: schedulesResponse } = await callApi<Paginate<Schedule>>(fetch, route);

        const schedules = schedulesResponse.items;

        const resultTotalCount = schedulesResponse.total_number;
        const resultPageLimit = schedulesResponse.page_limit || PUBLIC_CONFIG.DEFAULT_PAGE_LIMIT;
        const totalPages = Math.ceil(resultTotalCount / resultPageLimit);

        const telescopes: Telescope[] = await getTelescopes(fetch);

        return {
            schedules,
            currentPage: page,
            totalPages,
            queryParams,
            urlColumns,
            telescopes,
            totalCount: resultTotalCount,
        };
    } catch (err) {
        if (isHttpError(err)) {
            const knownError = isKnownError(err.body.message);

            return {
                schedules: [],
                currentPage: 1,
                totalPages: 1,
                queryParams: {} as ScheduleQueryParams,
                urlColumns: [],
                error: knownError || err.body.message,
                errorId: err.body.errorId,
                code: err.body.code,
            };
        }

        throw err;
    }
}
