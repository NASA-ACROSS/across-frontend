// update cookie state when visiting /user/logout before any client load functions run
export function handleLogout(event: any) {
    if (event.url.pathname === '/user/logout') {
        event.cookies.delete('user-login', { path: '/' });
        event.locals.user = undefined;
    }

    return event;
}
