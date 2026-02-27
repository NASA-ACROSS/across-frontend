import { DateTime } from 'luxon';

export const prettyUTC = (time: string | undefined) => {
    if (!time) return 'none';

    let dt = DateTime.fromISO(time, { zone: 'utc' });

    // Check if milliseconds start with a digit > 5 to round up
    const millisecondsStr = dt.millisecond.toString();
    if (millisecondsStr.charAt(0) > '4') {
        dt = dt.plus({ seconds: 1 }).set({ millisecond: 0 });
    }

    return dt.toFormat('yyyy-MM-dd HH:mm:ss');
};
