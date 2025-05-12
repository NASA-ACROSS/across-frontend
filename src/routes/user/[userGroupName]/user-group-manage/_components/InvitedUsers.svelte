<script lang="ts">
    import { applyAction, enhance } from '$app/forms';
    import { goto, invalidateAll } from '$app/navigation';
    import type { UserGroupInvite } from '$lib/types/User/UserGroupInvite';
    import type { SubmitFunction } from '@sveltejs/kit';

    export let invitedUsers: UserGroupInvite[];

    let currentUserInvite: UserGroupInvite;

    const enhancedForm: SubmitFunction = ({ formData }) => {
        // set form data to send, specific to this form
        formData.set('userGroupId', currentUserInvite.group.id.toString());
        formData.set('userInviteId', currentUserInvite.id.toString());

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

<div class="container py-md-1 py-3">
    <h2 class="border-bottom pb-4">
        <i class="bx bx-time opacity-70 me-2"></i>Recently Invited Users
    </h2>
    <div>
        {#if !invitedUsers?.length}
            <p>No pending invites</p>
        {:else}
            {#each invitedUsers as userInvite}
                <form
                    id="{userInvite.id}-invite"
                    method="post"
                    use:enhance={enhancedForm}
                    action="?/deleteInvite"
                >
                    <div class="input-group-lg d-flex flex-row pb-3">
                        <button
                            class="btn btn-lg btn-danger me-3"
                            type="submit"
                            on:click={() => {
                                currentUserInvite = userInvite;
                            }}>Delete Invitation</button
                        >
                        <span class="input-group-text">
                            {userInvite.receiver.email}
                        </span>
                    </div>
                </form>
            {/each}
        {/if}
    </div>
</div>
