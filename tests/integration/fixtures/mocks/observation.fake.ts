import { DepthUnit } from '$lib/types/across/Depth';
import type { Observation } from '$lib/types/across/Observation';
import dataBuilder from './dataBuilder';

export default dataBuilder<Observation>({
    id: 'observation-1',
    schedule_id: 'schedule-1',
    instrument_id: 'instrument-1',
    object_name: 'crab nebula',
    pointing_position: { ra: 123.45, dec: 67 },
    date_range: { begin: '2024-01-01T00:00:00', end: '2024-01-02T00:00:00' },
    external_observation_id: 'ext-123',
    type: 'imaging',
    status: 'planned',
    pointing_angle: 45,
    exposure_time: 120,
    reason: 'Test reason',
    description: 'Test description',
    proposal_reference: 'PR-123',
    object_position: { ra: 123.45, dec: 67 },
    depth: { value: 20, unit: DepthUnit.AB_MAG },
    bandpass: { type: 'ENERGY', unit: 'keV', filter_name: 'filter-1', min: 1, max: 10 },
    category: 'fixed',
    tracking_type: 'sidereal',
    created_on: new Date('2024-01-01T00:00:00'),
    created_by_id: 'user-1',
});
