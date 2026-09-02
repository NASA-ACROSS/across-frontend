<script lang="ts">
    import { applyAction, enhance } from '$app/forms';
    import { goto, invalidateAll } from '$app/navigation';
    import Section from '$lib/components/Section.svelte';
    import FormSubmitFeedback from '$lib/components/FormSubmitFeedback.svelte';
    import type { GroupInvite } from '$lib/types/User/GroupInvite';
    import type { SubmitFunction } from '@sveltejs/kit';

    interface Props {
        invitedUsers: GroupInvite[];
    }

    let { invitedUsers }: Props = $props();

    // Svelte 5 migration (B9): `$state()` with no argument is `undefined` until assigned,
    // and svelte-check 4 now types that honestly (`export let` used to launder it). The
    // annotation has to admit undefined; use sites guard with `?.`.
    let currentUserInvite: GroupInvite | undefined = $state();

    const enhancedForm: SubmitFunction = ({ formData }) => {
        // set form data to send, specific to this form
        // guarded because `currentUserInvite` is now typed as possibly undefined (B9);
        // this handler only runs once an invite row has been chosen.
        formData.set('userGroupId', currentUserInvite?.group.id.toString() || '');
        formData.set('userInviteId', currentUserInvite?.id.toString() || '');

        return async ({ result }) => {
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

<Section title="Recently Invited Users" icon="inbox">
    <div>
        {#if !invitedUsers?.length}
            <p>No pending invites</p>
        {:else}
            {#each invitedUsers as userInvite}
                <form id="{userInvite.id}-invite" method="post" use:enhance={enhancedForm} action="?/deleteInvite">
                    <FormSubmitFeedback action="deleteInvite" />
                    <div class="input-group-lg flex flex-row gap-3 pb-3">
                        <button
                            class="btn btn-primary"
                            type="submit"
                            onclick={() => {
                                currentUserInvite = userInvite;
                            }}
                        >
                            <i class="bx bx-trash opacity-70"></i>
                            Delete Invitation</button
                        >
                        <span class="self-center text-lg">
                            {userInvite.receiver.email}
                        </span>
                    </div>
                </form>
            {/each}
        {/if}
    </div>
</Section>
