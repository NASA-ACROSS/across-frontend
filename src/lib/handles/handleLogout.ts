import type { UserCredentialsCookie } from "$lib/types/UserCredentialsCookie";
import type { RequestEvent } from "@sveltejs/kit";

// update cookie state when visiting /user/logout before any client load functions run
export function handleLogout(event: RequestEvent & { locals: { user: UserCredentialsCookie | undefined } }) {
    if (event.url.pathname === '/user/logout') {
        event.cookies.delete('user-login', { path: '/' });
        event.locals.user = undefined;
    }

    return event;
}
