import type { AcrossApiErrorResponse } from '$lib/types/error/AcrossApiErrorResponse';
import searchParams from '$lib/utils/searchParams/searchParams';
import { type RequestHandler, error } from '@sveltejs/kit';
import HTTP_CODES from '$lib/utils/HttpCodes';

const mappedErrors: Record<number, string> = {
    401: "You're definitely not Mr. Krabs.",
    403: "You might be Mr. Krabs, but you still don't have access to the secret formula. Are you sure you're the real Mr. Krabs?",
    404: "The Krabby Patty secret formula...IT'S GONE!",
    500: 'Wee-Snaw',
};

export const GET: RequestHandler = ({ url }) => {
    const qp = searchParams.serialize({
        ...Object.fromEntries(url.searchParams.entries()),
    });

    const failureType = qp.get('failure_type');
    const status = Number(qp.get('status') || undefined);

    if (!failureType && !status) {
        return new Response(
            JSON.stringify({
                secretFormula: '🎶Deedot-diddlee-dot-diddlee-dotdotdot-daaa🎶 the Krabby Patty secret formula is...',
            }),
            { status: 200 }
        );
    }

    if (failureType === 'request_failure') {
        return error(500, {
            message: 'Barnacles, Plankton got stepped on before he could get to the Krabby Patty secret formula.',
            errorId: crypto.randomUUID(),
            code: HTTP_CODES[500],
        });
    }

    if (isNaN(status)) {
        return error(400, {
            message: 'Invalid status code',
            errorId: crypto.randomUUID(),
            code: HTTP_CODES[400],
        });
    }

    const errorMsg = mappedErrors[status];
    return new Response(JSON.stringify({ detail: errorMsg } as AcrossApiErrorResponse), { status });
};
