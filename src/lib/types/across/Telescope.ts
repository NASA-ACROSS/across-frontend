export type Telescope = {
    id: string;
    created_on: Date;
    name: string;
    short_name: string;
    schedule_cadences: ScheduleCadence[];
    observatory: TelescopeObservatory;
    instruments: TelescopeInstrument[];
    latest_data_date?: string;
};

export type TelescopeDict = {
    [telescopeId: Telescope['id']]: Telescope;
};

type TelescopeInstrument = {
    id: string;
    name: string;
    short_name: string;
};

type TelescopeObservatory = {
    id: string;
    name: string;
    short_name: string;
};

type ScheduleCadence = {
    cron: string;
    schedule_status: 'planned' | 'scheduled' | 'performed';
};
