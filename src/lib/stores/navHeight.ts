import { writable } from 'svelte/store';

// computed css height of the nav bar when inspected with dev tools is 93px
// inspected navbar with dev tools
const baseNavHeightPx = 93;
export const navHeight = writable(baseNavHeightPx);
