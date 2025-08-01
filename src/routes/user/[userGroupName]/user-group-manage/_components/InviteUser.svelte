<script lang="ts">
    import { applyAction, enhance } from '$app/forms';
    import { goto, invalidateAll } from '$app/navigation';
    import Container from '$lib/components/Container.svelte';
    import EmailInput from '$lib/components/inputs/EmailInput.svelte';
    import type { UserGroup } from '$lib/types/User/UserGroup';
    import type { ActionData, SubmitFunction } from '../$types';

    export let form: ActionData;
    export let group: UserGroup;

    let isSubmittingInvite = false;

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

<Container title="Invite User to Group" icon="envelope">
    <form method="post" action="?/inviteUser" use:enhance={enhancedForm}>
        <EmailInput
            value={''}
            disabled={isSubmittingInvite}
            autocomplete={false}
            includeButton={true}
            isLoading={isSubmittingInvite && !form?.successInvite}
            placeholder="Enter an email to invite to {group.short_name}"
            btnTxt="Invite"
        >
            {#if form?.successInvite}
                <p class="text-sm text-start text-success">User Invited!</p>
            {/if}
            {#if form?.userInGroup}
                <p class="text-sm text-start text-success">
                    User is already invited or in group!
                </p>
            {/if}
            {#if form?.invalidEmail}
                <p class="text-sm text-start text-success">
                    Invalid Email Specified. User not found.
                </p>
            {/if}
            {#if form?.fail}
                <p class="text-sm text-start text-success">
                    Something went wrong, please try again. If this error
                    persists, contact support.
                </p>
            {/if}
        </EmailInput>
    </form>
</Container>
