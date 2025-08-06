<script lang="ts">
    import ArrowButton from '$lib/components/ArrowButton.svelte';
    import type { GroupUser } from '$lib/types/User/GroupUser';

    export let users: GroupUser[];
    export let selectedUser: GroupUser | undefined;
</script>

<div class="flex-col w-1/3">
    <h2 class="text-2xl font-bold pb-2">
        <i class="bx bx-group opacity-70 me-2"></i>Users in Group
    </h2>
    <div>
        {#if !users?.length}
            <p>No Users in Group</p>
        {:else}
            <ul class="list bg-base-200">
                {#each users as user}
                    <li
                        class={`list-row flex justify-between ${selectedUser?.email == user?.email ? 'bg-nasa-red-tint underline' : ''}`}
                    >
                        <div>
                            <div class="text-lg">
                                {user?.first_name}
                                {user?.last_name}
                            </div>
                            <div
                                class="text-md uppercase font-semibold opacity-60"
                            >
                                <a class="link" href="mailto:{user.email}"
                                    >{user.email}</a
                                >
                            </div>
                        </div>

                        <ArrowButton
                            direction={selectedUser == user ? 'left' : 'right'}
                            on:click={() => {
                                if (selectedUser == user) {
                                    selectedUser = undefined;
                                } else {
                                    selectedUser = user;
                                }
                            }}
                        ></ArrowButton>
                    </li>
                {/each}
            </ul>
        {/if}
    </div>
</div>
