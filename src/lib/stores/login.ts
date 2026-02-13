// for more documentation on svelte stores see https://learn.svelte.dev/tutorial/writable-stores
import { writable } from 'svelte/store';

// this boolean can be imported and read/written from anywhere in the application
export const loggedIn = writable(false);
