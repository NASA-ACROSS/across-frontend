export type WindowConstraintReason = {
    start_reason: string;
    end_reason: string;
};

export type WindowConstraintTime = {
    datetime: string; // ISO date format
    constraint: string;
    observatory_id: string;
};

export type Window = {
    begin: WindowConstraintTime;
    end: WindowConstraintTime;
};

export type VisibilityWindow = {
    window: Window;
    max_visibility_duration: number;
    constraint_reason: WindowConstraintReason;
};

export type VisibilityResponse = {
    instrument_id: string;
    visibility_windows: VisibilityWindow[];
};

export type JointVisibilityWindowResponse = {
    instrument_ids: string[];
    visibility_windows: VisibilityWindow[];
    observatory_visibility_windows: {
        [instrument_id: string]: VisibilityWindow[];
    };
};
