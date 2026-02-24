import { aesGcmDecrypt } from '$lib/utils/crypto/crypto-aes-gcm';
import { CONFIG } from '../../config/config';
import type { UserCredentialsCookie } from '$lib/types/User/UserCredentialsCookie.js';
import { redirect, type RequestEvent } from '@sveltejs/kit';
import { resolve } from '$app/paths';

// propagate user cookie data into event response to be consumed by client application
export async function handleLogin(
    event: RequestEvent & {
        locals: { user: UserCredentialsCookie | undefined };
    }
) {
    const encryptedUserCookie = event.cookies.get('user-login');
    try {
        if (encryptedUserCookie) {
            const decryptedCookie = await aesGcmDecrypt(encryptedUserCookie, CONFIG.API_TOKEN);
            const user = JSON.parse(decryptedCookie) as UserCredentialsCookie;

            if (decryptedCookie) {
                event.locals.user = user;
            }
        }
        return event;
    } catch (e) {
        console.error('[ERROR] handleLogin failed to decrypt or parse cookie', e);
        event.cookies.delete('user-login', { path: '/' });
        event.locals.user = undefined;

        return redirect(302, resolve('/user/logout'));
    }
}
