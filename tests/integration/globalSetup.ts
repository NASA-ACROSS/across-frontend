import { GenericContainer, Wait } from 'testcontainers';
import { mockServerClient, type OpenAPIExpectation } from 'mockserver-client';

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

    const specUrlOrPayload = process.env.ACROSS_OPENAPI_SPEC_URL;
    if (specUrlOrPayload) {
        const client = mockServerClient('localhost', port);
        await client.openAPIExpectation({ specUrlOrPayload } as OpenAPIExpectation);
    }

    return async () => {
        await container.stop();
    };
}
