import { base } from '$app/paths';
import { getUserRoles } from '$lib/utils/user/getUserRoles';
import { redirect } from '@sveltejs/kit';
import { CONFIG } from '../../../../config/config';

const OBSERVATORY = 'burstcube';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    const user = locals.user;
    // Redirect on load when user is not logged in
    if (!user) {
        throw redirect(303, `${base}/user/login`);
    }

    const roles = await getUserRoles(user);
    user.roles = roles.approved_roles;

    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${user.api_token}`,
        },
    };

    // const queryString = '?' + new URLSearchParams({ id: user.id.toString() });
    const url = `${CONFIG.API_URL}/api/v1/${OBSERVATORY.toLowerCase()}/too`;

    let response;
    try {
        response = await fetch(url, options);
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
    const table = resJson.entries.filter((obj) =>
        Object.entries(obj).some(
            (item: any) => item != undefined && item != null && item != ''
        )
    );

    return {
        slug: OBSERVATORY,
        userRoles: user.roles,
        table,
    };
}
