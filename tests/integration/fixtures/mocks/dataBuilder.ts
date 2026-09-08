/**
 * Creates a data builder function that generates objects with optional overrides.
 * @template T - The type of object being built
 * @param original - The original/default object template
 * @returns A function that accepts partial overrides and returns a merged object
 */
export default <T>(original: T): ((overrides?: Partial<T>) => T) =>
    (overrides?: Partial<T>) =>
        Object.assign({}, original, overrides);
