<script lang="ts">
    import { applyAction, enhance } from '$app/forms';
    import { goto, invalidateAll } from '$app/navigation';
    import type { UserGroupAdminUser } from '$lib/types/User/UserGroupAdminUser';
    import type { UserGroupRole } from '$lib/types/User/UserGroupRole';
    import type { SubmitFunction } from '@sveltejs/kit';

    export let selectedUser: UserGroupAdminUser | undefined;
    export let assignableRoles: UserGroupRole[];

    let selectedRole: UserGroupRole;
    let isRemovingRole = false;

    // cross match assignable roles with user's to create a list of user's current roles
    $: userRoles = selectedUser?.roles?.reduce((roles, userRole) => {
        let matchingRole = assignableRoles?.find(
            (role) => role.id == userRole.id
        );

        if (matchingRole) roles.push(matchingRole);

        return roles;
    }, [] as UserGroupRole[]);

    const enhancedForm: SubmitFunction = ({ formData }) => {
        isRemovingRole = true;
        // set form data to send, specific to this form
        formData.set('roleId', selectedRole?.id?.toString() || '');
        formData.set('userId', selectedUser?.id?.toString() || '');

        return async ({ result }) => {
            isRemovingRole = false;
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

<div class="py-md-1 ms-3 me-3 col">
    <h2>
        <i class="bx bx-user-pin opacity-70 me-2"></i>Selected User
    </h2>
    {#if !selectedUser}
        <p>Select a User to Manage</p>
    {:else}
        <div class="card border-secondary">
            <div class="card-body">
                <h4 class="card-title">{selectedUser.full_name}</h4>
                <p class="card-text fs-md text-muted">
                    {selectedUser.email}
                </p>
            </div>
            {#if userRoles?.length}
                <h5 class="ps-3 mt-2">Roles:</h5>
                <ul class="list-group list-group-flush">
                    {#each userRoles as userRole}
                        <li
                            class="list-group-item d-flex justify-content-between"
                        >
                            <span class="fs-lg p-1">{userRole?.name}</span>
                            <form
                                id="{userRole.id}-role"
                                method="post"
                                use:enhance={enhancedForm}
                                action="?/removeRole"
                            >
                                <button
                                    class="btn btn-sm btn-danger me-2"
                                    type="submit"
                                    on:click={() => {
                                        selectedRole = userRole;
                                    }}
                                    >{#if isRemovingRole}
                                        <span
                                            class="spinner-border spinner-border-sm"
                                            role="status"
                                            aria-hidden="true"
                                        ></span>
                                    {:else}
                                        <i class="bx bx-trash opacity-70 me-2"
                                        ></i>
                                        Remove Role
                                    {/if}</button
                                >
                            </form>
                        </li>
                    {/each}
                </ul>
            {/if}
            <div class="card-body">
                <div class="d-flex flex-row-reverse">
                    <a href="#" class="btn btn-sm btn-danger">
                        <i class="bx bx-trash opacity-70 me-2"></i>
                        Remove User From Group
                    </a>
                </div>
            </div>
        </div>
    {/if}
</div>
