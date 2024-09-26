/**
 * https://kit.svelte.dev/docs/advanced-routing#matching
 *
 * Svelte route matcher for the route /dev/
 * Ensures this route is only available when in dev mode
 *
 * Explanation of route folder name [dev=dev]
 * the left hand variable containing the route slug (variable named dev)
 * will be tested using the right hand param matcher declared by filename (this file)
 *
 * In other words, make sure the slug matches some criteria as defined by this function
 */

import { dev } from '$app/environment';
import type { ParamMatcher } from '@sveltejs/kit';

// the slug route contained within the left hand "dev" variable mentioned above
const routeName = 'dev';

export const match: ParamMatcher = (param) => {
    return dev && param.includes(routeName);
};
