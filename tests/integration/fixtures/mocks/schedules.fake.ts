import type { Schedule } from '$lib/types/across/Schedule';
import dataBuilder from './dataBuilder';

export default dataBuilder<Schedule>({
    telescope_id: 'telescope-1',
    name: 'Test Schedule',
    date_range: { begin: '2024-01-01T00:00:00', end: '2024-01-02T00:00:00' },
    status: 'scheduled',
    fidelity: 'high',
    id: 'schedule-1',
    observations: [],
    observation_count: 0,
    created_on: '2024-01-01T00:00:00',
    created_by_id: 'user-1',
    checksum: 'checksum-1',
});
