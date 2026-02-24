/**
 * Represents a resolved object name with coordinates and resolver information.
 *
 * @property ra - Right ascension coordinate, in degrees.
 * @property dec - Declination coordinate, in degrees.
 * @property resolver - Resolver used for resolving the coordinates.
 */
export interface NameResolver {
    ra: number;
    dec: number;
    resolver: string;
}
