<<<<<<< HEAD
import { GenericContainer, Wait } from 'testcontainers';

process.loadEnvFile('.env.test');

export default async function globalSetup() {
    // Pinned to a specific stable tag (rather than `latest`) to keep CI/local runs reproducible.
    // Kept in lockstep with the `mockserver-client`/`@mockserver/testcontainers` npm versions in package.json.
    const image = 'mockserver/mockserver:7.6.0';
    const port = Number(process.env.ACROSS_SERVER_PORT);

    const container = await new GenericContainer(image)
        .withExposedPorts({ container: port, host: port })
        .withAutoCleanup(true)
        .withWaitStrategy(Wait.forHttp('/mockserver/status', port).withMethod('PUT').forStatusCode(200))
        .start();

    return async () => {
        await container.stop();
    };
}
=======
// import { mockServerClient } from 'mockserver-client';

// /**
//  * Playwright global setup: starts a single MockServer container for the whole test run and
//  * points the SvelteKit app at it, so all integration tests hit MockServer instead of the real
//  * ACROSS server.
//  */
// export default async function globalSetup() {
//     const specUrlOrPayload = process.env.ACROSS_OPENAPI_SPEC_URL;
//     if (specUrlOrPayload) {
//         const client = mockServerClient('localhost', Number(process.env.ACROSS_SERVER_PORT));

//         // Generates a baseline expectation (with a schema/example-derived response) for every
//         // operation in the real ACROSS server's OpenAPI spec. These are global (no `namespace`),
//         // so they act as a fallback for any request a test doesn't explicitly mock - individual
//         // tests then only need to set up expectations for the specific responses they care about.
//         await client.openAPIExpectation({ specUrlOrPayload });
//     }
// }
>>>>>>> a0ff428 (feat(test): add mockserver for mocking ACROSS server)
