import { base } from '$app/paths';
import { getUserRoles } from '$lib/utils/user/getUserRoles';
import { fail, redirect } from '@sveltejs/kit';
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

    // when limit or page go out of bounds, use this boolean to trigger redirect to rewrite params
    let refresh = false;

    // parse and set min/max bounds for page and limit params
    let userPage = parseInt(url?.searchParams?.get('page') as string);
    let userLimit = parseInt(url?.searchParams?.get('limit') as string);

    if (Number.isNaN(userPage)) {
        userPage = 1;
        refresh = true;
    }
    if (Number.isNaN(userLimit)) {
        userLimit = 1;
        refresh = true;
    }

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
            page: page.toString(),
            limit: limit.toString(),
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

    // prepare the data table request
    const params = {
        limit,
        offset: ((+page - 1) * +limit).toString(),
    };
    const requestParams = new URLSearchParams(params);
    const targetUrl = `${CONFIG.API_URL}/api/v1/${OBSERVATORY.toLowerCase()}/too?${requestParams}`;
    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${user.api_token}`,
        },
    };

    // make the data table request
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

    // decode data table response and format return object
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

export const actions = {
    modifyStatus: async (event) => {
        const { request, locals } = event;
        const user: UserCredentialsCookie = locals.user;
        const data = await request.formData();

        const id = data.get('id') as string;
        const action = data.get('action') as string;

        console.log(
            `${OBSERVATORY} ToO action: ${action} for id ${id} by user ${user.email} at [${Date.now()}]`
        );

        if (!id) {
            console.error(
                `ERROR: [${OBSERVATORY}] ${action} ToO failed, no id [${id}] specified in request for [${user.email}] at [${Date.now()}]`
            );
            return fail(500, {
                fail: true,
                action,
            });
        }

        const VALID_ACTIONS = ['Approved', 'Declined', 'Requested'];
        if (!VALID_ACTIONS.includes(action)) {
            console.error(
                `ERROR: [${OBSERVATORY}]  ${action} ToO failed, invalid action [${action}] specified in request for [${user.email}] at [${Date.now()}]`
            );
            return fail(500, {
                fail: true,
                action,
            });
        }

        const userData = {
            id,
            status: action,
        };

        const USER_API_TOKEN = user.api_token;

        const options: RequestInit = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${USER_API_TOKEN}`,
            },
        };

        const requestParams = new URLSearchParams(userData);

        try {
            await fetch(
                `${CONFIG.API_URL}/api/v1/${OBSERVATORY}/too/${id}?${requestParams.toString()}`,
                options
            );
        } catch (error: any) {
            console.error(
                `ERROR: catch ${OBSERVATORY} ToO failed to run modifyStatus action with id [${id}] for [${user.email}] at [${Date.now()}]`,
                JSON.stringify(error)
            );
            return fail(500, {
                error: 'Something went wrong, please try again shortly. If this error persists please contact support.',
                fail: true,
                action,
            });
        }

        return { success: true, action };
    },
};
