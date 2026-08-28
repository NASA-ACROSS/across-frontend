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
