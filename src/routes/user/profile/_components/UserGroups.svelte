<script lang="ts">
    import { enhance } from '$app/forms';
    import { resolve } from '$app/paths';
    import Section from '$lib/components/Section.svelte';
    import type { User } from '$lib/types/User/User';
    import type { UserGroup } from '$lib/types/User/UserGroup';
    import { isAdmin } from '$lib/utils/user/isAdmin';

    export let user: User;
    export let userGroups: UserGroup[];
    export let leaveUserGroup: UserGroup;
    export let enhancedForm;
</script>

{#if userGroups && userGroups?.length}
    <Section title="My User Groups" icon="group">
        {#each userGroups as userGroup}
            <!-- Button addon on the right -->
            <form method="post" use:enhance={enhancedForm} action="?/leaveGroup">
                <div class="input-group flex p-3 gap-3 bg-base-200">
                    <div class="text-xl text-center label text-primary-content btn btn-primary btn-active cursor-default">
                        <div>
                            {userGroup.name}
                        </div>
                    </div>
                    <div class="flex justify-between w-full">
                        {#if isAdmin(user, userGroup)}
                            <a class="btn btn-info text-lg" href={resolve('/user/[userGroupName]/user-group-manage', { userGroupName: userGroup.short_name })}>
                                <i class="bx bx-edit me-2"></i> Manage
                            </a>
                        {/if}
                        <!-- Leave Group button -->
                        <button
                            class={`btn btn-accent text-lg`}
                            type="submit"
                            on:click={() => {
                                leaveUserGroup = userGroup;
                            }}
                        >
                            {#if leaveUserGroup?.id == userGroup?.id}
                                <span class="loading loading-spinner" role="status" aria-hidden="true"></span>
                            {:else}
                                <i class="bx bx-log-out opacity-70 me-2"></i>
                                Leave Group
                            {/if}
                        </button>
                    </div>
                </div>
            </form>
        {/each}
    </Section>
{/if}
