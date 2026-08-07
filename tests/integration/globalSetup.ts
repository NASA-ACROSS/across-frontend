import { MockServerContainer } from '@mockserver/testcontainers';
import { mockServerClient } from 'mockserver-client';

// Pinned to a specific stable tag (rather than `latest`) to keep CI/local runs reproducible.
// Kept in lockstep with the `mockserver-client`/`@mockserver/testcontainers` npm versions in package.json.
const MOCKSERVER_IMAGE = 'mockserver/mockserver:7.6.0';

let container: Awaited<ReturnType<typeof MockServerContainer.start>> | undefined;

/**
 * Playwright global setup: starts a single MockServer container for the whole test run and
 * points the SvelteKit app at it, so all integration tests hit MockServer instead of the real
 * ACROSS server.
 *
 * Runs *before* `webServer` is spawned, and the env vars set here are inherited by that process
 * (see https://playwright.dev/docs/test-global-setup-teardown), which is how the app picks up
 * the container's dynamically-mapped port without any source changes beyond the
 * `ACROSS_SERVER_HOST` override in `src/config/config.ts`.
 *
 * Individual tests do not talk to this container directly - see
 * tests/integration/fixtures/mock-server.fixture.ts for the per-test client.
 */
export default async function globalSetup(): Promise<() => Promise<void>> {
    container = await MockServerContainer.start({
        image: MOCKSERVER_IMAGE,
        serverPort: Number(process.env.MOCKSERVER_PORT),
    });

    const specUrlOrPayload = process.env.ACROSS_OPENAPI_SPEC_URL;
    if (specUrlOrPayload) {
        const client = container.getClient() as ReturnType<typeof mockServerClient>;

        // Generates a baseline expectation (with a schema/example-derived response) for every
        // operation in the real ACROSS server's OpenAPI spec. These are global (no `namespace`),
        // so they act as a fallback for any request a test doesn't explicitly mock - individual
        // tests then only need to set up expectations for the specific responses they care about.
        await client.openAPIExpectation({ specUrlOrPayload });
    }

    return async () => {
        await container?.stop();
    };
}
