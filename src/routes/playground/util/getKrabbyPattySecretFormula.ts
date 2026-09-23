import { callApi } from '$lib/utils/across/callApi';
import type { AcrossApiErrorResponseBody } from '$lib/types/error/AcrossApiErrorResponseBody';

const mappedErrors: Record<number, string> = {
    401: "You're definitely not Mr. Krabs.",
    403: "You might be Mr. Krabs, but you still don't have access to the secret formula. Are you sure you're the real Mr. Krabs?",
    404: "The Krabby Patty secret formula...IT'S GONE!",
    500: 'Wee-Snaw',
};

const toUrl = (input: RequestInfo | URL): URL => {
    if (typeof input === 'string') return new URL(input);
    if (input instanceof URL) return input;
    return new URL(input.url);
};

// Playground-only mock fetch that simulates behavior of calling the ACROSS API.
const overrideFetch: typeof window.fetch = (input: RequestInfo | URL): Promise<Response> => {
    const url = toUrl(input);
    const status = Number(url.searchParams.get('status') || undefined);

    const defaultResponse = new Response(
        JSON.stringify({
            secretFormula: '🎶Deedot-diddlee-dot-diddlee-dotdotdot-daaa🎶 the Krabby Patty secret formula is...',
        }),
        {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        }
    );

    if (!status) return Promise.resolve(defaultResponse);

    switch (status) {
        case 200:
            return Promise.resolve(defaultResponse);
        case 201:
            return Promise.resolve(
                new Response(
                    JSON.stringify({
                        message: 'Created',
                    }),
                    {
                        status: 201,
                        headers: { 'Content-Type': 'application/json' },
                    }
                )
            );
        case 204:
            return Promise.resolve(
                new Response(null, {
                    status: 204,
                })
            );
        case 401:
        case 403:
        case 404:
        case 500:
            const errorMsg = mappedErrors[status];
            return Promise.resolve(
                new Response(JSON.stringify({ detail: errorMsg } as AcrossApiErrorResponseBody), {
                    status,
                    headers: { 'Content-Type': 'application/json' },
                })
            );
        default:
            return Promise.resolve(
                new Response(
                    JSON.stringify({
                        detail: 'Invalid status code',
                    }),
                    {
                        status: 400,
                        headers: { 'Content-Type': 'application/json' },
                    }
                )
            );
    }
};

export const getKrabbyPattySecretFormula = async (status?: number) => {
    const qp = new URLSearchParams();
    if (status) qp.set('status', status.toString());

    const route = `/krabby-patty-secret-formula${qp.toString() ? `?${qp}` : ''}`;

    const { data } = await callApi(overrideFetch, route, {
        method: 'GET',
    });

    // disable since this is mocked behavior and it depends on the incoming status code.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return data;
};
