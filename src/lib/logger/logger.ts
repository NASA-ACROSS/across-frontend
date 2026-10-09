import { browser } from '$app/environment';
import { type RuntimeEnv, PUBLIC_CONFIG } from '$config/config.public';
import pino, { type Logger, type LoggerOptions } from 'pino';

const logger: Logger = (() => {
    const options: LoggerOptions = {
        // format the level in the log to be uppercase.
        formatters: {
            level: (number) => {
                return { level: number };
            },
        },
    };

    if (browser) {
        // in production, disable browser logs
        options.level = PUBLIC_CONFIG.RUNTIME_ENV === 'prod' ? 'silent' : PUBLIC_CONFIG.DEFAULT_LOG_LEVEL;

        options.browser = {
            asObject: false,
        };
    } else {
        options.level = PUBLIC_CONFIG.DEFAULT_LOG_LEVEL;

        if (PUBLIC_CONFIG.PRETTY_LOGS === 1) {
            options.transport = {
                target: 'pino-pretty',
                options: {
                    colorize: true, // show colors in log
                    levelFirst: true, // show levels first in log
                    translateTime: true, // translate the time in human readable format
                },
            };
        }
    }

    return pino(options);
})();

export const setLogLevel = (env: RuntimeEnv) => {
    switch (env) {
        case 'feat1':
        case 'dev':
            logger.level = 'trace'; // for Development and Preview envs, use trace log level
            break;
        case 'staging':
            logger.level = 'info'; // info for Staging
            break;
        case 'prod':
            if (browser) {
                logger.level = 'silent'; // for Production, silent in browser
            } else {
                logger.level = 'info'; // and info in server
            }
            break;
    }

    logger.info({ msg: `Log level will be set to "${logger.level}".` });
};

export default logger;
