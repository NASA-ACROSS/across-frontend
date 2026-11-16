import crypto from 'crypto';
import HttpCodes from '#lib/utils/HttpCodes.ts';
import { PUBLIC_CONFIG } from '#config/config.public.js';
import { error } from '@sveltejs/kit';

export const localOnlyRoute = () => {
    if (!PUBLIC_CONFIG.IS_LOCAL) {
        error(404, 'Not Found', {
            code: HttpCodes[404],
            errorId: crypto.randomUUID(),
        });
    }
};
