<script lang="ts">
    import { applyAction, enhance } from '$app/forms';
    import { goto, invalidateAll } from '$app/navigation';
    import type { UserGroupAdminUser } from '$lib/types/User/UserGroupAdminUser';
    import type { UserGroupRole } from '$lib/types/User/UserGroupRole';
    import type { SubmitFunction } from '@sveltejs/kit';

    export let users: UserGroupAdminUser[];
    export let selectedUser: UserGroupAdminUser | undefined;

    // let isRemovingUser = false;

    // const enhancedForm: SubmitFunction = ({ formData }) => {
    //     isRemovingUser = true;
    //     // set form data to send, specific to this form
    //     formData.set('userGroupId', userGroupId.toString());
    //     formData.set('userId', selectedUser.id.toString());

    //     return async ({ result }) => {
    //         isRemovingUser = false;
    //         if (result.status === 200) {
    //             // rerun all `load` functions, following the successful update
    //             await invalidateAll();
    //             await applyAction(result);
    //         } else if (result.type === 'redirect') {
    //             goto(result.location, { invalidateAll: true, noScroll: true });
    //         } else {
    //             await applyAction(result);
    //         }
    //     };
    // };
</script>

<div class="py-md-1 col">
    <h2>
        <i class="bx bx-group opacity-70 me-2"></i>Users in Group
    </h2>
    <div>
        {#if !users?.length}
            <p>No pending invites</p>
        {:else}
            {#each users as user}
                <!-- Button addon on the right -->
                <div class="input-group d-flex py-1">
                    <span
                        class={`input-group-text flex-grow-1 ${selectedUser?.email == user?.email ? 'text-success' : ''}`}
                    >
                        {user.email}
                    </span>
                    <button
                        class={`btn ${selectedUser?.email == user?.email ? 'btn-success' : 'btn-primary'}`}
                        type="button"
                        on:click={() => {
                            if (selectedUser == user) {
                                selectedUser = undefined;
                            } else {
                                selectedUser = user;
                            }
                        }}
                    >
                        {#if selectedUser?.email == user?.email}
                            Select
                        {:else}
                            Select
                        {/if}</button
                    >
                </div>

                <!-- <form
                    id="{user.id}-user"
                    method="post"
                    use:enhance={enhancedForm}
                    action="?/removeUser"
                > -->
                <!-- <button
                        class="btn btn-lg btn-danger me-3"
                        type="submit"
                        on:click={() => {
                            selectedUser = user;
                        }}
                        >{#if isRemovingUser}
                            <span
                                class="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                            ></span>
                        {:else}
                            {#if user.email === currentUserEmail}
                                Remove Self
                            {:else}
                                Remove User
                            {/if}
                        {/if}</button
                    > -->

                <!-- </form> -->
            {/each}
        {/if}
    </div>
</div>
