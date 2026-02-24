// See https://kit.svelte.dev/docs/types#app

import type { UserCredentialsCookie } from '$lib/types/User/UserCredentialsCookie';

// for information about these interfaces
declare global {
    namespace App {
        interface Error {
            message: string;
            errorId: string;
        }
        interface Locals {
            user: UserCredentialsCookie | undefined;
        }
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }
}

export {};
