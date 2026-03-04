import type { Telescope } from '$lib/types/across/Telescope';

type GetTelescopesParams = {
    id?: string;
    name?: string;
};

export const getTelescopes = async (fetch: typeof window.fetch) => {
    const options: RequestInit = {
        method: 'GET',
    };

    let response;
    try {
        response = await fetch(requestUrl, options);
    } catch (e) {
        console.error(`ERROR: catch getting telescopes at [${Date.now()}]`, JSON.stringify(e));
        throw new Error('Unexpected Error while fetching telescopes');
    }

    // catch known errors from api and hide error from user
    const errorCodes = [500, 404, 401];
    if (errorCodes.includes(response.status)) {
        const errorText = `ERROR: getting telescopes at [${Date.now()}] with status code [${response.status}]`;
        console.error(errorText);
        throw new Error(errorText);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    let telescopes: Telescope[] = await response.json();

    if (!Array.isArray(telescopes)) {
        telescopes = [telescopes];
    }

    return telescopes;
};
