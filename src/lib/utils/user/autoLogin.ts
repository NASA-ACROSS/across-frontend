import { PUBLIC_CONFIG } from '$config/config.public';
import type { MagicLinkDTO } from '$lib/types/auth/MagicLinkDTO';
import { redirect } from '@sveltejs/kit';

export const autoLogin = async (response: Response) => {
    if (PUBLIC_CONFIG.BUILD_VERSION == 'local') {
        const { magic_link } = (await response.json()) as MagicLinkDTO;
        redirect(302, magic_link);
    }
};
