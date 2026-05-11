import type { LayoutServerLoad } from './$types';
import { CONFIG } from '../config/config';

// server-side layout, to pass locals data from hook
export const load: LayoutServerLoad = ({ locals }) => {
    return { user: locals.user, API_DOCS_URL: CONFIG.ACROSS_SERVER_DOCS_URL };
};
