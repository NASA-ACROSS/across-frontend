import type { TelescopeInstrument } from './TelescopeInstrument';
import type { TelescopeObservatory } from './TelescopeObservatory';

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

type ScheduleCadence = {
    cron: string;
    schedule_status: 'planned' | 'scheduled' | 'performed';
};
