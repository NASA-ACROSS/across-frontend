import type { JPLParameters, TLEParameters } from './EphemerisParameters';
import type { ObservatoryTelescope } from './ObservatoryTelescope';

export type Observatory = {
    id: string;
    created_on: string;
    name: string;
    short_name: string;
    type: string;
    telescopes: ObservatoryTelescope[];
    reference_url: string;
    ephemeris_types: [{ ephemeris_type: string; priority: number; parameters: TLEParameters | JPLParameters }];
};
