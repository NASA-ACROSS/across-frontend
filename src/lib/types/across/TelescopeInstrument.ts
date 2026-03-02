export type TelescopeInstrument = {
    id: string;
    name: string;
    short_name: string;
    filters: Filter[];
    footprints: unknown[];
    constraints: unknown[];
};

type Filter = {
    id: string;
    created_on: string;
    name: string;
    peak_wavelength: number;
    min_wavelength: number;
    max_wavelength: number;
    is_operational: true;
    sensitivity_depth_unit: string;
    sensitivity_depth: number;
    sensitivity_time_seconds: number;
    reference_url: string;
    instrument_id: string;
};
