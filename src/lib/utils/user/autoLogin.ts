import { PUBLIC_CONFIG } from '$config/config.public';
import type { MagicLinkDTO } from '$lib/types/auth/MagicLinkDTO';
import { redirect } from '@sveltejs/kit';

/**
 * Local only redirect for auto login. The data from register/login contains the magic link, rather than being sent to the email.
 */
export const autoLogin = (dto?: MagicLinkDTO | null) => {
    if (PUBLIC_CONFIG.BUILD_VERSION === 'local' && dto?.magic_link) {
        redirect(302, dto.magic_link);
    }
};
