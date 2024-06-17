import type { UserCredentialsCookie } from "$lib/types/UserCredentialsCookie";
import { error, fail } from "@sveltejs/kit";
import { CONFIG } from "../../../config/config";
import type { UserRequestRoles } from "$lib/types/UserRequestRoles";

export const getUserRoles = async (user: UserCredentialsCookie) => {

    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${user.api_token}`,
        },
    };

    const queryString = '?' + new URLSearchParams({ id: user.id.toString() });

    let response;
    try {
        response = await fetch(
            `${CONFIG.API_URL}/api/v1/across/user_request_roles/${queryString}`,
            options
        );
    } catch (e: any) {
        console.error(
            `ERROR: catch getting user roles [${user.email}] at [${Date.now()}]`,
            JSON.stringify(e)
        );
        throw new Error("Unexpeted Error while fetching user roles");
    }

    // catch known errors from api and hide error from user
    const errorCodes = [500, 404];
    if (errorCodes.includes(response.status)) {
        console.error(
            `ERROR: getting user roles [${user.email}] at [${Date.now()}] with status code [${response.status}]`
        );
        throw new Error("Unexpeted Error while fetching user roles");
    }

    let roles: UserRequestRoles = await response.json();
    return roles;
}