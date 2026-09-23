import { describe, it, expect } from 'vitest';
import parseErrorResponse, { DEFAULT_ERROR_MESSAGE } from './parseErrorResponse';
import type { AcrossApiErrorResponseBody } from '$lib/types/error/AcrossApiErrorResponseBody';

describe('parseErrorResponse', () => {
    it('should return the detail string if detail is a string', () => {
        const errorResponse = { detail: 'An error occurred' };
        expect(parseErrorResponse(errorResponse)).toBe('An error occurred');
    });

    it('should return a formatted string if detail is an array', () => {
        const errorResponse = {
            detail: [
                { loc: ['query', 'instrument_ids'], msg: 'At least one instrument must be selected', type: 'missing' },
                { loc: ['query', 'date_range_begin'], msg: 'Invalid date', type: 'invalid' },
            ],
        };
        expect(parseErrorResponse(errorResponse)).toBe(
            'instrument_ids: At least one instrument must be selected; date_range_begin: Invalid date'
        );
    });

    it('should return a default error message if the structure is unexpected', () => {
        const errorResponse = { unexpected: 'structure' };
        // Force type assertion to AcrossApiErrorResponseBody to simulate unexpected structure
        expect(parseErrorResponse(errorResponse as unknown as AcrossApiErrorResponseBody)).toBe(DEFAULT_ERROR_MESSAGE);
    });
});
