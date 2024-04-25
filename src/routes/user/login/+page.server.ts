import { CONFIG } from '../../../config/config.js';
import { fail } from '@sveltejs/kit'

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();

        const email = data.get('email') as string;

        const options = {
            method: 'POST',
        }

        let response;
        try {
            response = await fetch(`${CONFIG.API_URL}/api/v1/across/user/login/${email}`, options)
        } catch (error) {
            console.log(`ERROR: logging in user [${email}] at [${Date.now()}]`, JSON.stringify(error))
            return fail(500, { error: error.message, fail: true });
        }

        if (response.status == 500) {
            console.log(`ERROR: logging in user [${email}] at [${Date.now()}] with status code [500]`)
            return fail(500, { fail: true });
        }

        if (response.status == 400) {
            const errorResponse = await response.json();
            console.log(`ERROR: logging in user NOT FOUND [${email}] at [${Date.now()}] with status code [400]`)
            return fail(500, { error: errorResponse.detail, invalidEmail: true });
        }

        return { success: true, email }
    }
}