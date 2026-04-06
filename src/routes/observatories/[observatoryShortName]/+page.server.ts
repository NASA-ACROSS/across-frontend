import { getObservatories } from '$lib/utils/across/getObservatories';
import { getTelescopes } from '$lib/utils/across/getTelescopes';
import type { PageServerLoad } from './$types';
import type { Observatory } from '$lib/types/across/Observatory';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, fetch }) => {
    const observatories: Observatory[] = await getObservatories(fetch, {
        name: params?.observatoryShortName,
    });

    if (!observatories.length) {
        error(404, {
            message: params?.observatoryShortName + ' Not Found',
            errorId: crypto.randomUUID(),
        });
    }

    // pull the first observatory since there is only one per name. (as of writing this)
    const observatory: Observatory = observatories[0];

    const telescopeIds = observatory.telescopes.map((telescope) => telescope.id);

    const telescopes = await getTelescopes(fetch, {
        ids: telescopeIds,
        include_filters: true,
        include_footprints: true,
    });

    return {
        slug: params.observatoryShortName,
        observatory,
        telescopes,
    };
};
