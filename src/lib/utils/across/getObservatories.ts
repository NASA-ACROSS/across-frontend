import { CONFIG } from '../../../config/config';
import type { Observatory } from '$lib/types/across/Observatory';

type GetObservatoriesParams = {
    id?: string;
    name?: string;
};

export const getObservatories = async (fetch: typeof window.fetch) => {
    const options: RequestInit = {
        method: 'GET',
    };

    const apiUrl = `${CONFIG.API_URL}/observatory/`;
    let requestUrl = apiUrl;

    if (params?.id) {
        requestUrl = `${apiUrl}${params.id}`;
    } else if (params) {
        const apiParams = new URLSearchParams();
        // Add all query parameters to API request
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined) {
                apiParams.append(key, String(value));
            }
        });

        requestUrl = `${apiUrl}?${apiParams.toString()}`;
    }

    let response;
    try {
        response = await fetch(requestUrl, options);
    } catch (e) {
        console.error(`ERROR: catch getting observatories at [${Date.now()}]`, JSON.stringify(e));
        throw new Error('Unexpected Error while fetching observatories');
    }

    // catch known errors from api and hide error from user
    const errorCodes = [500, 404, 401];
    if (errorCodes.includes(response.status)) {
        console.error(`ERROR: getting observatories at [${Date.now()}] with status code [${response.status}]`);
    }

    const observatories = (await response.json()) as Observatory[];

    return observatories;
};
