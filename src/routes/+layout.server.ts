import type { RequestEvent } from './$types';
import { CONFIG } from '../config/config';

// server-side layout, to pass locals data from hook
export function load(event: RequestEvent) {
    return { user: event.locals.user, API_DOCS_URL: CONFIG.API_DOCS_URL };
}
