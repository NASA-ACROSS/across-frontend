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
    const failureType = url.searchParams.get('failure_type');
    const status = Number(url.searchParams.get('status') || undefined);

    if (!failureType && !status) {
        return Promise.resolve(
            new Response(
                JSON.stringify({
                    secretFormula: '🎶Deedot-diddlee-dot-diddlee-dotdotdot-daaa🎶 the Krabby Patty secret formula is...',
                }),
                {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
                }
            )
        );
    }

    if (failureType === 'request_failure') {
        return Promise.resolve(
            new Response(
                JSON.stringify({
                    detail: 'Barnacles, Plankton got stepped on before he could get to the Krabby Patty secret formula.',
                }),
                {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' },
                }
            )
        );
    }

    if (isNaN(status)) {
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

    const errorMsg = mappedErrors[status];
    return Promise.resolve(
        new Response(JSON.stringify({ detail: errorMsg } as AcrossApiErrorResponseBody), {
            status,
            headers: { 'Content-Type': 'application/json' },
        })
    );
};

export const getKrabbyPattySecretFormula = async (failureType?: string, status?: number): Promise<string> => {
    const qp = new URLSearchParams();
    if (failureType) qp.set('failure_type', failureType);
    if (status) qp.set('status', status.toString());

    const route = `/krabby-patty-secret-formula${qp.toString() ? `?${qp}` : ''}`;

    const { data } = await callApi<string>(overrideFetch, route, {
        method: 'GET',
    });

    return data;
};
