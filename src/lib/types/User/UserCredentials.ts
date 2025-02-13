import { CONFIG } from '../../../config/config.js';
import type { UserCredentialsCookie, AccessDataResponse } from "./UserCredentialsCookie"
import { jwtDecode } from "jwt-decode";


export class UserCredentials {
    cookie: UserCredentialsCookie;

    constructor(cookie: UserCredentialsCookie) {
        this.cookie = cookie;
    }

    async getAccessToken() {
        if (this.cookie.access_token) {
            const decodedToken = jwtDecode(this.cookie.access_token);
            const dateInSecs = Date.now() / 1000;
            // Check if it's expired
            if (decodedToken.exp && decodedToken.exp < dateInSecs) {
                // Request new access token from the refresh endpoint
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: `Bearer ${this.cookie.refresh_token}`,
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
                        `ERROR: getting refresh token for user [${this.cookie.id}] at [${Date.now()}]`,
                        JSON.stringify(error)
                    );
                    return ""
                }

                const newCredentials = await response.json() as AccessDataResponse;
                // Set the new access token as part of the UserCredentialsCookie
                this.cookie.access_token = newCredentials.access_token;
                // Return the new access token
                return this.cookie.access_token
            } else if (decodedToken.exp) {    
                // Return the current access token            
                return this.cookie.access_token
            }
        }
        // If no access token, log an error
        console.error('ERROR: no access token saved in user cookie for user ', this.cookie.id);
        return ""
    }
}
