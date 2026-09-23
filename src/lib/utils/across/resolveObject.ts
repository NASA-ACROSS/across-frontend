import { fail, isHttpError, type ActionFailure, type RequestEvent } from '@sveltejs/kit';
import type { NameResolver } from '$lib/types/across/NameResolver';
import type { FormSubmitResult } from '$lib/types/form/FormSubmitResult';
import HTTP_CODES from '$lib/utils/HttpCodes';
import searchParams from '../searchParams/searchParams';
import { callApi } from './callApi';

type ResolveObjectResult = FormSubmitResult & {
    resolvedObject: NameResolver;
};

/**
 * SvelteKit action that resolves a object name to coordinates using the ACROSS API.
 *
 * @param request - SvelteKit action request.
 * @param locals - SvelteKit locals (for user session data).
 * @param cookies - SvelteKit cookies helper.
 */
export const resolveObject = async ({ request, fetch }: RequestEvent): Promise<ResolveObjectResult | ActionFailure<FormSubmitResult>> => {
    const objectName = (await request.formData()).get('objectName') as string;

    if (!objectName?.trim()) {
        return fail(400, {
            type: 'error',
            message: 'Object name is required',
            errorId: crypto.randomUUID(),
            code: HTTP_CODES[400],
        });
    }

    try {
        const qp = searchParams.serialize({ object_name: objectName });
        const route = `/tools/resolve-object?${qp.toString()}`;

        const { data: resolvedObject } = await callApi<NameResolver>(fetch, route, {
            method: 'GET',
        });

        return { type: 'success', resolvedObject };
    } catch (error: unknown) {
        if (isHttpError(error)) {
            return fail(error.status, {
                type: 'error',
                message: 'Failed to resolve object name.',
                errorId: error.body.errorId,
                code: error.body.code,
            });
        }

        throw error;
    }
};
