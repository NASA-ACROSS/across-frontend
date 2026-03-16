import { localOnlyRoute } from '$lib/utils/dev/localOnlyRoute';

export const load = () => {
    localOnlyRoute();

    return {};
};
