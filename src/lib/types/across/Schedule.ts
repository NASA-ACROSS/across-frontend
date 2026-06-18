import type { Observation } from './Observation';

export type Schedule = {
    telescope_id: string;
    name: string;
    date_range: {
        begin: string;
        end: string;
    };
    status: 'planned' | 'scheduled' | 'performed';
    external_id?: string;
    fidelity: 'low' | 'high';
    id: string;
    observations: Observation[];
    observation_count: number;
    created_on: string;
    created_by_id: string;
    checksum: string;
};
