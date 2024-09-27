import type { PageServerLoad } from './$types';
import { generateLinks } from '$lib/utils/routing/generateLinks';

export const load: PageServerLoad = () => {
    // current filepath is needed, hardcoded for now
    const links = generateLinks('src/routes/[dev=dev]/components/');

    return {
        links,
    };
};
