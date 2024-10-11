import { writable } from 'svelte/store';

// computed css height of the nav bar when inspected with dev tools is 93px
export const navHeight = writable(93);
