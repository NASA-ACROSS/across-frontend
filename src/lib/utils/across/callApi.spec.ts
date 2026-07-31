import logger from '$lib/logger';
import { error } from '@sveltejs/kit';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { callApi } from './callApi';
import { HTTP_CODES } from '$lib';

const mockFetch = vi.fn();

vi.mock('$lib/logger', () => {
    return {
        default: {
            warn: vi.fn(),
            debug: vi.fn(),
            error: vi.fn(),
        },
    };
});

vi.mock('@sveltejs/kit', () => {
    return {
        error: vi.fn(() => {
            throw new Error();
        }),
    };
});

vi.mock('$config/config', () => {
    return {
        CONFIG: {
            ACROSS_SERVER_URL: 'http://across-server.com',
        },
    };
});

const getFakeResponse = <T>({ ok, status, body }: { ok: boolean; status: number; body: T }) => {
    const res = {
        ok,
        status,
    } as unknown as Response;

    if (typeof body === 'object') {
        res.text = vi.fn().mockResolvedValue(JSON.stringify(body));
        res.json = vi.fn().mockResolvedValue(body);
    } else {
        res.text = vi.fn().mockResolvedValue(body as string);
        res.json = vi.fn().mockRejectedValue(new Error('Invalid JSON'));
    }

    return res;
};

describe('callApi', () => {
    const fakeGeneratedId = 'generated-error-uuid-id-1234';
    const fakeResponse = getFakeResponse({ ok: true, status: 200, body: { id: 'abc' } });

    beforeEach(() => {
        vi.clearAllMocks();
        mockFetch.mockResolvedValue(fakeResponse);
        vi.spyOn(globalThis.crypto, 'randomUUID').mockReturnValue(fakeGeneratedId);
    });

    it('should call fetch with url and options', async () => {
        await callApi(mockFetch, '/test', { method: 'GET' });

        expect(mockFetch).toHaveBeenCalledWith(new URL('http://across-server.com/test'), { method: 'GET' });
    });

    it('should return parsed JSON when response is ok', async () => {
        const { data } = await callApi(mockFetch, '/test', {
            method: 'GET',
        });

        expect(data).toEqual({ id: 'abc' });
    });

    it('should not call svelte error helper when response is ok', async () => {
        await callApi(mockFetch, '/test', {
            method: 'GET',
        });

        expect(error).not.toHaveBeenCalled();
    });

    it('should throw error when response is not ok', async () => {
        mockFetch.mockResolvedValue(
            getFakeResponse({
                ok: false,
                status: 500,
                body: { detail: 'Internal server error' },
            }) as unknown as Response
        );

        await expect(
            callApi(mockFetch, '/test', {
                method: 'GET',
            })
        ).rejects.toThrowError();
    });

    it('should map ACROSS API detail and existing errorId', async () => {
        mockFetch.mockResolvedValue(
            getFakeResponse({
                ok: false,
                status: 400,
                body: {
                    detail: 'Bad request from ACROSS API',
                    errorId: 'existing-error-id',
                },
            })
        );

        await callApi(mockFetch, '/test', {
            method: 'POST',
        }).catch(() => {});

        expect(error).toHaveBeenCalledWith(400, {
            message: 'Bad request from ACROSS API',
            code: 'BAD_REQUEST',
            errorId: 'existing-error-id',
        });
    });

    it('should not log warning when detail exists', async () => {
        mockFetch.mockResolvedValue(
            getFakeResponse({
                ok: false,
                status: 400,
                body: {
                    detail: 'Bad request from ACROSS API',
                    errorId: 'existing-error-id',
                },
            })
        );

        await callApi(mockFetch, '/test', {
            method: 'POST',
        }).catch(() => {});

        expect(logger.warn).not.toHaveBeenCalled();
    });

    it('should use fallback message and unknown code when expected fields are missing', async () => {
        mockFetch.mockResolvedValue(
            getFakeResponse({
                ok: false,
                status: 418,
                body: {},
            })
        );

        await callApi(mockFetch, '/test', {
            method: 'GET',
        }).catch(() => {});

        expect(error).toHaveBeenCalledWith(418, {
            message: expect.stringContaining('unknown') as string,
            code: 'UNKNOWN_ERROR',
            errorId: fakeGeneratedId,
        });
    });

    it('should use response text as message when JSON parsing fails', async () => {
        const responseText = 'This is a plain text error message';

        mockFetch.mockResolvedValue(
            getFakeResponse({
                ok: false,
                status: 500,
                body: responseText,
            })
        );

        await callApi(mockFetch, '/test', {
            method: 'GET',
        }).catch(() => {});

        expect(error).toHaveBeenCalledWith(500, {
            message: responseText,
            code: 'INTERNAL_SERVER_ERROR',
            errorId: fakeGeneratedId,
        });
    });

    it('should log debug message when JSON parsing fails', async () => {
        const responseText = 'This is a plain text error message';

        mockFetch.mockResolvedValue(
            getFakeResponse({
                ok: false,
                status: 500,
                body: responseText,
            })
        );

        await callApi(mockFetch, '/test', {
            method: 'GET',
        }).catch(() => {});

        expect(logger.debug).toHaveBeenCalledWith(
            expect.objectContaining({
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                msg: expect.any(String),
            })
        );
    });

    it('should log the parsed error message from the response.', async () => {
        const responseBody = {
            detail: 'This is the parsed error message from the response.',
            errorId: 'existing-error-id',
        };

        mockFetch.mockResolvedValue(getFakeResponse({ ok: false, status: 400, body: responseBody }));

        await callApi(mockFetch, '/test', {
            method: 'POST',
        }).catch(() => {});

        expect(logger.error).toHaveBeenCalledWith(
            expect.objectContaining({
                msg: 'ACROSS API request failed',
                url: new URL('http://across-server.com/test'),
                options: { method: 'POST' },
                status: 400,
                errorBody: {
                    message: 'This is the parsed error message from the response.',
                    code: HTTP_CODES[400],
                    errorId: 'existing-error-id',
                },
            })
        );
    });

    it('should return undefined data when there is no content in the response and responseType is empty', async () => {
        mockFetch.mockResolvedValue(
            getFakeResponse({
                ok: true,
                status: 201,
                body: undefined,
            })
        );

        const { data } = await callApi(mockFetch, '/test', {
            method: 'DELETE',
            responseType: 'empty',
        });

        expect(data).toBeUndefined();
    });

    it('should return undefined data when status is 204', async () => {
        mockFetch.mockResolvedValue(
            getFakeResponse({
                ok: true,
                status: 204,
                body: undefined,
            })
        );

        const { data } = await callApi(mockFetch, '/test', {
            method: 'DELETE',
            responseType: 'empty',
        });

        expect(data).toBeUndefined();
    });

    it('should return a string when the API returns a plaintext and responseType is json', async () => {
        const responseString = 'This is a string response from the API';

        mockFetch.mockResolvedValue(
            getFakeResponse({
                ok: true,
                status: 201,
                body: responseString,
            })
        );

        const { data } = await callApi(mockFetch, '/test', {
            method: 'GET',
        });

        expect(data).toBe(responseString);
    });

    it('should return a string when responseType is text', async () => {
        const responseString = 'This is a string response from the API';

        mockFetch.mockResolvedValue(
            getFakeResponse({
                ok: true,
                status: 201,
                body: responseString,
            })
        );

        const { data } = await callApi(mockFetch, '/test', {
            method: 'GET',
            responseType: 'text',
        });

        expect(data).toBe(responseString);
    });
});
