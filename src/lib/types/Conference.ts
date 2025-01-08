import type { DateRange } from './DateRange';
import { DateTime } from 'luxon';

export interface Conference {
    name: string;
    location: string;
    dateRange?: DateRange;
    url: string;
    description?: string;
    abstractDeadline?: DateTime;
    registrationDeadline?: DateTime;
}
