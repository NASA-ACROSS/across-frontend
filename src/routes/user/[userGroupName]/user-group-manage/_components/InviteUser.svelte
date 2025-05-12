<script lang="ts">
    import { applyAction, enhance } from '$app/forms';
    import { goto, invalidateAll } from '$app/navigation';
    import type { UserGroup } from '$lib/types/User/UserGroup';
    import type { ActionData, SubmitFunction } from '../$types';

    export let form: ActionData;
    export let group: UserGroup;

    let isSubmittingInvite = false;

    const enhancedForm: SubmitFunction = ({ formData }) => {
        // render state changes
        isSubmittingInvite = true;

        // set form data to send, specific to this form
        formData.set('groupId', group.id.toString());

        return async ({ result }) => {
            isSubmittingInvite = false;

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

<div class="container py-md-3">
    <div class="pb-3 pt-3">
        <h2>
            <i class="bx bx-envelope opacity-70 me-2"></i>Invite User to Group
        </h2>
        <form method="post" action="?/inviteUser" use:enhance={enhancedForm}>
            <label for="email">Email</label>
            <div class="d-flex flex-sm-row flex-column mb-3 needs-validation">
                <div class="input-group me-sm-3 mb-sm-0 mb-3">
                    <input
                        class="form-control form-control-lg rounded-3 ps-5"
                        required
                        value={''}
                        disabled={isSubmittingInvite}
                        autocomplete="off"
                        name="email"
                        type="email"
                        placeholder="Enter an email to invite to {group.short_name}"
                    />
                </div>
                <button
                    class="btn btn-lg btn-primary"
                    disabled={isSubmittingInvite}
                    type="submit"
                >
                    {#if isSubmittingInvite && !form?.successInvite}
                        <span
                            class="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                        ></span>
                    {:else}
                        Invite
                    {/if}
                </button>
            </div>
            {#if form?.successInvite}
                <p
                    class="form-text fs-sm text-sm-start text-center text-success"
                >
                    User Invited!
                </p>
            {/if}
            {#if form?.userInGroup}
                <p
                    class="form-text fs-sm text-sm-start text-center text-success"
                >
                    User is already invited or in group!
                </p>
            {/if}
            {#if form?.invalidEmail}
                <p
                    class="form-text fs-sm text-sm-start text-center text-danger"
                >
                    Invalid Email Specified. User not found.
                </p>
            {/if}
            {#if form?.fail}
                <p
                    class="form-text fs-sm text-sm-start text-center text-danger"
                >
                    Something went wrong, please try again. If this error
                    persists, contact support.
                </p>
            {/if}
        </form>
    </div>
</div>
