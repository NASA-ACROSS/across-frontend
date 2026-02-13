import type { RequestEvent } from './$types';
import { getTelescopes } from '$lib/utils/across/getTelescopes';
import { getObservatories } from '$lib/utils/across/getObservatories';
import { getSchedules } from '$lib/utils/across/getSchedules';
import type { UserCredentialsCookie } from '$lib/types/User/UserCredentialsCookie';
import type { Telescope } from '$lib/types/across/Telescope';
import type { Observatory } from '$lib/types/across/Observatory';
import type { Schedule } from '$lib/types/across/Schedule';
import type { Paginate } from '$lib/types/Paginate';
import { DateTime } from 'luxon';

export async function load({ locals, cookies }: RequestEvent) {
    const userCookie = locals?.user as UserCredentialsCookie;
    const telescopes: Telescope[] = await getTelescopes(userCookie, cookies);
    const telescopesDict = telescopes.reduce(
        (dict, telescope) => {
            dict[telescope.id] = telescope;
            return dict;
        },
        {} as { [telescopeId: string]: Telescope }
    );

    const telescopeIds = Object.keys(telescopesDict);

    const observatories: Observatory[] = await getObservatories(userCookie, cookies);

    const schedules: Paginate<Schedule> = await getSchedules(userCookie, cookies, telescopeIds);

    // assign latest_data_date from schedules
    for (const telescopeId of telescopeIds) {
        const latest = telescopesDict[telescopeId].latest_data_date;
        if (!latest) {
            const scheduleForTelescope = schedules.items.find((schedule) => schedule.telescope_id === telescopeId);
            if (scheduleForTelescope) {
                const scheduleDateEnd = DateTime.fromISO(scheduleForTelescope?.date_range.end, { zone: 'UTC' }).toString();
                telescopesDict[telescopeId].latest_data_date = scheduleDateEnd;
            }
        }
    }

    return { telescopesDict, observatories };
}
