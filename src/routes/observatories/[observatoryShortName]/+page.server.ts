import { getObservatories } from '$lib/utils/across/getObservatories';
import { getTelescopes } from '$lib/utils/across/getTelescopes';
import type { PageServerLoad } from './$types';
import type { Observatory } from '$lib/types/across/Observatory';
import type { Telescope } from '$lib/types/across/Telescope';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, fetch }) => {
    const observatories: Observatory[] = await getObservatories(fetch, {
        slug: { type: 'name', value: params?.observatoryShortName },
        params: { include_filters: true },
    });

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
        const [telescope] = await getTelescopes(fetch, { id });

        telescopes.push(telescope);
    }

    return {
        slug: params.observatoryShortName,
        observatory,
        telescopes,
    };
};
