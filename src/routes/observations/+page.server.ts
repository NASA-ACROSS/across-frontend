import type { Paginate, PaginateParams } from '$lib/types/Paginate';

import type { Telescope } from '$lib/types/across/Telescope';
import { getTelescopes } from '$lib/utils/across/getTelescopes';
import { resolveObject } from '$lib/utils/across/resolveObject';
import type { RequestEvent } from './$types';
import type { Observation } from '$lib/types/across/Observation';
import searchParams, { type ParamTypes } from '$lib/utils/searchParams/searchParams';
import parseErrorResponse from '$lib/utils/error/parseErrorResponse';
import logger from '$lib/logger';

const DEFAULTS = {
    pageLimit: 20,
    page: 1,
};

type ObservationQueryParams = {
    /** table columns */
    columns?: string[] | null;
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
} & PaginateParams;

// This is not an api param, but is used to select the energy regime in the frontend, so it should be preserved and shared for WYSIWYG
// const excluded_params = ['bandpass_regime'];

/** Confirms Paginate response structure */
const isPaginateResponse = (result: unknown): result is Paginate<Observation> => {
    return (
        typeof result === 'object' &&
        result !== null &&
        'items' in result &&
        Array.isArray(result.items) &&
        'total_number' in result &&
        typeof result.total_number === 'number'
    );
};

const nullObservations = {
    observations: [],
    currentPage: 1,
    totalPages: 1,
    queryParams: {} as ObservationQueryParams,
    urlColumns: [],
    totalCount: 0,
    error: 'Failed to load observations. Please try again later.',
};

export async function load({ url, fetch }: RequestEvent) {
    // const sort = url.searchParams.get('sort') || '';
    // const order = url.searchParams.get('order') || 'asc';

    // Add sorting params if provided
    // if (sort) {
    //     apiParams.append('sort', sort);
    //     apiParams.append('order', order);
    // }

    const paramTypes: ParamTypes<ObservationQueryParams> = {
        schedule_ids: 'array',
        observatory_ids: 'array',
        telescope_ids: 'array',
        instrument_ids: 'array',
        columns: 'array',
    };

    const queryParams = searchParams.deserialize<ObservationQueryParams>(url.searchParams, paramTypes);

    // TODO: pagination defaults needs to be done in a hook or something, since many routes/pages could use it.
    // Or we don't set defaults, and treat it as optional, until a user selects or moves to a different page
    // then it gets set along with the default pageLimit.
    if (queryParams.page) {
        queryParams.page_limit = queryParams.page_limit || DEFAULTS.pageLimit;
    }

    const qp = searchParams.serialize<ObservationQueryParams>(queryParams, paramTypes);

    try {
        // Fetch observations
        const response = await fetch(`/api/observation?${qp}`, { method: 'GET' });

        const result: unknown = await response.json();

        if (!response.ok) {
            const errorMessage = parseErrorResponse(result);

            return {
                ...nullObservations,
                currentPage: queryParams.page || 1,
                queryParams,
                urlColumns: queryParams.columns || [],
                error: errorMessage,
            };
        }

        if (!isPaginateResponse(result)) {
            throw new Error('Invalid API response format for observations');
        }

        const observations = result.items;

        // In a real implementation, the total count might be returned in headers or response metadata
        // For now, we'll estimate based on the returned results
        const totalCount = result.total_number;
        const totalPages = Math.ceil(totalCount / DEFAULTS.pageLimit);

        // Fetch instrument details for mapping IDs to names
        // In a real implementation, you might have a separate endpoint for this
        // For now, we'll create a simple mock mapping
        const telescopes: Telescope[] = await getTelescopes(fetch);

        return {
            observations,
            currentPage: queryParams.page || 1,
            totalPages,
            queryParams,
            urlColumns: queryParams.columns || [],
            telescopes,
            totalCount,
        };
    } catch (err) {
        logger.error({ err }, 'Unknown Error fetching observations');

        return {
            ...nullObservations,
            currentPage: queryParams.page || 1,
            queryParams,
            urlColumns: queryParams.columns || [],
        };
    }
}

export const actions = { resolveObject };
