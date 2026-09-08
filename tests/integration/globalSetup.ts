// import { execSync } from 'node:child_process';
import { GenericContainer, Wait } from 'testcontainers';

process.loadEnvFile('.env.test');

export default async function globalSetup() {
    // Pinned to a specific stable tag (rather than `latest`) to keep CI/local runs reproducible.
    // Kept in lockstep with the `mockserver-client`/`@mockserver/testcontainers` npm versions in package.json.
    const image = 'mockserver/mockserver:7.6.0';
    const containerName = 'playwright-mockserver-testcontainer';
    const port = Number(process.env.ACROSS_SERVER_PORT);

    const container = await new GenericContainer(image)
        .withReuse()
        .withExposedPorts({ container: port, host: port })
        .withAutoCleanup(true)
        .withName(containerName)
        .withWaitStrategy(Wait.forHttp('/mockserver/status', port).withMethod('PUT').forStatusCode(200))
        .start();

    // Wipe previous test states via MockServer's internal API since the container stays alive
    await fetch('http://localhost:1080/mockserver/reset', { method: 'PUT' });

    return async () => {
        await container.stop();
    };
}
