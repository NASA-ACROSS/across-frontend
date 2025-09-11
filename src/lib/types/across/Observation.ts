import type { Bandpass } from './Bandpass';

type Position = {
    ra: number; // Range 0-360 degrees
    dec: number; // Range -90 to +90 degrees
};

type DateRange = {
    begin: string; // ISO date format
    end: string; // ISO date format
};

type Depth = {
    value: number;
    unit: string;
};

type ObservationType = 'imaging' | 'timing' | 'spectroscopy' | 'slew';

type ObservationTrackingType = 'sidereal' | 'solar-system-object-tracking' | 'fixed_az_el_transit';

type ObservationStatus = 'planned' | 'scheduled' | 'unscheduled' | 'performed' | 'aborted';

type ObservationCategory = 'fixed' | 'coordinated' | 'window' | 'other';

export type Observation = {
    instrument_id: string;
    object_name: string;
    pointing_position?: Position;
    date_range: DateRange;
    external_observation_id: string;
    type: ObservationType;
    status: ObservationStatus;
    pointing_angle?: number;
    exposure_time?: number;
    reason?: string;
    description?: string;
    proposal_reference?: string;
    object_position?: Position;
    depth?: Depth;
    bandpass: Bandpass;
    t_resolution?: number;
    em_res_power?: number;
    o_ucd?: string;
    pol_states?: string;
    pol_xel?: string;
    category?: ObservationCategory;
    priority?: number;
    tracking_type?: ObservationTrackingType;
    id: string;
    schedule_id: string;
    created_on: Date;
    created_by_id: string;
};

export type ObservationsResponse = {
    total_number: number;
    page: number;
    page_limit: number;
    items: Observation[];
};

enum WavelengthUnit {
    NANOMETER = 'nm',
    ANGSTROM = 'angstrom',
    MICRON = 'um',
    MILLIMETER = 'mm',
}
enum EnergyUnit {
    eV = 'eV',
    keV = 'keV',
    MeV = 'MeV',
    GeV = 'GeV',
    TeV = 'TeV',
}
enum FrequencyUnit {
    Hz = 'Hz',
    kHz = 'kHz',
    MHz = 'MHz',
    GHz = 'GHz',
    THz = 'THz',
}

enum DepthUnit {
    AB_MAG = 'ab_mag',
    VEGA_MAG = 'vega_mag',
    FLUX_ERG = 'flux_erg',
    FLUX_JY = 'flux_jy',
}

export type ObservationRequest = {
    external_id?: string;
    schedule_ids?: string[];
    observatory_ids?: string[];
    telescope_ids?: string[];
    instrument_ids?: string[];
    status?: ObservationStatus | undefined;
    proposal?: string;
    object_name?: string;
    date_range_begin?: Date;
    date_range_end?: Date;
    bandpass_min?: number;
    bandpass_max?: number;
    bandpass_type?: WavelengthUnit | EnergyUnit | FrequencyUnit;
    cone_search_ra?: number;
    cone_search_dec?: number;
    cone_search_radius?: number;
    type?: ObservationType;
    depth_value?: number;
    depth_unit?: DepthUnit;
};
