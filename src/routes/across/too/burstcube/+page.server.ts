import { base } from '$app/paths';
import { getUserRoles } from '$lib/utils/user/getUserRoles';
import { redirect } from '@sveltejs/kit';
import { CONFIG } from '../../../../config/config';

const OBSERVATORY = 'burstcube';
const LIMITS = [10, 25, 50, 100];

/** @type {import('./$types').PageServerLoad} */
export async function load({ url, locals }) {
    // Redirect on load when user is not logged in
    const user = locals.user;
    if (!user) {
        throw redirect(303, `${base}/user/login`);
    }

    // parse and set min/max bounds for page and limit params
    const userPage = +url.searchParams.get('page') || 1;
    const userLimit = +url.searchParams.get('limit') || LIMITS[1];

    let refresh = false;

    let page = userPage;
    if (+page < 1) {
        page = 1;
        refresh = true;
    }

    let limit = userLimit;
    if (+limit > 100) {
        limit = 100;
        refresh = true;
    }
    if (+limit < 10) {
        limit = 10;
        refresh = true;
    }

    // rewrite user input to within bounds and redirect the browser
    if (refresh) {
        const searchParams = new URLSearchParams({
            limit: limit.toString(),
            page: page.toString(),
        });
        searchParams.set('page', page.toString());
        searchParams.set('limit', limit.toString());
        redirect(303, url.origin + url.pathname + '?' + searchParams);
    }

    // handle custom user input number for limit in address bar not in LIMITS list as part of request
    const userLimits = structuredClone(LIMITS);
    if (!userLimits.includes(limit)) {
        userLimits.push(limit);
        userLimits.sort((a, b) => a - b);
    }

    // Update user roles and store on request locals
    // This makes a separate request instead of implicitly trusting cookie value for roles
    const roles = await getUserRoles(user);
    user.roles = roles.approved_roles;

    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${user.api_token}`,
        },
    };

    const params = {
        limit,
        offset: ((+page - 1) * +limit).toString(),
    };

    const requestParams = new URLSearchParams(params);
    const targetUrl = `${CONFIG.API_URL}/api/v1/${OBSERVATORY.toLowerCase()}/too?${requestParams}`;

    let response;
    try {
        response = await fetch(targetUrl, options);
    } catch (e: any) {
        console.error(
            `ERROR: catch getting TOO data for [${OBSERVATORY}] by [${user.email}] at [${Date.now()}]`,
            JSON.stringify(e)
        );
        throw new Error(
            `Unexpeted Error caught while fetching ${OBSERVATORY} TOO data`
        );
    }

    // catch known errors from api and hide error from user
    const errorCodes = [500, 404];
    if (errorCodes.includes(response.status)) {
        console.error(
            `ERROR: getting TOO data for [${OBSERVATORY}] by [${user.email}] at [${Date.now()}] with status code [${response.status}]`
        );
        throw new Error(
            `Unexpeted Error while fetching ${OBSERVATORY} TOO data`
        );
    }

    const resJson = await response.json();
    const table = resJson.entries;

    return {
        slug: OBSERVATORY,
        userRoles: user.roles,
        table,
        page,
        limit,
        limits: userLimits,
    };
}
