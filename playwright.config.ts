import type { PlaywrightTestConfig } from '@playwright/test';
import dotenv from 'dotenv';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
dotenv.config({ path: '.env.development', override: true });
const env = { ...process.env } as { [key: string]: string };

const config: PlaywrightTestConfig = {
    webServer: {
        env,
        command: 'npm run build && npm run preview',
        port: 4173,
        stderr: 'pipe',
    },
    testDir: 'tests',
    testMatch: /(.+\.)?(test|spec)\.[jt]s/,
};

export default config;
