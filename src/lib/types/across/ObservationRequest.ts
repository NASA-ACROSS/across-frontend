interface Coordinate {
    ra: number;
    dec: number;
}

interface UnitValue {
    value: number;
    unit: string;
}

interface NullableEndDateRange {
    begin: string;
    end?: string | null;
}

interface ProposalInfo {
    name: string;
    code: string;
    id?: string;
}

export interface Version {
    number?: number;
    id: string;
    created_on: string;
}

export type ObservationRequestCreate = {
    science_justification: string;
    object_name: string;
    object_coordinates: Coordinate;
    object_brightness: UnitValue;
    object_position_error?: number | null;
    observation_window: NullableEndDateRange;
    exposure_time: number;
    anonymize: boolean;
    is_too: boolean;
    instrument_id: string;
    instrument_configuration?: Record<string, unknown> | null;
    parent_id?: string | null;
    proposal?: ProposalInfo;
};

export type ObservationRequest = {
    science_justification: string;
    object_name: string;
    object_coordinates: Coordinate;
    object_brightness: UnitValue;
    observation_window: NullableEndDateRange;
    exposure_time: number;
    anonymize: boolean;
    is_too: boolean;
    instrument_id: string;
    id: string;
    parent_id: string;
    status: string;
    status_reason: string;
    versions: ObservationRequest[] | Version[] | null;

    created_on: string;
    created_by_id: string;
    modified_on: null;
    modified_by_id: null;

    object_position_error?: number | null;
    instrument_configuration?: Record<string, unknown> | null;
    proposal?: ProposalInfo;
};
