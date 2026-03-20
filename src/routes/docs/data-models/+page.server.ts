import { CONFIG } from '$config/config';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
    return {
        apiDocsUrl: CONFIG.API_DOCS_URL,
    };
};
