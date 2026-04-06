import guards from '$lib/utils/guards';

export const load = () => {
    guards.localOnlyRoute();

    return {};
};
