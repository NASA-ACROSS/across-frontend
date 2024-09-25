<script lang="ts">
    import { applyAction, enhance } from '$app/forms';
    import { goto, invalidateAll } from '$app/navigation';
    import type { UserGroupAdminUser } from '$lib/types/User/UserGroupAdminUser';
    import type { UserGroupRole } from '$lib/types/User/UserGroupRole';
    import type { SubmitFunction } from '@sveltejs/kit';

    export let users: UserGroupAdminUser[];
    export let selectedUser: UserGroupAdminUser | undefined;
</script>

<div class="py-md-1 col">
    <h2>
        <i class="bx bx-group opacity-70 me-2"></i>Users in Group
    </h2>
    <div>
        {#if !users?.length}
            <p>No Users in Group</p>
        {:else}
            {#each users as user}
                <!-- Button addon on the right -->
                <div class="input-group d-flex py-1">
                    <span
                        class={`input-group-text flex-grow-1 ${selectedUser?.email == user?.email ? 'text-success' : ''}`}
                    >
                        {user.email}
                    </span>
                    <button
                        class={`btn ${selectedUser?.email == user?.email ? 'btn-success' : 'btn-primary'}`}
                        type="button"
                        on:click={() => {
                            if (selectedUser == user) {
                                selectedUser = undefined;
                            } else {
                                selectedUser = user;
                            }
                        }}
                    >
                        Select
                    </button>
                </div>
            {/each}
        {/if}
    </div>
</div>
