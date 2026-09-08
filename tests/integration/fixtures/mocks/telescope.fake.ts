import { type Telescope } from '../../../../src/lib/types/across';
import dataBuilder from './dataBuilder';

export default dataBuilder<Telescope>({
    id: 'telescope-1',
    name: 'SANDY EYE',
    short_name: 'EYE',
    schedule_cadences: [],
    created_on: new Date('2024-01-01T00:00:00'),
    observatory: {
        id: 'observatory-1',
        name: 'SANDY TREEDOME',
        short_name: 'DOME',
    },
    instruments: [
        {
            id: 'instrument-1',
            name: 'Instrument 1',
            short_name: 'INST1',
            filters: [],
            footprints: [],
            constraints: [],
            visibility_type: {
                EPHEMERIS: 'ephemeris',
                VO: 'vo',
                CUSTOM: 'custom',
            },
            observation_strategy: {
                POINTED: 'pointed',
                SURVEY: 'survey',
            },
            is_observation_request_enabled: false,
        },
    ],
});
