import type { Bandpass } from './Bandpass';

type Position = {
    ra: number; // Range 0-360 degrees
    dec: number; // Range -90 to +90 degrees
};

type DateRange = {
    begin: string; // ISO date format
    end: string; // ISO date format
};

enum DepthUnit {
    AB_MAG = 'ab_mag',
    VEGA_MAG = 'vega_mag',
    FLUX_ERG = 'flux_erg',
    FLUX_JY = 'flux_jy',
}

type Depth = {
    value: number;
    unit: DepthUnit;
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
