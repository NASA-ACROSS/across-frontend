<script lang="ts">
    import { applyAction, enhance } from '$app/forms';
    import { goto, invalidateAll } from '$app/navigation';
    import type { UserGroupAdminUser } from '$lib/types/User/UserGroupAdminUser';
    import type { UserGroupRoles } from '$lib/types/User/UserGroupRoles';
    import type { SubmitFunction } from '@sveltejs/kit';

    export let userGroupId: number;
    export let users: UserGroupAdminUser[];
    export let roles: UserGroupRoles[];

    let currentUser: UserGroupAdminUser;

    const enhancedForm: SubmitFunction = ({ formData }) => {
        // set form data to send, specific to this form
        formData.set('userGroupId', userGroupId.toString());
        formData.set('userInviteId', currentUser.id.toString());

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

<div class="container py-md-1">
    <h2>
        <i class="bx bx-user-circle opacity-70 me-2"></i>Users in Group
    </h2>
    <div>
        {#if !users?.length}
            <p>No pending invites</p>
        {:else}
            {#each users as user}
                <form
                    id="{user.id}-user"
                    method="post"
                    use:enhance={enhancedForm}
                    action="?/removeUser"
                >
                    <div class="input-group-lg d-flex flex-row pb-3">
                        <button
                            class="btn btn-lg btn-danger me-3"
                            type="submit"
                            on:click={() => {
                                currentUser = user;
                            }}>Remove User</button
                        >
                        <span class="input-group-text">
                            {user.username}
                        </span>
                    </div>
                </form>
            {/each}
        {/if}
    </div>
</div>
