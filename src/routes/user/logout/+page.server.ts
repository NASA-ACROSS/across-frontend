import { clearAuth } from '$lib/handles/clearAuth';
import type { RequestEvent } from './$types';

export function load(event: RequestEvent) {
    clearAuth(event);
}
