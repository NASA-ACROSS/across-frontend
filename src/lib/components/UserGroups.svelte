<script lang="ts">
    import { base } from '$app/paths';
    import type { UserGroup } from '$lib/types/User';

    export let userGroups: UserGroup[];
</script>

{#if userGroups && userGroups.length}
    <section class="py-2 bg-secondary">
        <div class="container py-md-3">
            <h3><i class="bx bx-group opacity-70 me-2"></i>My User Groups</h3>
            {#each userGroups as userGroup}
                <div class="input-group-lg d-flex flex-row">
                    {#if userGroup.is_admin}
                        <a
                            class="btn btn-lg btn-primary me-3"
                            href="{base}/user/{userGroup.short_name}/user-group-manage"
                        >
                            <i class="bx bx-edit me-2"></i> Manage
                        </a>
                    {/if}
                    <span class="input-group-text">
                        {userGroup.name}
                    </span>
                </div>
            {/each}
        </div>
    </section>
{/if}
