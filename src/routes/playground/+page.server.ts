import { error } from '@sveltejs/kit';
import { PUBLIC_CONFIG } from '$config/config.public';

export const load = () => {
    if (PUBLIC_CONFIG.BUILD_VERSION !== 'local') {
        throw error(404, 'Sorry, the page you are looking for does not exist.');
    }

    return {};
};
