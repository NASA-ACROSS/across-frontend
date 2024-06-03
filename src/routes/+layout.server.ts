// server-side layout, to pass locals data from hook
export function load(event) {
    return { user: event.locals.user };
}
