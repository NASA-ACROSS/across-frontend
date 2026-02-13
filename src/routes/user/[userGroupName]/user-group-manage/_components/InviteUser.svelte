<script lang="ts">
    import { applyAction, enhance } from '$app/forms';
    import { goto, invalidateAll } from '$app/navigation';
    import Section from '$lib/components/Section.svelte';
    import FormInputFeedback from '$lib/components/FormInputFeedback.svelte';
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
            isLoading={isSubmittingInvite && !form?.successInvite}
            placeholder="Enter an email to invite to {group.short_name}"
            btnTxt="Invite"
        >
            {#if form?.successInvite}
                <FormInputFeedback>User Invited!</FormInputFeedback>
            {/if}
            {#if form?.userInGroup}
                <FormInputFeedback type="warning">User is already invited or in group!</FormInputFeedback>
            {/if}
            {#if form?.invalidEmail}
                <FormInputFeedback type="error">User not found. Please instruct the user to register to create an account.</FormInputFeedback>
            {/if}
            {#if form?.fail}
                <FormInputFeedback type="error">Something went wrong, please try again. If this error persists, contact support.</FormInputFeedback>
            {/if}
        </EmailInput>
    </form>
</Section>
