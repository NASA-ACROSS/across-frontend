import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { HTTP_CODES } from '#lib';

export const load: PageServerLoad = () => {
    error(418, 'I Am A Teapot', {
        errorId: crypto.randomUUID(),
        code: HTTP_CODES[418],
    });
};
