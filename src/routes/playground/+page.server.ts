import guards from '$lib/utils/guards';

export const load = () => {
    guards.localOnlyRoute();

    return {};
};

export const actions = {
    dialogConfirm: () => {
        console.log('Dialog Confirm!');
        return { dialogSuccess: true };
    },
};
