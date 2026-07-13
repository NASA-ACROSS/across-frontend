import logger from '$lib/logger';

export const validate = (input: string, regex: RegExp, inputName: string) => {
    const match = input.match(regex);

    // reject if nothing matches
    if (match === null) {
        logger.warn({ msg: `Failed to match the input against the regex. No match found.`, input, inputName, regex });

        return null;
    }

    // reject if match is not at the start of the string
    if (match.index !== 0) {
        logger.warn({
            msg: `Failed to match the input against the regex. Match is not at the start of string.`,
            input,
            inputName,
            regex,
        });

        return null;
    }

    return match[0] ?? null;
};
