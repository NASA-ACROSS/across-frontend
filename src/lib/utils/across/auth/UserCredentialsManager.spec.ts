import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { UserCredentialsManager } from './UserCredentialsManager';
import { type Cookies } from '@sveltejs/kit';
import { JwtRefresher } from './JwtRefresher';
import { PUBLIC_CONFIG } from '$config/config.public';
import { jwtDecode } from 'jwt-decode';
import { callApi } from '../callApi';

// uses shared mock from __mocks__
vi.mock('./JwtRefresher');
vi.mock('../callApi');

// should be a shared mock, but it is not straightforward.
vi.mock('jwt-decode', () => {
    return {
        jwtDecode: vi.fn((token: string) => {
            if (token === 'valid') {
                return { exp: 200, sub: 'user-uuid' }; // expires in the future
            } else if (token === 'expired') {
                return { exp: 50, sub: 'user-uuid' }; // expired in the past
            }
            return {};
        }),
    };
});

vi.mock('../../crypto/crypto-aes-gcm', () => {
    return {
        aesGcmEncrypt: vi.fn().mockResolvedValue('encrypted_data'),
        aesGcmDecrypt: vi.fn().mockResolvedValue('decrypted_data'),
    };
});

const mockFetch = vi.fn();

describe('UserCredentialsManager', () => {
    let fakeTokenRes: {
        data: { access_token: string; refresh_token: string };
        response: {
            status: number;
            headers: { get: (header: string) => string | null };
        };
    };

    const fakeCookies = {
        get: vi.fn(),
        set: vi.fn(),
        delete: vi.fn(),
    } as unknown as Cookies;

    beforeEach(() => {
        vi.clearAllMocks();

        fakeTokenRes = {
            data: {
                access_token: 'valid',
                refresh_token: 'new_refresh_token',
            },
            response: {
                status: 200,
                headers: {
                    get: (header: string) => {
                        if (header === 'set-cookie') {
                            return 'refresh_token=new_refresh_token; Path=/; HttpOnly';
                        }
                        return null;
                    },
                },
            },
        };

        (callApi as Mock).mockResolvedValue(fakeTokenRes);
    });

    describe('GetAccessToken', () => {
        it('should return existing access token if not expired', async () => {
            const accessToken = await UserCredentialsManager.GetAccessToken(mockFetch, fakeCookies, {
                access_token: 'existing_access_token',
                refresh_token: 'existing_refresh_token',
            });

            expect(accessToken).toBe('existing_access_token');
        });

        it('should set cookie when tokens are refreshed', async () => {
            // force refresh flow
            (JwtRefresher.GetTokens as unknown as Mock).mockResolvedValue({
                access_token: 'new_access_token',
                refresh_token: 'new_refresh_token',
                refreshed: true,
            });

            const setCookieSpy = vi.spyOn(UserCredentialsManager, 'SetCookie');

            await UserCredentialsManager.GetAccessToken(mockFetch, fakeCookies, {
                access_token: 'expired',
                refresh_token: 'existing_refresh_token',
            });

            expect(setCookieSpy).toHaveBeenCalledWith(fakeCookies, PUBLIC_CONFIG.USER_TOKENS_COOKIE_NAME, {
                access_token: 'new_access_token',
                refresh_token: 'new_refresh_token',
            });
        });
    });

    describe('Verify', () => {
        it('should fetch tokens from verify endpoint', async () => {
            await UserCredentialsManager.Verify(mockFetch, 'verification_token', fakeCookies);

            expect(callApi).toHaveBeenCalledWith(
                mockFetch,
                expect.stringContaining('/auth/verify?token=verification_token'),
                expect.objectContaining({
                    method: 'GET',
                    headers: { Authorization: 'Bearer verification_token' },
                })
            );
        });

        it('should set the cookie with the retrieved tokens', async () => {
            const setCookieSpy = vi.spyOn(UserCredentialsManager, 'SetCookie');

            await UserCredentialsManager.Verify(mockFetch, 'verification_token', fakeCookies);

            expect(setCookieSpy).toHaveBeenCalledWith(
                fakeCookies,
                PUBLIC_CONFIG.USER_TOKENS_COOKIE_NAME,
                {
                    access_token: 'valid',
                    refresh_token: 'new_refresh_token',
                },
                false
            );
        });

        it('should decode the access token to retrieve user information', async () => {
            await UserCredentialsManager.Verify(mockFetch, 'verification_token', fakeCookies);

            expect(jwtDecode).toHaveBeenCalledWith('valid');
        });

        it('should throw an error when callApi fails', async () => {
            const error = {
                status: 401,
                body: { message: 'Unauthorized', errorId: 'err-id', code: 'UNAUTHORIZED' },
            };

            (callApi as Mock).mockRejectedValueOnce(error);

            await expect(UserCredentialsManager.Verify(mockFetch, 'verification_token', fakeCookies)).rejects.toEqual(error);
        });

        it('should throw an error if access token is not retrieved', async () => {
            fakeTokenRes.data = { access_token: '', refresh_token: '' };

            await expect(UserCredentialsManager.Verify(mockFetch, 'verification_token', fakeCookies)).rejects.toThrow(
                'Login verification failed to retrieve tokens'
            );
        });

        it('should throw an error if decoded token does not contain user information', async () => {
            (jwtDecode as unknown as Mock).mockReturnValueOnce({});

            await expect(UserCredentialsManager.Verify(mockFetch, 'verification_token', fakeCookies)).rejects.toThrow(
                'Login verification failed to decode user information from token'
            );
        });
    });

    describe('SetCookie', () => {
        it('should set a cookie with the given name and value', async () => {
            const setCookieSpy = vi.spyOn(fakeCookies, 'set');

            await UserCredentialsManager.SetCookie(fakeCookies, 'test_cookie', { key: 'value' });

            expect(setCookieSpy).toHaveBeenCalledWith('test_cookie', 'encrypted_data', {
                path: '/',
                secure: true,
                sameSite: true,
                httpOnly: true,
            });
        });

        it('should include a maxAge when rememberMe is true', async () => {
            const setCookieSpy = vi.spyOn(fakeCookies, 'set');

            await UserCredentialsManager.SetCookie(fakeCookies, 'test_cookie', { key: 'value' }, true);

            expect(setCookieSpy).toHaveBeenCalledWith(
                'test_cookie',
                'encrypted_data',
                expect.objectContaining({
                    maxAge: expect.any(Number) as number,
                })
            );
        });
    });
});
