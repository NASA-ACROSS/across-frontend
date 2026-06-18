import { aesGcmDecrypt } from '$lib/utils/crypto/crypto-aes-gcm';
import { type Cookies } from '@sveltejs/kit';
import { webserverCredentialsManager } from '$lib/utils/across/auth/WebserverCredentialsManager';

// propagate user cookie data into event response to be consumed by client application
export async function decryptCookie<T>(cookies: Cookies, cookieName: string): Promise<T | undefined> {
    const encryptedCookie = cookies.get(cookieName);

    if (encryptedCookie) {
        const decodedEncryptedCookie = decodeURIComponent(encryptedCookie);
        const decryptedCookie = await aesGcmDecrypt(decodedEncryptedCookie, webserverCredentialsManager.secret);
        return JSON.parse(decryptedCookie) as T;
    }
}
