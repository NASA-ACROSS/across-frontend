import { describe, expect, it } from 'vitest';
import normalizeSearchParams from './normalizeSearchParams';

describe('normalizeSearchParams', () => {
    it('should normalize FormData into URLSearchParams', () => {
        const formData = new FormData();
        formData.append('foo', '123.45');

        const params = normalizeSearchParams(formData);

        expect(params).toBeInstanceOf(URLSearchParams);
    });

    it('should normalize URLSearchParams input', () => {
        const input = new URLSearchParams({
            foo_bar: 'some value',
        });

        const params = normalizeSearchParams(input);

        expect(params.get('foo_bar')).toBe('some value');
    });

    it('should omit empty string values', () => {
        const formData = new FormData();
        formData.append('foo', '');

        const params = normalizeSearchParams(formData);

        expect(params.has('foo')).toBe(false);
    });

    it.each([
        ['foo', 'false'],
        ['foo', '0'],
    ])('should preserve falsey-but-valid string values when given %s=%s', (key, value) => {
        const formData = new FormData();
        formData.append(key, value);

        const params = normalizeSearchParams(formData);

        expect(params.get(key)).toBe(value);
    });

    it('should set array params with their key repeated for each value', () => {
        const formData = new FormData();
        formData.append('ids', ['id-1', 'id-2'].join(','));

        const params = normalizeSearchParams(formData, { ids: 'array' });

        expect(params.toString()).toBe('ids=id-1&ids=id-2');
    });
});
