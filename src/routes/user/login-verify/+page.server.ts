import { fail } from '@sveltejs/kit';
import { CONFIG } from '../../../config/config.js';

/** @type {import('./$types').PageLoad} */
export async function load({ url }) {
    // retrieve verification key search param from URL
    const verificationKey = url.searchParams.get('verification_key');
    const options = {
        method: 'POST',
    }

    // trade verification key for api key
    let response;
    try {
        response = await fetch(`${CONFIG.API_URL}/api/v1/across/user/login-verify/${verificationKey}`, options)
    } catch (error) {
        console.log(`ERROR: login-verify for verificationKey [${verificationKey}] at [${Date.now()}]`, JSON.stringify(error))
        return fail(500, { error: error?.message, fail: true });
    }

    const credentials = await response?.json();

    return {
        credentials
    }
}