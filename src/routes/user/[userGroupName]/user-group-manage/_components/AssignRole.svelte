<script lang="ts">
    import { applyAction, enhance } from '$app/forms';
    import { goto, invalidateAll } from '$app/navigation';
    import type { UserGroupAdminUser } from '$lib/types/User/UserGroupAdminUser';
    import type { UserGroupRole } from '$lib/types/User/UserGroupRole';
    import type { SubmitFunction } from '@sveltejs/kit';

    export let user: UserGroupAdminUser;
    export let roles: UserGroupRole[];
    let selectedRole: UserGroupRole;

    // noRolesToAdd when every assignable role is found in the user's role list
    $: noRolesToAdd = roles?.every((role) =>
        user?.roles?.find((userRole) => userRole?.id == role?.id)
    );

    let isAssigningRole = false;

    const enhancedForm: SubmitFunction = ({ formData }) => {
        isAssigningRole = true;
        // set form data to send, specific to this form
        formData.set('userId', user.id.toString());
        formData.set('roleId', selectedRole.id.toString());

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
        <i class="bx bx-user-circle opacity-70 me-2"></i>Assignable Roles
    </h2>
    <div>
        {#if !user}
            <p>Select a user to add roles</p>
        {:else if noRolesToAdd}
            <h5>No roles left to assign.</h5>
            <h5>User has all assignable roles.</h5>
        {:else}
            {#each roles as role}
                <form
                    id="{role.id}-role"
                    method="post"
                    use:enhance={enhancedForm}
                    action="?/removeUser"
                >
                    <div class="input-group-lg d-flex flex-row pb-3">
                        <button
                            class="btn btn-lg btn-success me-3"
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
                        <span class="input-group-text">
                            {role.name}
                        </span>
                    </div>
                </form>
            {/each}
        {/if}
    </div>
</div>
