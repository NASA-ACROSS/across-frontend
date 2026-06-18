import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = () => {
    const health = { status: 'ok' };
    return json(health, { status: 200 });
};
