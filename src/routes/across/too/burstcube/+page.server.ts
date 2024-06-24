import { base } from '$app/paths';
import { getUserRoles } from '$lib/utils/user/getUserRoles';
import { redirect } from '@sveltejs/kit';
import { CONFIG } from '../../../../config/config';

const OBSERVATORY = 'burstcube';
const LIMITS = [10, 25, 50, 100];

/** @type {import('./$types').PageServerLoad} */
export async function load({ url, locals }) {
    const userPage = +url.searchParams.get('page') || 1;
    const userLimit = +url.searchParams.get('limit') || LIMITS[1];

    let page = userPage;
    if (+page < 1) page = 1;

    let limit = userLimit;
    if (+limit > 100) limit = 100;
    if (+limit < 10) limit = 10;

    // handle custom user input number for limit in address bar as part of request
    const userLimits = structuredClone(LIMITS);
    if (!userLimits.includes(limit)) {
        userLimits.push(limit);
        userLimits.sort((a, b) => a - b);
    }

    // Redirect on load when user is not logged in
    const user = locals.user;
    if (!user) {
        throw redirect(303, `${base}/user/login`);
    }
    // Get roles and store them
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

    // const queryString = '?' + new URLSearchParams({ id: user.id.toString() });
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
    const table = resJson?.entries?.filter((obj) =>
        Object.entries(obj).some(
            (item: any) => item != undefined && item != null && item != ''
        )
    );

    return {
        slug: OBSERVATORY,
        userRoles: user.roles,
        table,
        page,
        limit,
        limits: userLimits,
    };
}
