import type { DateRange } from './DateRange';
import { DateTime } from 'luxon';

export interface Conference {
    name: string;
    location: string;
    dateRange: DateRange;
    abstractDeadline?: DateTime;
    registrationDeadline?: DateTime;
    url: string;
}
