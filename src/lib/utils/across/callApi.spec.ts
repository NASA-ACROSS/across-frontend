import logger from '$lib/logger';
import { error } from '@sveltejs/kit';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { callApi } from './callApi';

const fetchMock = vi.fn();

vi.mock('$lib/logger', () => {
    return {
        default: {
            warn: vi.fn(),
            debug: vi.fn(),
        },
    };
});

vi.mock('@sveltejs/kit', () => {
    return {
        error: vi.fn((status: number, body: App.Error) => ({ status, body })),
    };
});

describe('callApi', () => {
    const fakeGeneratedId = 'generated-error-uuid-id-1234';

    beforeEach(() => {
        vi.clearAllMocks();
        fetchMock.mockReset();
        vi.spyOn(globalThis.crypto, 'randomUUID').mockReturnValue(fakeGeneratedId);
    });

    it('should call fetch with url and options when response is ok', async () => {
        const responseBody = { id: 'abc', status: 'ok' };

        fetchMock.mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue(responseBody),
        } as unknown as Response);

        await callApi<typeof responseBody>(fetchMock, '/test', {
            method: 'GET',
        });

        expect(fetchMock).toHaveBeenCalledWith('/test', { method: 'GET' });
    });

    it('should return parsed JSON when response is ok', async () => {
        const responseBody = { id: 'abc', status: 'ok' };

        fetchMock.mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue(responseBody),
        } as unknown as Response);

        const result = await callApi<typeof responseBody>(fetchMock, '/test', {
            method: 'GET',
        });

        expect(result).toEqual(responseBody);
    });

    it('should not call svelte error helper when response is ok', async () => {
        fetchMock.mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue({ id: 'abc' }),
        } as unknown as Response);

        await callApi(fetchMock, '/test', {
            method: 'GET',
        });

        expect(error).not.toHaveBeenCalled();
    });

    it('should map ACROSS API detail and existing errorId', async () => {
        fetchMock.mockResolvedValue({
            ok: false,
            status: 400,
            json: vi.fn().mockResolvedValue({
                detail: 'Bad request from ACROSS API',
                errorId: 'existing-error-id',
            }),
        } as unknown as Response);

        await callApi(fetchMock, '/test', {
            method: 'POST',
        });

        expect(error).toHaveBeenCalledWith(400, {
            message: 'Bad request from ACROSS API',
            code: 'BAD_REQUEST',
            errorId: 'existing-error-id',
        });
    });

    it('should not log warning when detail exists', async () => {
        fetchMock.mockResolvedValue({
            ok: false,
            status: 400,
            json: vi.fn().mockResolvedValue({
                detail: 'Bad request from ACROSS API',
                errorId: 'existing-error-id',
            }),
        } as unknown as Response);

        await callApi(fetchMock, '/test', {
            method: 'POST',
        });

        expect(logger.warn).not.toHaveBeenCalled();
    });

    it('should use fallback message and unknown code when expected fields are missing', async () => {
        fetchMock.mockResolvedValue({
            ok: false,
            status: 418,
            json: vi.fn().mockResolvedValue({}),
        } as unknown as Response);

        await callApi(fetchMock, '/test', {
            method: 'GET',
        });

        expect(error).toHaveBeenCalledWith(418, {
            message: 'Unknown API error',
            code: 'UNKNOWN_ERROR',
            errorId: fakeGeneratedId,
        });
    });

    it('should log warning when expected error fields are missing', async () => {
        const body = { someOtherDetail: 'This is the real reason!' };

        fetchMock.mockResolvedValue({
            ok: false,
            status: 418,
            json: vi.fn().mockResolvedValue(body),
        } as unknown as Response);

        await callApi(fetchMock, '/test', {
            method: 'GET',
        });

        expect(logger.warn).toHaveBeenCalledWith({ body }, 'API error response does not contain expected fields. Using fallback message.');
    });

    it('should use response text as message when JSON parsing fails', async () => {
        const responseText = 'This is a plain text error message';

        fetchMock.mockResolvedValue({
            ok: false,
            status: 500,
            text: vi.fn().mockResolvedValue(responseText),
        } as unknown as Response);

        await callApi(fetchMock, '/test', {
            method: 'GET',
        });

        expect(error).toHaveBeenCalledWith(500, {
            message: responseText,
            code: 'INTERNAL_SERVER_ERROR',
            errorId: fakeGeneratedId,
        });
    });

    it('should log debug message when JSON parsing fails', async () => {
        const responseText = 'This is a plain text error message';

        fetchMock.mockResolvedValue({
            ok: false,
            status: 500,
            text: vi.fn().mockResolvedValue(responseText),
            json: vi.fn().mockRejectedValue(new Error('JSON parsing error')),
        } as unknown as Response);

        await callApi(fetchMock, '/test', {
            method: 'GET',
        });

        expect(logger.debug).toHaveBeenCalledWith(
            expect.objectContaining({
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                msg: expect.any(String),
            })
        );
    });
});
