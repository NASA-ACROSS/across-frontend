<script lang="ts">
    import type { UserGroupUser } from '$lib/types/User/UserGroupUser';

    export let users: UserGroupUser[];
    export let selectedUser: UserGroupUser | undefined;
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
