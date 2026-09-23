/**
 * Handles HTTP redirect responses by setting appropriate
 * cache control headers. We ensure that redirect responses are revalidated
 * on each request, preventing stale redirect chains and allowing dynamic redirect updates.
 */
export function handleRedirect(response: Response) {
    const isRedirect = response.status >= 300 && response.status <= 308;
    if (isRedirect) {
        response.headers.set('Cache-Control', 'no-store');
    }

    return response;
}
