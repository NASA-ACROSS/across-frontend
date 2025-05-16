import { CONFIG } from '../../../config/config.js';
import type { CookieSerializeOptions } from 'cookie';
import { aesGcmEncrypt } from '$lib/utils/crypto/crypto-aes-gcm';
import type { UserCredentialsCookie, AccessDataResponse } from "./UserCredentialsCookie"
import { jwtDecode } from "jwt-decode";
import type { Cookies } from '@sveltejs/kit';


export class UserCredentials {
    userCookie: UserCredentialsCookie;

    constructor(userCookie: UserCredentialsCookie) {
        this.userCookie = userCookie;
    }

    async refreshAccessToken() {
        // Request new access token from the refresh endpoint
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${this.userCookie.refresh_token}`,
            },
        };
        let response;
        try {
            response = await fetch(
                `${CONFIG.API_URL}/api/auth/refresh`,
                options
            );
        } catch (error) {
            console.error(
                `ERROR: refreshing access token for user [${this.userCookie.id}] at [${Date.now()}]`,
                JSON.stringify(error)
            );
            return '';
        }

        const newCredentials = (await response.json()) as AccessDataResponse;

        // Return the new access token
        return newCredentials.access_token;
    }

    async getAccessToken(cookies: Cookies) {
        if (this.userCookie.access_token) {
            const decodedToken = jwtDecode(this.userCookie.access_token);
            const dateInSecs = Date.now() / 1000;
            // Check if it's expired
            // Subtracting 30 secs from the expiration to avoid edge case
            // of having the token expire "in flight" to server
            if (decodedToken.exp && decodedToken.exp - 30 > dateInSecs) {
                // Return the current access token
                return this.userCookie.access_token;
            } else {
                const accessToken = await this.refreshAccessToken();
                // Set the new access token as part of the UserCredentialsCookie
                this.userCookie.access_token = accessToken;
                await this.setCookie(cookies);
                return this.userCookie.access_token;
            }
        } else if (this.userCookie.refresh_token) {
            const accessToken = await this.refreshAccessToken();
            // Set the new access token as part of the UserCredentialsCookie
            this.userCookie.access_token = accessToken;
            await this.setCookie(cookies);
            return this.userCookie.access_token;
        }
        // If no access token, log an error
        console.error('ERROR: no access token saved in user cookie for user ', this.userCookie.id);
        return ""
    }

    async setCookie(cookies: Cookies) {
        const encryptedCredentials = await aesGcmEncrypt(
            JSON.stringify(this.userCookie),
            CONFIG.API_TOKEN
        );

        const cookieOptions: CookieSerializeOptions & { path: string } = {
            path: '/',
            sameSite: true,
            secure: true,
            httpOnly: true,
        };

        if (this.userCookie.rememberMe) {
            const ONE_YEAR_IN_MS = 31536000;
            cookieOptions.maxAge = ONE_YEAR_IN_MS;
        }

        cookies.set('user-login', encryptedCredentials, cookieOptions);
    }
}
