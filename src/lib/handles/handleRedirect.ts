// set response headers to no-cache for redirects
export function handleRedirect(response: Response) {
    const isRedirect = response.status >= 300 || response.status <= 308;
    if (isRedirect) {
        response.headers.set('Cache-Control', 'no-cache');
    }

    return response;
}
