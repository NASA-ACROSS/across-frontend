// tests/integration/mockserver/start-web-server.ts
import { GenericContainer, Wait } from 'testcontainers';
import { mockServerClient, type OpenAPIExpectation } from 'mockserver-client';
import dotenv from 'dotenv';

dotenv.config({
    path: [`.env.test`],
});

// Pinned to a specific stable tag (rather than `latest`) to keep CI/local runs reproducible.
// Kept in lockstep with the `mockserver-client`/`@mockserver/testcontainers` npm versions in package.json.
const MOCKSERVER_IMAGE = 'mockserver/mockserver:7.6.0';
const MOCKSERVER_PORT = Number(process.env.ACROSS_SERVER_PORT);

const container = await new GenericContainer(MOCKSERVER_IMAGE)
    .withExposedPorts({ container: MOCKSERVER_PORT, host: MOCKSERVER_PORT })
    .withAutoCleanup(true)
    .withWaitStrategy(Wait.forHttp('/mockserver/status', MOCKSERVER_PORT).withMethod('PUT').forStatusCode(200))
    .start();

const specUrlOrPayload = process.env.ACROSS_OPENAPI_SPEC_URL;
if (specUrlOrPayload) {
    const client = mockServerClient('localhost', MOCKSERVER_PORT);
    await client.openAPIExpectation({ specUrlOrPayload } as OpenAPIExpectation);
}

const shutdown = () => {
    container
        .stop()
        .then(() => process.exit(0))
        .catch((err) => {
            console.error('Error stopping mockserver container:', err);
            process.exit(1);
        });
};
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

console.log(`MockServer running on http://localhost:${MOCKSERVER_PORT}`);
setInterval(() => {}, 1 << 30); // keep the process alive for the whole Playwright run
