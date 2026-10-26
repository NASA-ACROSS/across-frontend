/* eslint-disable @typescript-eslint/no-unsafe-return */
import { defineEnvVars } from '@sveltejs/kit/env';

// @migration-task Review usage of dynamic environment variables. They fall back to the empty string if not present, which may not be what you want.
export const variables = defineEnvVars({
    PUBLIC_BUILD_VERSION: { public: true, static: true },
    PUBLIC_RUNTIME_ENV: { public: true, schema: (input) => input ?? '' },
    PUBLIC_DEFAULT_LOG_LEVEL: { public: true, schema: (input) => input ?? '' },
    PUBLIC_PRETTY_LOGS: { public: true, schema: (input) => input ?? '' },
    ACROSS_SERVER_HOST: { schema: (input) => input ?? '' },
    ACROSS_SERVER_ROOT_PATH: { schema: (input) => input ?? '' },
    ACROSS_SERVER_VERSION: { schema: (input) => input ?? '' },
    ACROSS_SERVER_PORT: { schema: (input) => input ?? '' },
    APP_ENV: { schema: (input) => input ?? '' },
    ACROSS_SERVER_ID_PATH: { schema: (input) => input ?? '' },
    ACROSS_SERVER_SECRET_PATH: { schema: (input) => input ?? '' },
    ACROSS_SERVER_ID: { schema: (input) => input ?? '' },
    ACROSS_SERVER_SECRET: { schema: (input) => input ?? '' },
    ACROSS_TEST_ACCESS_TOKEN: { schema: (input) => input ?? '' },
    MOCKSERVER_NAMESPACE_HEADER: { schema: (input) => input ?? '' },
    AWS_REGION: { schema: (input) => input ?? '' },
    AWS_PROFILE: { schema: (input) => input ?? '' },
    BUILD_ENV: { schema: (input) => input ?? '' },
});
