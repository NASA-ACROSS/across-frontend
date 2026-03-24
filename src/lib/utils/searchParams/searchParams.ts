type ParamSource = URLSearchParams | FormData | Record<string, unknown>;
type ParamType = 'array' | 'string' | 'number' | 'boolean';
export type ParamTypes<T> = {
    [K in keyof Partial<T>]?: 'array' | 'string' | 'number' | 'boolean';
};

/**
 * Serializes search parameters from either `URLSearchParams` or `FormData` into a standardized `URLSearchParams` object.
 *
 * Handles filtering of empty/null/undefined values and supports array parameter expansion by splitting comma-separated strings.
 *
 * @param source - The source of parameters, either `URLSearchParams` or `FormData`.
 * @param paramTypes - Optional record mapping parameter keys to their expected types. Currently supports 'array' type for comma-separated values.
 * @returns A new `URLSearchParams` object with normalized parameters. Array-type parameters are expanded into multiple entries with the same key.
 *
 * @example
 * // Basic usage with `URLSearchParams`
 * const params = new URLSearchParams('name=John&age=30');
 * const normalized = normalizeSearchParams(params);
 *
 * @example
 * // With array parameter expansion
 * const params = new URLSearchParams('tags=javascript,typescript,nodejs');
 * const normalized = normalizeSearchParams(params, { tags: 'array' });
 * // Results in: tags=javascript&tags=typescript&tags=nodejs
 */
const serialize = <T>(source: ParamSource, keys?: ParamTypes<T>): URLSearchParams => {
    const params = new URLSearchParams();

    const sourceArr = source instanceof URLSearchParams || source instanceof FormData ? source.entries() : Object.entries(source);

    for (const [key, value] of sourceArr) {
        if (value === undefined || value === null || value === '') continue;

        if (Array.isArray(value)) {
            for (const item of value) params.append(key, String(item));
        } else if (typeof value === 'string') {
            if (keys?.[key as keyof T] === 'array') {
                const items = String(value)
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean);

                for (const item of items) params.append(key, item);
            } else {
                params.append(key, String(value));
            }
        } else if (typeof value === 'number' || typeof value === 'boolean') {
            params.append(key, String(value));
        }
    }

    return params;
};

const deserializeHandlers = {
    array: (v) => {
        if (!v) return [];

        return v
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean);
    },
    number: (v) => Number(v),
    boolean: (v) => Boolean(v === 'true'),
    string: (v) => v,
} satisfies Record<ParamType, (v: string) => unknown>;

/**
 * Deserializes URL search parameters into a typed object.
 *
 * @template T - The type of the deserialized object.
 * @param urlParams - The URLSearchParams object to deserialize.
 * @param paramTypes - Optional object defining the expected types for each parameter key.
 *                 If not provided, all values default to 'string' type.
 * @returns A partial object of type T with deserialized parameters as properties.
 *
 * @example
 * const params = new URLSearchParams('count=5&active=true&tags=js,ts&ids=1&ids=2');
 * const result = deserialize(params, { count: 'number', active: 'boolean', tags: 'array' });
 * // result: { count: 5, active: true, tags: ['js', 'ts'], ids: ['1', '2'] }
 */
const deserialize = <T>(urlParams: URLSearchParams, paramTypes: ParamTypes<T> = {}): T => {
    return Array.from(urlParams.entries()).reduce((acc, [key, value]) => {
        const name = key as keyof T;
        const expectedType = (paramTypes[name] ?? 'string') as ParamType;

        const handler = deserializeHandlers[expectedType];
        const parsed = handler(value);

        if (expectedType === 'array') {
            if (!acc[name]) acc[name] = [] as unknown as T[keyof T];

            if (parsed) {
                // for arrays with duplicate keys, we need to merge values into a single array
                (acc[name] as unknown as string[]).push(...(parsed as string[]));
            }
        } else {
            acc[name] = parsed as T[keyof T];
        }

        return acc;
    }, {} as T);
};

export default {
    serialize,
    deserialize,
};
