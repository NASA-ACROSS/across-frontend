import { CONFIG } from '../../config/config.js';

// expected data type to be received from api as a data transfer object (DTO)
import type { HelloWorldDTO } from './types/HelloWorldDTO.ts'


/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
    let responseJson: HelloWorldDTO;

    try {
        const res = await fetch(CONFIG.API_URL);
        responseJson = await res.json();
    } catch (e) {
        console.error("Error fetching data from API", e)
        responseJson = { hello: "Error response, no API connection" }
    }

    return responseJson;
}