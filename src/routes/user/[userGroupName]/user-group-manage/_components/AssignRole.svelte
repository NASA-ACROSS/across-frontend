<script lang="ts">
    import { applyAction, enhance } from '$app/forms';
    import { goto, invalidateAll } from '$app/navigation';
    import type { GroupUser } from '$lib/types/User/GroupUser';
    import type { GroupRole } from '$lib/types/User/GroupRole';
    import type { SubmitFunction } from '@sveltejs/kit';
    import type { UserGroup } from '$lib/types/User/UserGroup';
    import Spinner from '$lib/components/Spinner.svelte';
    import FormSubmitFeedback from '$lib/components/FormSubmitFeedback.svelte';

    interface Props {
        user: GroupUser | undefined;
        group: UserGroup;
    }

    let { user, group }: Props = $props();
    let roles: GroupRole[] = group.roles;
    // Svelte 5 migration: `$state()` with no argument is `undefined` until assigned,
    // and svelte-check 4 now types that honestly (`export let` used to launder it). The
    // annotation has to admit undefined; use sites guard with `?.`.
    let selectedRole: GroupRole | undefined = $state();

    // noRolesToAdd when every assignable role is found in the user's role list
    let noRolesToAdd = $derived(roles?.every((role) => user?.group_roles?.find((userRole) => userRole?.id == role?.id)));

    let assignableRoles = $derived(
        roles?.reduce((assignableRoles, role) => {
            // if user does not have this role add it to assignable
            if (!user?.group_roles?.find((userRole) => userRole?.id == role?.id)) {
                assignableRoles.push(role);
            }
            return assignableRoles;
        }, [] as GroupRole[])
    );

    let isAssigningRole = $state(false);

    const enhancedForm: SubmitFunction = ({ formData }) => {
        isAssigningRole = true;
        // set form data to send, specific to this form
        formData.set('userId', user?.id?.toString() || '');
        // guarded because `selectedRole` is now typed as possibly undefined; this
        // handler only runs after a role has actually been picked. Matches the existing
        // `user?.id?.toString() || ''` idiom on the line above.
        formData.set('roleId', selectedRole?.id.toString() || '');
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

<div class="flex flex-col w-1/3">
    <h2 class="text-2xl font-bold pb-2">
        <i class="bx bx-shield opacity-70 me-2"></i>Assignable Roles
    </h2>
    <div class="bg-base-200 card flex flex-col">
        {#if !user}
            <div class="card-body h-20 opacity-70 text-lg">
                <p>Select a User to add roles</p>
            </div>
        {:else if noRolesToAdd}
            <div class="card-body opacity-70 text-lg">
                <h5>No roles left to assign.</h5>
                <h5>User has all assignable roles.</h5>
            </div>
        {:else}
            <div class="card-body">
                {#each assignableRoles as role}
                    <form id="{role.id}-role" method="post" use:enhance={enhancedForm} action="?/assignRole">
                        <FormSubmitFeedback action="assignRole" />
                        <div class="flex flex-row gap-2">
                            <button
                                class="btn btn-info w-15 text-xl"
                                type="submit"
                                onclick={() => {
                                    selectedRole = role;
                                }}
                                >{#if isAssigningRole && selectedRole == role}
                                    <Spinner />
                                {:else}
                                    +
                                {/if}</button
                            >
                            <span class="self-center text-lg">
                                {role.name}
                            </span>
                        </div>
                    </form>
                {/each}
            </div>
        {/if}
    </div>
</div>
