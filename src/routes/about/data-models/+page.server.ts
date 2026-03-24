import { CONFIG } from '$config/config';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
    return {
        API_DOCS_URL: CONFIG.API_DOCS_URL,
    };
};
