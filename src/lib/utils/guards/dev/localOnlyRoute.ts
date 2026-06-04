import { PUBLIC_CONFIG } from '$config/config.public';
import { error } from '@sveltejs/kit';
import HTTP_CODES from '../../HttpCodes';

export const localOnlyRoute = () => {
    if (!PUBLIC_CONFIG.IS_LOCAL) {
        error(404, {
            message: 'Not Found',
            errorId: crypto.randomUUID(),
            code: HTTP_CODES[404],
        });
    }
};
