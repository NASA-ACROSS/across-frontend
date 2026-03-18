type ParamSource = URLSearchParams | FormData;

/**
 * Normalizes search parameters from either `URLSearchParams` or `FormData` into a standardized `URLSearchParams` object.
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
export default function normalizeSearchParams(source: ParamSource, paramTypes?: Record<string, 'array'>): URLSearchParams {
    const params = new URLSearchParams();

    for (const [key, value] of source.entries()) {
        if (value === undefined || value === null || value === '') continue;

        if (typeof value === 'string') {
            if (paramTypes?.[key] === 'array') {
                const items = String(value)
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean);

                for (const item of items) params.append(key, item);
            } else {
                params.append(key, String(value));
            }
        }
    }

    return params;
}
