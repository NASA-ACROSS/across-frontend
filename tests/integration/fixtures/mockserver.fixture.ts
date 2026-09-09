import { test as base, expect } from '@playwright/test';
import { mockServerClient, type MockServerClient } from 'mockserver-client';
import type { Paginate } from '$lib/types/Paginate';

type MockHttpOptions = {
    /** @default 'GET' */
    method?: string;
    /** @default 200 */
    status?: number;
};

type MockOptions = {
    /** @default false */
    pagination?: boolean;
    /**
     * Whether to use the test's namespace for this mock per test.
     * @default true
     */
    useNamespace?: boolean;
};

export type MockServerFixture = {
    /**
     * Raw `mockserver-client` instance, for advanced or stateful expectation authoring directly
     * in a test (e.g. sequential/scenario-based responses via `scenarioName`/`scenarioState`/
     * `newScenarioState`). Namespace this test's own expectations with `namespace: testId` so they
     * don't leak into other tests running in parallel.
     */
    client: MockServerClient;

    /** Unique id for this test - use as the `namespace` (and `scenarioName` prefix) for expectations. */
    testId: string;

    /**
     * Register a simple JSON response for a path, scoped to this test's namespace. For larger or
     * complex fake datasets, colocate a sibling file next to the test (e.g.
     * `schedules.mock-data.json`) and pass its contents as `body` here instead of inlining large
     * objects. For stateful/multi-call scenarios, use `client.mockAnyResponse(...)` directly.
     */
    mockJson<T>(path: string, body: T | T[], mockOptions?: MockOptions, options?: MockHttpOptions): Promise<void>;
};

type Fixtures = {
    mockServer: MockServerFixture;
};

/**
 * MockServer's built-in multi-tenancy header. Every expectation created through this fixture is
 * scoped to `namespace: testId`, and every request from this test's `page`/`context` carries this
 * header (forwarded to the ACROSS server call by `handleFetch` in src/hooks.server.ts). This is
 * what lets tests share a single MockServer instance while running fully in parallel: a request
 * in namespace T only matches namespace-T expectations plus any global (no-namespace) ones (e.g.
 * the OpenAPI-derived baseline expectations loaded in tests/integration/mockserver/global-setup.ts)
 * - never another test's namespace.
 * See https://www.mock-server.com/mock_server/configuration_properties.html#button_configuration_match_namespace_header (Multi-Tenancy).
 */
const MOCKSERVER_NAMESPACE_HEADER = process.env.MOCKSERVER_NAMESPACE_HEADER;

if (!MOCKSERVER_NAMESPACE_HEADER) {
    throw new Error('MOCKSERVER_NAMESPACE_HEADER is not set. Ensure it is defined in the environment variables.');
}

const paginate = async <T>(client: MockServerClient, path: string, items: T[], namespace?: string) => {
    const pageLimit = Number(process.env.PUBLIC_DEFAULT_PAGE_LIMIT ?? 10);
    const pages = Math.ceil(items.length / pageLimit);

    // Set default page load w/o page query parameter to first page.
    await client.mockAnyResponse({
        namespace,
        httpRequest: { method: 'GET', path },
        httpResponse: {
            statusCode: 200,
            headers: { 'content-type': ['application/json'] },
            body: JSON.stringify({
                page: 1,
                page_limit: pageLimit,
                total_number: items.length,
                items: items.slice(0, pageLimit),
            } satisfies Paginate<T>),
        },
        times: { unlimited: true },
        priority: -1,
    });

    for (const page of Array.from({ length: pages }, (_, i) => i)) {
        await client.mockAnyResponse({
            namespace,
            httpRequest: { method: 'GET', path, queryStringParameters: { page: String(page + 1) } },
            httpResponse: {
                statusCode: 200,
                headers: { 'content-type': ['application/json'] },
                body: JSON.stringify({
                    page: page + 1,
                    page_limit: pageLimit,
                    total_number: items.length,
                    items: items.slice(page * pageLimit, (page + 1) * pageLimit),
                } satisfies Paginate<T>),
            },
            times: { unlimited: true },
        });
    }
};

export const test = base.extend<Fixtures>({
    // Overrides built-in `context` fixture to add the MockServer multi-tenancy header to every request.
    context: async ({ context }, use, testInfo) => {
        await context.setExtraHTTPHeaders({ [MOCKSERVER_NAMESPACE_HEADER]: testInfo.testId });
        await use(context);
    },

    mockServer: async ({}, use, testInfo) => {
        const port = process.env.ACROSS_SERVER_PORT;

        if (!port) throw new Error('ACROSS_SERVER_PORT env var is not set.');

        const testId = testInfo.testId;
        const client = mockServerClient('localhost', Number(port));

        const mockJson: MockServerFixture['mockJson'] = async (path, body, mockOptions = {}, options = {}) => {
            const { pagination = false, useNamespace = true } = mockOptions;

            const namespace = useNamespace ? testId : undefined;

            if (pagination && Array.isArray(body)) {
                await paginate(client, path, body, namespace);
            } else {
                await client.mockAnyResponse({
                    namespace: useNamespace ? namespace : undefined,
                    httpRequest: {
                        method: options.method ?? 'GET',
                        path,
                    },
                    httpResponse: {
                        statusCode: options.status ?? 200,
                        headers: { 'content-type': ['application/json'] },
                        body: JSON.stringify(body),
                    },
                    times: { unlimited: true },
                });
            }
        };

        await use({ client, testId, mockJson });

        // Scoped cleanup: only this test's namespace (expectations + logs) is cleared, leaving the
        // global OpenAPI-derived baseline expectations and other tests' namespaces untouched. The
        // typed client doesn't expose the `namespace` query param on `clear()`, so call the REST
        // API directly - see https://www.mock-server.com/mock_server/configuration_properties.html
        await fetch(`http://localhost:${port}/mockserver/clear?type=ALL&namespace=${encodeURIComponent(testId)}`, {
            method: 'PUT',
        });
    },
});

export { expect };
