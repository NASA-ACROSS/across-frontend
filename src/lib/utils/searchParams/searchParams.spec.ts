import { describe, expect, it } from 'vitest';
import searchParams, { type ParamTypes } from './searchParams';

describe('searchParams', () => {
    describe('serialize', () => {
        it('should serialize FormData into URLSearchParams', () => {
            const formData = new FormData();
            formData.append('foo', '123.45');

            const params = searchParams.serialize(formData);

            expect(params).toBeInstanceOf(URLSearchParams);
        });

        it.each([
            ['foo', 'some_value'],
            ['bar', '1,2,3'],
        ])('should serialize URLSearchParams inputs %s=%s', (key, value) => {
            const inputParams = new URLSearchParams({ [key]: value });

            const params = searchParams.serialize(inputParams);

            expect(params.get(key)).toBe(value);
        });

        it.each([
            ['spongebob', ['spongebob'], { foo: 'string' }],
            [456, ['456'], { foo: 'number' }],
            [true, ['true'], { foo: 'boolean' }],
            [[1, 2, 3], ['1', '2', '3'], { foo: 'array' }],
            [['red', 'blue', 'green'], ['red', 'blue', 'green'], { foo: 'array' }],
        ])('should serialize an object with %s as %s: "%s"', (value, expected, types) => {
            const params = searchParams.serialize({ foo: value }, types as ParamTypes<unknown>);

            expect(params.getAll('foo')).toStrictEqual(expected);
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
