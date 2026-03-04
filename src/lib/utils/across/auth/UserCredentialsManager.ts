import type { CookieSerializeOptions } from 'cookie';
import { aesGcmEncrypt } from '$lib/utils/crypto/crypto-aes-gcm';
import type { AccessDataResponse, SessionCookie } from '$lib/types/User/UserCredentialsCookie';
import type { Cookies } from '@sveltejs/kit';
import { webserverCredentialsManager } from '$lib/utils/across/auth/WebserverCredentialsManager';
import { JwtRefresher } from '$lib/utils/across/auth/JwtRefresher';
import { CONFIG } from '$config/config';
import { jwtDecode, type JwtPayload } from 'jwt-decode';

export class UserCredentialsManager {
    public static async GetAccessToken(cookies: Cookies, tokens?: SessionCookie) {
        const { access_token, refresh_token, refreshed } = await JwtRefresher.GetTokens(tokens);

        if (refreshed) {
            // if the tokens were refreshed, update the cookie with the new tokens
            await this.SetCookie(cookies, 'user-session', { access_token, refresh_token });
        }

        return access_token;
    }

    /**
     * Exchange verification token for access token and refresh token
     * sets the cookie with the retrieved tokens.
     */
    public static async Verify(token: string, cookies: Cookies, rememberMe: boolean): Promise<string> {
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        // trade verification token for access token
        const response = await fetch(`${CONFIG.API_URL}/auth/verify?token=${token}`, options);

        // short circuit for error status
        if (response.status != 200) {
            console.error(`Login-verify failed`, {
                time: Date.now(),
                status: response.status,
                statusText: response.statusText,
            });

            throw new Error(`Login verification failed with status code ${response.status}`);
        }

        const { access_token } = (await response?.json()) as AccessDataResponse;

        const headers = response.headers;

        // Get the refresh token from the response headers
        const cookiesStr = headers.get('set-cookie');
        let refresh_token = cookiesStr
            ?.split(';')
            .find((element) => element.includes('refresh_token'))
            ?.split('=')[1];

        if (refresh_token == null) {
            refresh_token = '';
        }

        if (!access_token || !refresh_token) {
            throw new Error('Login verification failed to retrieve tokens');
        }

        const decodedToken: JwtPayload = jwtDecode(access_token);

        if (!decodedToken.sub) {
            throw new Error('Login verification failed to decode user information from token');
        }

        // Set verified tokens in cookie for future authenticated requests
        const sessionCookie: SessionCookie = {
            id: decodedToken.sub,
            access_token,
            refresh_token,
        };

        // we are only setting the user-session cookie here since
        // the user-login cookie is set in the login-verify page
        // after fetching user information from the API
        await this.SetCookie(cookies, 'user-session', sessionCookie, rememberMe);

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
