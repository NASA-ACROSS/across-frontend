import { fail } from '@sveltejs/kit';
import { CONFIG } from '../../../config/config.js';

export const actions = {
    default: async ({ url }) => {
        const verificationKey = url.searchParams.get('verification_key');

        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Bearer ${CONFIG.API_TOKEN}`
            },
        }

        // trade verification key for api key
        let response;
        try {
            response = await fetch(`${CONFIG.API_URL}/api/v1/across/user/login-verify/${verificationKey}`, options)
        } catch (error: any) {
            console.log(`ERROR: login-verify for verificationKey [${verificationKey}] at [${Date.now()}]`, JSON.stringify(error))
            return fail(500, { error: error?.message, fail: true });
        }

        // short circuit for error status
        if (response.status != 200) {
            console.log(`ERROR: login-verify for verificationKey [${verificationKey}] at time [${Date.now()}] with status code [${response.status}] with status text ${response.statusText}`, response)
            return {}
        }

        const credentials = await response?.json();

        return {
            credentials
        }
    }
}