<script lang="ts">
    import { applyAction, enhance } from '$app/forms';
    import { goto, invalidateAll } from '$app/navigation';
    import type { GroupUser } from '$lib/types/User/GroupUser';
    import type { GroupRole } from '$lib/types/User/GroupRole';
    import type { SubmitFunction } from '@sveltejs/kit';
    import type { UserGroup } from '$lib/types/User/UserGroup';

    export let selectedUser: GroupUser | undefined;
    export let group: UserGroup;

    $: assignableRoles = group?.roles;
    let selectedRole: GroupRole;
    let isRemovingRole = false;

    // cross match assignable roles with user's to create a list of user's current roles
    $: userRoles = selectedUser?.group_roles?.reduce((roles, userRole) => {
        let matchingRole = assignableRoles?.find((role) => role.id == userRole.id);

        if (matchingRole) roles.push(matchingRole);

        return roles;
    }, [] as GroupRole[]);

    const enhancedForm: SubmitFunction = ({ formData, action }) => {
        isRemovingRole = true;
        if (action.href.includes('removeRole')) {
            // set form data to send, specific to this form
            formData.set('roleId', selectedRole?.id?.toString() || '');
            formData.set('userId', selectedUser?.id?.toString() || '');
            formData.set('groupId', group?.id?.toString() || '');
        } else if (action.href.includes('removeUser')) {
            formData.set('groupId', group?.id?.toString() || '');
            formData.set('userId', selectedUser?.id?.toString() || '');
        }

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

<div class="flex flex-col w-1/3">
    <h2 class="text-2xl font-bold pb-2">
        <i class="bx bx-user-pin opacity-70 me-2"></i>Selected User
    </h2>
    <div class="card bg-base-200 border-secondary">
        {#if !selectedUser}
            <div class="card-body h-20 opacity-70 text-lg">
                <p>Select a User to Manage</p>
            </div>
        {:else}
            <div class="card-body">
                <div class="card-title">
                    {selectedUser.first_name + ' ' + selectedUser.last_name}
                </div>
                <p class="text-xs uppercase font-semibold opacity-60">
                    {selectedUser.email}
                </p>
            </div>
            <div class="card-body">
                {#if userRoles?.length}
                    <h3 class="text-lg font-bold">Roles:</h3>
                    <ul class="list-group list-group-flush">
                        {#each userRoles as userRole}
                            <li class="flex justify-between mb-2">
                                <span class="self-center text-lg">{userRole?.name}</span>
                                <form id="{userRole.id}-role" method="post" use:enhance={enhancedForm} action="?/removeRole">
                                    <button
                                        class="btn btn-sm btn-accent"
                                        type="submit"
                                        on:click={() => {
                                            selectedRole = userRole;
                                        }}
                                        >{#if isRemovingRole && selectedRole == userRole}
                                            <span class="loading loading-spinner" role="status" aria-hidden="true"></span>
                                        {:else}
                                            <i class="bx bx-trash opacity-70"></i>
                                            Remove Role
                                        {/if}</button
                                    >
                                </form>
                            </li>
                        {/each}
                    </ul>
                {:else}
                    <h3 class="text-lg">No Roles Assigned</h3>
                {/if}
            </div>
            <div class="card-body">
                <div class="flex flex-row-reverse">
                    <form id="{selectedUser.id}-remove" method="post" use:enhance={enhancedForm} action="?/removeUser">
                        <button type="submit" class="btn btn-sm btn-primary">
                            <i class="bx bx-log-out opacity-70 me-2"></i>
                            Remove User From Group
                        </button>
                    </form>
                </div>
            </div>
        {/if}
    </div>
</div>
