import logger from '$lib/logger';

export const validate = (input: string, regex: RegExp, inputName: string) => {
    const match = input.match(regex);

    // reject if nothing matches
    if (match === null) {
        logger.warn({ input, inputName }, 'No match found. Returning null.');
        return null;
    }

    // reject if match is not at the start of the string
    if (match.index !== 0) {
        logger.warn({ input, inputName }, 'Match is not at the start of string. Returning null.');
        return null;
    }

    return match[0] ?? null;
};
