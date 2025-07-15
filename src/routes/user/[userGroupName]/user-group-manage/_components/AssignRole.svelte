<script lang="ts">
    import { applyAction, enhance } from '$app/forms';
    import { goto, invalidateAll } from '$app/navigation';
    import type { GroupUser } from '$lib/types/User/GroupUser';
    import type { GroupRole } from '$lib/types/User/GroupRole';
    import type { SubmitFunction } from '@sveltejs/kit';
    import type { UserGroup } from '$lib/types/User/UserGroup';

    export let user: GroupUser | undefined;
    export let group: UserGroup;
    let roles: GroupRole[] = group.roles;
    let selectedRole: GroupRole;

    // noRolesToAdd when every assignable role is found in the user's role list
    $: noRolesToAdd = roles?.every((role) =>
        user?.group_roles?.find((userRole) => userRole?.id == role?.id)
    );

    $: assignableRoles = roles?.reduce((assignableRoles, role) => {
        // if user does not have this role add it to assignable
        if (!user?.group_roles?.find((userRole) => userRole?.id == role?.id)) {
            assignableRoles.push(role);
        }
        return assignableRoles;
    }, [] as GroupRole[]);

    let isAssigningRole = false;

    const enhancedForm: SubmitFunction = ({ formData }) => {
        isAssigningRole = true;
        // set form data to send, specific to this form
        formData.set('userId', user?.id?.toString() || '');
        formData.set('roleId', selectedRole.id.toString());
        formData.set('groupId', group.id.toString());

        return async ({ result }) => {
            isAssigningRole = false;
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

<div class="py-md-1 col">
    <h2>
        <i class="bx bx-shield opacity-70 me-2"></i>Assignable Roles
    </h2>
    <div>
        {#if !user}
            <p>Select a user to add roles</p>
        {:else if noRolesToAdd}
            <h5>No roles left to assign.</h5>
            <h5>User has all assignable roles.</h5>
        {:else}
            {#each assignableRoles as role}
                <form
                    id="{role.id}-role"
                    method="post"
                    use:enhance={enhancedForm}
                    action="?/assignRole"
                >
                    <div class="input-group flex flex-row pb-3">
                        <button
                            class="btn btn-primary"
                            type="submit"
                            on:click={() => {
                                selectedRole = role;
                            }}
                            >{#if isAssigningRole}
                                <span
                                    class="spinner-border spinner-border-sm"
                                    role="status"
                                    aria-hidden="true"
                                ></span>
                            {:else}
                                Assign Role
                            {/if}</button
                        >
                        <span class="input-group-text flex-fill">
                            {role.name}
                        </span>
                    </div>
                </form>
            {/each}
        {/if}
    </div>
</div>
