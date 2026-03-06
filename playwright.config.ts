import type { PlaywrightTestConfig } from '@playwright/test';
import dotenv from 'dotenv';

// TODO: this is a somewhat temporary solution to load environment variables
// for the tests. We will want to have different test targets such as
// unit, integration, and e2e tests, and we may want to have different env vars
// for each of those. For now, we just have a single .env.test file that is
// used for all tests. We will need to revisit this and come up with a more robust solution as we
// add more tests and test targets.
dotenv.config({
    path: [`.env.test`, '.env'],
});

const config: PlaywrightTestConfig = {
    webServer: {
        command: 'npm run build && npm run preview',
        port: 4173,
    },
    testDir: 'tests',
    testMatch: /(.+\.)?(test|spec)\.[jt]s/,
    fullyParallel: true,
};

export default config;
