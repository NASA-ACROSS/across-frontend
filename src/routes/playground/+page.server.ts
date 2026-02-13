import { error } from '@sveltejs/kit';
import { PUBLIC_CONFIG } from '$config/config.public';

export const load = () => {
    if (PUBLIC_CONFIG.BUILD_VERSION !== 'local') {
        error(404);
    }

    return {};
};
