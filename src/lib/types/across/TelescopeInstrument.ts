export type TelescopeInstrument = {
    id: string;
    name: string;
    short_name: string;
    filters: Filter[];
    footprints: unknown[];
    constraints: unknown[];
    visibility_type: VisibilityType;
    observation_strategy: ObservationStrategy;
    is_observation_request_enabled: boolean;
};

type VisibilityType = {
    EPHEMERIS: 'ephemeris';
    VO: 'vo';
    CUSTOM: 'custom';
};

type ObservationStrategy = {
    POINTED: 'pointed';
    SURVEY: 'survey';
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
