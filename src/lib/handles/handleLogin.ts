// propagate user cookie data into event response to be consumed by client application
export function handleLogin(event: any) {
    const user = event.cookies.get('user-login');
    if (user) {
        event.locals.user = JSON.parse(user);
    }
    return event;
}
