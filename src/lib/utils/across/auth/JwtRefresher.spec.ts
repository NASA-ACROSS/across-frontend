import { beforeEach, describe, expect, it, vi } from 'vitest';
import { JwtRefresher, type Tokens } from './JwtRefresher';

vi.mock('luxon', () => {
    return {
        DateTime: {
            now: () => ({ toSeconds: () => 100 }),
        },
    };
});

vi.mock('jwt-decode', () => {
    return {
        jwtDecode: vi.fn((token: string) => {
            if (token === 'valid') {
                return { exp: 200 }; // expires in the future
            } else if (token === 'expired') {
                return { exp: 50 }; // expired in the past
            }
            return {};
        }),
    };
});

describe('JwtRefresher', () => {
    const fakeTokenRes = {
        json: () => ({
            access_token: 'new_access_token',
        }),
        headers: {
            get: (header: string) => {
                if (header === 'set-cookie') {
                    return 'refresh_token=new_refresh_token; Path=/; HttpOnly';
                }
                return null;
            },
        },
    };

    const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});

    beforeEach(() => {
        vi.clearAllMocks();
        vi.spyOn(global, 'fetch').mockResolvedValue(fakeTokenRes as unknown as Response);
    });

    describe('GetTokens', () => {
        it('should get unrefreshed tokens when valid tokens exist', async () => {
            const tokens: Tokens = {
                access_token: 'valid',
                refresh_token: 'valid',
            };

            const result = await JwtRefresher.GetTokens(tokens);

            expect(result).toEqual({
                access_token: 'valid',
                refresh_token: 'valid',
                refreshed: false,
            });
        });

        it('should refresh tokens when access token is expired', async () => {
            const tokens: Tokens = {
                access_token: 'expired',
                refresh_token: 'valid',
            };

            const result = await JwtRefresher.GetTokens(tokens);

            expect(result).toEqual({
                access_token: 'new_access_token',
                refresh_token: 'new_refresh_token',
                refreshed: true,
            });
        });

        it('should fetch from refresh endpoint when access token is expired', async () => {
            const tokens: Tokens = {
                access_token: 'expired',
                refresh_token: 'valid',
            };

            await JwtRefresher.GetTokens(tokens);

            expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/auth/refresh'), {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer valid',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
        });

        it('should throw an error when no valid tokens are available', async () => {
            await expect(JwtRefresher.GetTokens()).rejects.toThrow('No valid tokens available');
        });
    });

    describe('IsExpired', () => {
        it('should return false for valid access token', () => {
            const result = JwtRefresher.IsExpired('valid');
            expect(result).toBe(false);
        });

        it('should return true for expired access token', () => {
            const result = JwtRefresher.IsExpired('expired');
            expect(result).toBe(true);
        });

        it('should log a debug message with isExpired result', () => {
            JwtRefresher.IsExpired('expired');
            expect(debugSpy).toHaveBeenCalledWith('Checking token expiration', { isExpired: true });
        });
    });

    describe('ExtractRefreshToken', () => {
        it('should extract refresh token from headers', () => {
            const headers = new Headers();
            headers.append('set-cookie', 'refresh_token=test_refresh_token; Path=/; HttpOnly');

            const result = JwtRefresher.ExtractRefreshToken(headers);
            expect(result).toBe('test_refresh_token');
        });

        it('should throw an error if the cookie header is not set', () => {
            const headers = new Headers();

            expect(() => JwtRefresher.ExtractRefreshToken(headers)).toThrow('Refresh token not found in response headers');
        });

        it.each(['', 'refresh_token=; Path=/; HttpOnly', 'some_other_cookie=some_value; Path=/; HttpOnly'])(
            `should throw an error when refresh token header is '%s'`,
            (cookie) => {
                const headers = new Headers();
                headers.append('set-cookie', cookie);

                expect(() => JwtRefresher.ExtractRefreshToken(headers)).toThrow('Refresh token not found in response headers');
            }
        );
    });
});
