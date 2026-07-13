// See https://kit.svelte.dev/docs/types#app

import type { TokensCookie, UserCredentialsCookie } from '$lib/types/User/UserCredentialsCookie';

// for information about these interfaces
declare global {
    namespace App {
        interface Error {
            message: string;
            errorId: string;
            code: string;
        }
        interface Locals {
            user?: UserCredentialsCookie;
            tokens?: TokensCookie;
        }
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }
}

export {};
