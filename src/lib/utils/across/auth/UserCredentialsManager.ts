import type { CookieSerializeOptions } from 'cookie';
import { aesGcmEncrypt } from '$lib/utils/crypto/crypto-aes-gcm';
import type { TokensCookie as TokensCookie } from '$lib/types/User/UserCredentialsCookie';
import type { Cookies } from '@sveltejs/kit';
import { webserverCredentialsManager } from '$lib/utils/across/auth/WebserverCredentialsManager';
import { JwtRefresher } from '$lib/utils/across/auth/JwtRefresher';
import { jwtDecode, type JwtPayload } from 'jwt-decode';
import { PUBLIC_CONFIG } from '$config/config.public';
import logger from '$lib/logger';
import { callApi } from '../callApi';

export class UserCredentialsManager {
    public static async GetAccessToken(fetch: typeof globalThis.fetch, cookies: Cookies, tokens?: TokensCookie) {
        const { access_token, refresh_token, refreshed } = await JwtRefresher.GetTokens(fetch, tokens);

        if (refreshed) {
            // if the tokens were refreshed, update the cookie with the new tokens
            logger.debug('Access token was refreshed; updating cookie with new tokens');
            await this.SetCookie(cookies, PUBLIC_CONFIG.USER_TOKENS_COOKIE_NAME, { access_token, refresh_token });
        }

        return access_token;
    }

    /**
     * Exchange verification token for access token and refresh token
     * sets the cookie with the retrieved tokens.
     */
    public static async Verify(
        fetch: typeof globalThis.fetch,
        token: string,
        cookies: Cookies,
        rememberMe: boolean = false
    ): Promise<string> {
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        // trade verification token for access token
        const {
            data: { access_token },
            response,
        } = await callApi<{ access_token: string }>(fetch, `/auth/verify?token=${token}`, options);

        if (!access_token) throw new Error('Login verification failed to retrieve tokens');

        const refreshToken = JwtRefresher.ExtractRefreshToken(response.headers);
        const decodedToken: JwtPayload = jwtDecode(access_token);

        if (!decodedToken.sub) {
            throw new Error('Login verification failed to decode user information from token');
        }

        // Set verified tokens in cookie for future authenticated requests
        const sessionCookie: TokensCookie = {
            access_token,
            refresh_token: refreshToken,
        };

        // we are only setting the tokens cookie here since
        // the user info cookie is set in the login-verify page
        // after fetching user information from the API
        await this.SetCookie(cookies, PUBLIC_CONFIG.USER_TOKENS_COOKIE_NAME, sessionCookie, rememberMe);

        return decodedToken.sub;
    }

    public static async SetCookie<T>(cookies: Cookies, cookieName: string, cookie: T, rememberMe?: boolean) {
        const encrypted = await aesGcmEncrypt(JSON.stringify(cookie), webserverCredentialsManager.secret);

        const cookieOptions: CookieSerializeOptions & { path: string } = {
            path: '/',
            sameSite: true,
            secure: true,
            httpOnly: true,
        };

        if (rememberMe) {
            const ONE_YEAR_IN_MS = 31536000;
            cookieOptions.maxAge = ONE_YEAR_IN_MS;
        }

        cookies.set(cookieName, encrypted, cookieOptions);
    }
}
