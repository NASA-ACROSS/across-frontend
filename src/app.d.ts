// See https://kit.svelte.dev/docs/types#app

import type { UserCredentialsCookie } from '$lib/types/UserCredentialsCookie';

// for information about these interfaces
declare global {
    namespace App {
        // interface Error { }
        interface Locals {
            user: UserCredentialsCookie | undefined;
        }
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }
}

export {};
