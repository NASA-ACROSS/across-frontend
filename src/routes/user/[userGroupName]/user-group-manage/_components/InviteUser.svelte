<script lang="ts">
    import { applyAction, enhance } from '$app/forms';
    import { goto, invalidateAll } from '$app/navigation';
    import Section from '$lib/components/Section.svelte';
    import FormSubmitFeedback from '$lib/components/FormSubmitFeedback.svelte';
    import EmailInput from '$lib/components/inputs/EmailInput.svelte';
    import type { UserGroup } from '$lib/types/User/UserGroup';
    import type { ActionData, SubmitFunction } from '../$types';

    export let form: ActionData;
    export let group: UserGroup;

    $: isSubmittingInvite = false;

    const enhancedForm: SubmitFunction = ({ formData }) => {
        // render state changes
        isSubmittingInvite = true;

        // set form data to send, specific to this form
        formData.set('groupId', group.id.toString());

        return async ({ result }) => {
            isSubmittingInvite = false;

            if (result.status === 200) {
                // rerun all `load` functions, following the successful update
                await invalidateAll();
                await applyAction(result);
            } else if (result.type === 'redirect') {
                goto(result.location, { invalidateAll: true, noScroll: true });
            } else {
                await applyAction(result);
            }
        };
    };
</script>

<Section title="Invite User to Group" icon="envelope">
    <form method="post" action="?/inviteUser" use:enhance={enhancedForm}>
        <EmailInput
            value={''}
            autocomplete={false}
            includeButton={true}
            isLoading={isSubmittingInvite && form?.type !== 'success'}
            placeholder="Enter an email to invite to {group.short_name}"
            btnTxt="Invite"
        />
        <FormSubmitFeedback action="inviteUser" />
    </form>
</Section>
