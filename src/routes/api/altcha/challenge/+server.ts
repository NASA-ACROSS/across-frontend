import { altcha } from '$lib/utils/altcha/altcha';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = () => altcha.challengeHandler();
