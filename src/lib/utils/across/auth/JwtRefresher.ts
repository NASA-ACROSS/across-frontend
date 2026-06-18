import { CONFIG } from '$config/config';
import { jwtDecode } from 'jwt-decode';
import * as luxon from 'luxon';

export interface Tokens {
    access_token: string;
    refresh_token: string;
}

export type RefreshedTokens = Tokens & {
    refreshed: boolean;
};

/** JWT Refresher class to handle JWT operations */
export class JwtRefresher {
    /**
     * Request new access token from the refresh endpoint
     */
    public static async GetTokens(currentTokens?: Partial<Tokens>): Promise<RefreshedTokens> {
        // if tokens exists, check if access is expired
        if (currentTokens?.access_token && !this.IsExpired(currentTokens.access_token)) {
            console.debug('Access token is valid. No need to refresh');
            return {
                access_token: currentTokens.access_token,
                refresh_token: currentTokens.refresh_token!,
                refreshed: false,
            };
        } else if (currentTokens?.refresh_token) {
            console.debug('Access token missing or expired; refreshing...');
            const refreshedTokens = await this.RefreshAccessToken(currentTokens.refresh_token);
            return refreshedTokens;
        }

        throw new Error('No valid tokens available');
    }

    public static IsExpired(accessToken: string): boolean {
        const decodedToken = jwtDecode(accessToken);

        const now = luxon.DateTime.now().toSeconds();

        // Subtracting 30 secs from the expiration to avoid edge case
        // of having the token expire "in flight" to server
        const inFlightOffset = 30;

        const isExpired = decodedToken.exp ? decodedToken.exp - inFlightOffset < now : true;

        console.debug('Checking token expiration', { isExpired });

        return isExpired;
    }

    public static ExtractRefreshToken(headers: Headers): string {
        // Get the refresh token from the response headers
        const cookiesStr = headers.get('set-cookie');
        const refreshToken = cookiesStr
            ?.split(';')
            .find((element) => element.includes('refresh_token'))
            ?.split('=')[1];

        if (!refreshToken) throw new Error('Refresh token not found in response headers');

        return refreshToken;
    }

    private static async RefreshAccessToken(refresh_token: string): Promise<RefreshedTokens> {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${refresh_token}`,
            },
        };

        const response = await fetch(`${CONFIG.ACROSS_SERVER_URL}/auth/refresh`, options);

        const { access_token } = (await response.json()) as { access_token: string };
        const refreshToken = this.ExtractRefreshToken(response.headers);

        return {
            access_token,
            refresh_token: refreshToken,
            refreshed: true,
        };
    }
}
