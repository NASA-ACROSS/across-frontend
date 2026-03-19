import { getObservatories } from '$lib/utils/across/getObservatories';
import { getTelescopes } from '$lib/utils/across/getTelescopes';
import type { PageServerLoad } from './$types';
import type { UserCredentialsCookie } from '$lib/types/User/UserCredentialsCookie';
import type { Observatory } from '$lib/types/across/Observatory';
import type { Telescope } from '$lib/types/across/Telescope';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, params, cookies }) => {
    const userCookie = locals?.user as UserCredentialsCookie;

    const observatories: Observatory[] = await getObservatories(userCookie, cookies, { name: params?.observatoryShortName });
    if (!observatories.length) {
        error(404, {
            message: params?.observatoryShortName + ' Not Found',
            errorId: crypto.randomUUID(),
        });
    }

    const observatory: Observatory = observatories[0];

    const telescopes: Telescope[] = [];
    const telescopeIds = observatory.telescopes.map((telescope) => telescope.id);
    for (const id of telescopeIds) {
        const [telescope] = await getTelescopes(userCookie, cookies, { id });

        telescopes.push(telescope);
    }

    return {
        slug: params.observatoryShortName,
        observatory,
        telescopes,
    };
};
