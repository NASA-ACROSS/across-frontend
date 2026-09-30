<script lang="ts">
    import ArrowButton from '$lib/components/ArrowButton.svelte';
    import type { GroupUser } from '$lib/types/User/GroupUser';

    // Svelte 5 migration: this used to bind the selected `GroupUser` *object* and
    // compare it by reference (`selectedUser == user`). That is precisely why the parent
    // needed an afterUpdate() hook: when `load` re-runs it hands down freshly deserialised
    // user objects, so the stored reference matches nothing in the new array and the
    // selection silently breaks. The old hook re-resolved it by id after every update.
    // Binding the id instead removes the root cause rather than patching it, and lets the
    // parent derive the user object with $derived.
    interface Props {
        users: GroupUser[];
        /** id of the selected user; bound so the parent can derive the user object from it */
        selectedUserId: string | undefined;
    }

    let { users, selectedUserId = $bindable() }: Props = $props();
</script>

<div class="flex-col w-1/3">
    <h2 class="text-2xl font-bold pb-2">
        <i class="bx bx-group opacity-70 me-2"></i>Users in Group
    </h2>
    <div>
        {#if !users?.length}
            <p>No Users in Group</p>
        {:else}
            <ul class="list list-row bg-base-200">
                {#each users as user}
                    <li class={`list-row  ${selectedUserId == user?.id ? 'bg-nasa-red-tint underline' : ''}`}>
                        <div class="list-col-grow">
                            <button
                                class="flex flex-row justify-between text-start w-full"
                                onclick={() => {
                                    selectedUserId = selectedUserId == user.id ? undefined : user.id;
                                }}
                            >
                                <div>
                                    <div class="text-lg">
                                        {user?.first_name}
                                        {user?.last_name}
                                    </div>
                                    <div class="text-md uppercase font-semibold opacity-60">
                                        <a class="link" href="mailto:{user.email}">{user.email}</a>
                                    </div>
                                </div>

                                <ArrowButton direction={selectedUserId == user.id ? 'left' : 'right'}></ArrowButton>
                            </button>
                        </div>
                    </li>
                {/each}
            </ul>
        {/if}
    </div>
</div>
