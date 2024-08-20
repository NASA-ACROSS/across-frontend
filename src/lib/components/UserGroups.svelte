<script lang="ts">
    import { base } from '$app/paths';
    import type { UserGroup } from '$lib/types/User';

    export let userGroups: UserGroup[];
</script>

<section class="py-2 bg-secondary">
    <div class="container py-md-3">
        <h3>My User Groups</h3>
        <div
            class="password-toggle d-flex flex-sm-row flex-row mb-3 needs-validation"
        >
            <div
                class="input-group me-sm-3 mb-sm-0 mb-3 d-flex flex-column justify-content-start"
            >
                <div>
                    {#each userGroups as userGroup}
                        <ul class="list-group d-flex flex-sm-row flex-row">
                            <li class="list-group-item">
                                {userGroup.name}
                            </li>
                            {#if userGroup.is_admin}
                                <a
                                    href="{base}/user/{userGroup.short_name}/user-group-manage"
                                >
                                    <button class="btn btn-lg btn-danger"
                                        >Manage</button
                                    >
                                </a>
                            {/if}
                        </ul>
                    {/each}
                </div>
            </div>
            <div
                class="input-group me-sm-3 mb-sm-0 mb-3 d-flex flex-column justify-content-start"
            ></div>
        </div>
    </div>
</section>
