import { CONFIG } from '../../../config/config.js';
import { fail } from '@sveltejs/kit'

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();

        const firstname = data.get('firstname') as string;
        const lastname = data.get('lastname') as string;
        const username = data.get('username') as string;
        const email = data.get('email') as string;

        const user_post_data = {
            'firstname': firstname,
            'lastname': lastname,
            'username': username,
            'email': email,
            'roles': "user"
        }


        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Bearer ${CONFIG.API_TOKEN}`
            },
            body: new URLSearchParams(user_post_data)
        }

        console.log(options)
        console.log(CONFIG.API_URL)

        let response;
        try {
            response = await fetch(`${CONFIG.API_URL}/api/v1/across/user/`, options)
        } catch (error) {
            console.log(`ERROR: logging in registering [${email}] at [${Date.now()}]`, JSON.stringify(error))
            return fail(500, { error: error.message, fail: true });
        }

        if (response.status == 403) {
            console.log(`ERROR: API not accessible or no API TOKEN not valid`)
            return fail(500, { fail: true });
        }

        if (response.status == 409) {
            const errorResponse = await response.json();
            console.log(`ERROR: logging in user NOT FOUND [${email}] at [${Date.now()}] with status code [409]`)
            return fail(500, { error: errorResponse.detail, userAlreadyExists: true });
        }

        if (response.status == 500) {
            console.log(`ERROR: logging in user [${email}] at [${Date.now()}] with status code [500]`)
            return fail(500, { fail: true });
        }

        return { success: true, firstname, lastname, username, email}
    }
}