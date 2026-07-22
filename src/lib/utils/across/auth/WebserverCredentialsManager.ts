import { CONFIG } from '$config/config';
import * as luxon from 'luxon';
import { ssm } from '../../aws/ssm';
import { JwtRefresher } from './JwtRefresher';
import logger from '$lib/logger';
import { callApi } from '../callApi';
import { isHttpError } from '@sveltejs/kit';

interface AccessTokenResponse {
    access_token: string;
    token_type: 'bearer';
}

export class WebserverCredentialsManager {
    public daysBeforeExp = 1;
    public id!: string;
    public secret!: string;
    // tokens will be populated when the handleWebserverAuth function is called in the hooks.server.ts file.
    // It should be called on the first request to the server and will refresh the tokens as needed on subsequent requests.
    public token?: AccessTokenResponse;

    private expiration?: luxon.DateTime;

    public async initialize(fetch: typeof window.fetch): Promise<void> {
        await this.setCredentials();
        await this.getAccessToken(fetch);
    }

    public async getAccessToken(fetch: typeof window.fetch, options: { retry?: boolean } = {}): Promise<string | undefined> {
        if (CONFIG.IS_BUILD || CONFIG.ACROSS_TEST_ACCESS_TOKEN) {
            logger.debug('Building or running in test environment, using dummy access token for WebserverCredentialsManager');
            return CONFIG.ACROSS_TEST_ACCESS_TOKEN;
        }

        const { retry = false } = options;

        if (!this.token?.access_token || JwtRefresher.IsExpired(this.token.access_token)) {
            try {
                // Only the webserver credentials manager should be calling the
                // token endpoint with its own credentials, so we can use basic
                // auth with the client id and secret to get the access token.
                // service accounts do not need refresh tokens.
                this.token = await callApi<AccessTokenResponse>(fetch, `${CONFIG.ACROSS_SERVER_URL}/auth/token`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: `Basic ${btoa(`${this.id}:${this.secret}`)}`,
                    },
                    body: new URLSearchParams({ grant_type: 'client_credentials' }),
                });
            } catch (err: unknown) {
                // We will catch and log errors here, but return undefined to allow the application to continue
                // running without the credentials. This is because the credentials are only needed for specific
                // server-side requests to the ACROSS API, and we don't want the entire application to crash if
                // the credentials are not available for some reason. Pages and requests that require the
                // credentials will handle the errors appropriately when they attempt to use the credentials and
                // find them missing or invalid.
                if (isHttpError(err)) {
                    if (err.status === 401) {
                        if (!retry) {
                            logger.debug('Credentials may have been changed, pulling latest and retrying.');
                            await this.setCredentials();
                            return this.getAccessToken(fetch, { retry: true });
                        } else {
                            logger.error({ msg: 'Unauthorized credentials', err });
                        }
                    }
                } else {
                    logger.error({
                        msg: 'Unknown error while attempting to fetch the token. Server may likely be down or unreachable.',
                        err,
                    });
                }

                // return undefined to allow the "GET" requests and pages not dependent on the core-server to pass through.
                return;
            }
        }

        // on requests after the initial token fetch, check
        // if the secret is close to expiring and rotate if needed
        // before returning the token
        await this.checkAndRotate();

        return this.token.access_token;
    }

    private async checkAndRotate(): Promise<void> {
        if (await this.shouldRotate()) {
            logger.warn('Service Account Credentials expiring soon, rotating credentials...');
            await this.rotateKey();
        }
    }

    private async shouldRotate(): Promise<boolean> {
        const exp = await this.getExpiration();

        const now = luxon.DateTime.now();
        const daysLeft = exp.diff(now, 'days').days;

        return daysLeft < this.daysBeforeExp;
    }

    private async getExpiration(): Promise<luxon.DateTime> {
        if (!this.expiration) {
            const options = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${this.token?.access_token}` },
            };

            const res = await fetch(`${CONFIG.ACROSS_SERVER_URL}/service-account/${this.id}`, options);

            if (!res.ok) {
                throw new Error(`Error checking credential expiration with status code ${res.status}`);
            }

            const { expiration } = (await res.json()) as { expiration: string };

            const exp = luxon.DateTime.fromISO(expiration);
            this.expiration = exp;
        }

        return this.expiration;
    }

    private async rotateKey(): Promise<void> {
        // call server to rotate credentials, returns new secret and expiration
        const res = await fetch(`${CONFIG.ACROSS_SERVER_URL}/service-account/${this.id}/rotate_key`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token?.access_token}`,
            },
        });

        if (!res.ok) {
            throw new Error(`Error rotating credentials with status code ${res.status}`);
        }

        const data = (await res.json()) as { secret: string; expiration: string };

        await this.updateKey(data.secret);
        this.expiration = luxon.DateTime.fromISO(data.expiration);
    }

    private async updateKey(key: string): Promise<void> {
        this.secret = key;

        await ssm.putParameter(CONFIG.ACROSS_SERVER_SECRET_PATH, key, {
            type: 'SecureString',
            overwrite: true,
        });
    }

    private async setCredentials(): Promise<void> {
        if (CONFIG.IS_BUILD || (CONFIG.ACROSS_SERVER_ID && CONFIG.ACROSS_SERVER_SECRET)) {
            this.id = CONFIG.ACROSS_SERVER_ID;
            this.secret = CONFIG.ACROSS_SERVER_SECRET;
        } else {
            await this.getCred('id', this.buildSsmPath(CONFIG.ACROSS_SERVER_ID_PATH));
            await this.getCred('secret', this.buildSsmPath(CONFIG.ACROSS_SERVER_SECRET_PATH));
        }
    }

    private async getCred(param: 'id' | 'secret', name: string): Promise<void> {
        const { Value } = await ssm.getParameter(name);
        this[param] = Value;
    }

    private buildSsmPath(path: string): string {
        return `/${CONFIG.APP_ENV}/${path}`;
    }
}

const credentials = new WebserverCredentialsManager();

export { credentials as webserverCredentialsManager };
