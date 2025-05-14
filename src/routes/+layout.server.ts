import type { RequestEvent } from './$types';

// server-side layout, to pass locals data from hook
export function load(event: RequestEvent) {
    return { user: event.locals.user };
}
