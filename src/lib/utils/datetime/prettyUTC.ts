import { DateTime } from 'luxon';

export const prettyUTC = (time?: string) => {
    if (!time) return 'none';

    let dt = DateTime.fromISO(time, { zone: 'utc' });

    dt = dt.plus({ milliseconds: 500 }).startOf('second');

    return dt.toFormat('yyyy-MM-dd HH:mm:ss');
};
