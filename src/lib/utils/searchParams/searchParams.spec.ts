import { describe, expect, it } from 'vitest';
import searchParams from './searchParams';

describe('searchParams', () => {
    describe('serialize', () => {
        it('should normalize FormData into URLSearchParams', () => {
            const formData = new FormData();
            formData.append('foo', '123.45');

            const params = searchParams.serialize(formData);

            expect(params).toBeInstanceOf(URLSearchParams);
        });

        it('should normalize URLSearchParams input', () => {
            const input = new URLSearchParams({
                foo_bar: 'some value',
            });

            const params = searchParams.serialize(input);

            expect(params.get('foo_bar')).toBe('some value');
        });

        it('should omit empty string values', () => {
            const formData = new FormData();
            formData.append('foo', '');

            const params = searchParams.serialize(formData);

            expect(params.has('foo')).toBe(false);
        });

        it.each([
            ['foo', 'false'],
            ['foo', '0'],
        ])('should preserve falsey-but-valid string values when given %s=%s', (key, value) => {
            const formData = new FormData();
            formData.append(key, value);

            const params = searchParams.serialize(formData);

            expect(params.get(key)).toBe(value);
        });

        it('should set array params with their key repeated for each value', () => {
            const formData = new FormData();
            formData.append('ids', ['id-1', 'id-2'].join(','));

            const params = searchParams.serialize(formData, { ids: 'array' });

            expect(params.toString()).toBe('ids=id-1&ids=id-2');
        });
    });

    describe('deserialize', () => {
        it('should convert URLSearchParams into an object', () => {
            const urlParams = new URLSearchParams({
                foo: '123',
                bar: 'true',
                baz: 'some string',
            });

            const deserialized = searchParams.deserialize(urlParams, {
                foo: 'number',
                bar: 'boolean',
                baz: 'string',
            });

            expect(deserialized).toEqual({
                foo: 123,
                bar: true,
                baz: 'some string',
            });
        });

        it('should handle array parameters with repeated keys', () => {
            const urlParams = new URLSearchParams();
            urlParams.append('ids', 'id-1');
            urlParams.append('ids', 'id-2');

            const deserialized = searchParams.deserialize(urlParams, { ids: 'array' });

            expect(deserialized).toEqual({
                ids: ['id-1', 'id-2'],
            });
        });

        it('should handle array parameters with comma-separated values', () => {
            const urlParams = new URLSearchParams({
                ids: 'id-1,id-2',
            });

            const deserialized = searchParams.deserialize(urlParams, { ids: 'array' });

            expect(deserialized).toEqual({
                ids: ['id-1', 'id-2'],
            });
        });

        it('should return an empty array for array parameters with no value', () => {
            const urlParams = new URLSearchParams({
                ids: '',
            });

            const deserialized = searchParams.deserialize(urlParams, { ids: 'array' });

            expect(deserialized).toEqual({
                ids: [],
            });
        });

        it('should default to string type for unspecified keys', () => {
            const urlParams = new URLSearchParams({
                foo: '123',
                bar: 'true',
                baz: 'some string',
            });

            const deserialized = searchParams.deserialize(urlParams);

            expect(deserialized).toEqual({
                foo: '123',
                bar: 'true',
                baz: 'some string',
            });
        });
    });
});
