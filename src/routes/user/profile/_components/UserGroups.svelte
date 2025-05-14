<script lang="ts">
    import { enhance } from '$app/forms';
    import { base } from '$app/paths';
    import type { User } from '$lib/types/User/User';
    import type { UserGroup } from '$lib/types/User/UserGroup';
    import { isAdmin } from '$lib/utils/user/isAdmin';

    export let user: User;
    export let userGroups: UserGroup[];
    export let leaveUserGroup: UserGroup;
    export let enhancedForm;
</script>

{#if userGroups && userGroups?.length}
    <section class="py-2 bg-secondary">
        <div class="container py-md-3">
            <h3><i class="bx bx-group opacity-70 me-2"></i>My User Groups</h3>
            {#each userGroups as userGroup}
                <!-- Button addon on the right -->
                <form
                    method="post"
                    use:enhance={enhancedForm}
                    action="?/leaveGroup"
                >
                    <div class="input-group d-flex py-1">
                        <span class={`input-group-text flex-grow-1`}>
                            {userGroup.name}
                        </span>
                        {#if isAdmin(user, userGroup)}
                            <a
                                class="btn btn-primary"
                                href="{base}/user/{userGroup.short_name}/user-group-manage"
                            >
                                <i class="bx bx-edit me-2"></i> Manage
                            </a>
                        {/if}
                        <!-- Leave Group button -->
                        <button
                            class={`btn btn-danger`}
                            type="submit"
                            on:click={() => {
                                leaveUserGroup = userGroup;
                            }}
                        >
                            {#if leaveUserGroup?.id == userGroup?.id}
                                <span
                                    class="spinner-border spinner-border-sm"
                                    role="status"
                                    aria-hidden="true"
                                ></span>
                            {:else}
                                <i class="bx bx-trash opacity-70 me-2"></i>
                                Leave Group
                            {/if}
                        </button>
                    </div>
                </form>
            {/each}
        </div>
    </section>
{/if}
