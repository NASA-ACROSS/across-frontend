import { describe, expect, it } from 'vitest';
import { aesGcmEncrypt, aesGcmDecrypt } from './crypto-aes-gcm';

describe('crypto-aes-gcm', () => {
    it('should encrypt and decrypt correctly', async () => {
        const plaintext = 'Hello, World!';
        const password = 'my_secret_password';

        const ciphertext = await aesGcmEncrypt(plaintext, password);
        const decryptedText = await aesGcmDecrypt(ciphertext, password);

        expect(decryptedText).toBe(plaintext);
    });

    it('should fail to decrypt with wrong password', async () => {
        const plaintext = 'Hello, World!';
        const password = 'my_secret_password';
        const wrongPassword = 'wrong_password';

        const ciphertext = await aesGcmEncrypt(plaintext, password);

        await expect(aesGcmDecrypt(ciphertext, wrongPassword)).rejects.toThrow();
    });

    it('should produce different ciphertexts for the same plaintext and password', async () => {
        const plaintext = 'Hello, World!';
        const password = 'my_secret_password';

        const ciphertext1 = await aesGcmEncrypt(plaintext, password);
        const ciphertext2 = await aesGcmEncrypt(plaintext, password);

        expect(ciphertext1).not.toBe(ciphertext2);
    });

    it.each(['-', '_', ':', ';', '\\n'])(`should encrypt successfully when the plaintext has '%s' characters`, async (char) => {
        const plaintext = `Hello${char}World!`;
        const password = 'my_secret_password';

        const ciphertext = await aesGcmEncrypt(plaintext, password);
        const decryptedText = await aesGcmDecrypt(ciphertext, password);

        expect(decryptedText).toBe(plaintext);
    });
});
