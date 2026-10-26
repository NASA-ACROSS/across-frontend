import { clearAuth } from '#lib/handles/clearAuth.js';
import type { RequestEvent } from './$types';

export function load(event: RequestEvent) {
    clearAuth(event);
}
