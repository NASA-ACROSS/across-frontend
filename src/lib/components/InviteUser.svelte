<script lang="ts">
    import { applyAction, enhance } from '$app/forms';
    import { goto, invalidateAll } from '$app/navigation';
    import type { UserGroup } from '$lib/types/User';

    /** @type {import('./$types').ActionData} */
    export let form;
    export let userGroup: UserGroup;

    const slug = userGroup.short_name;
    const userGroupId = userGroup.id;

    let isSubmittingInvite = false;

    /**
     * sveltekit progressive form enhancement
     * see docs for more information
     * https://kit.svelte.dev/docs/form-actions#progressive-enhancement-customising-use-enhance
     *
     * `formElement` is this `<form>` element.
     * `formData` is its `FormData` object that's about to be submitted.
     * `action` is the URL to which the form is posted.
     * `cancel()` will prevent the submission.
     * `submitter` is the `HTMLElement` that caused the form to be submitted.
     */
    const enhancedForm = ({
        formElement,
        formData,
        action,
        cancel,
        submitter,
    }) => {
        console.log('inside inviteUser');
        // set form data to send, specific to this table
        isSubmittingInvite = true;

        formData.set('userGroupId', userGroupId);

        /**
         * `result` is an `ActionResult` object
         * `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
         */
        return async ({ result, update }) => {
            isSubmittingInvite = false;
            console.log('result', result);
            if (result.data.successInvite) {
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
    <h1 class="pb-3">Manage User Group: {userGroup.name}</h1>
    <div class="pb-4 pt-3">
        <h2>Invite User to Group</h2>
        <form method="post" action="?/inviteUser" use:enhance={enhancedForm}>
            <label for="email">Email</label>
            <div class="d-flex flex-sm-row flex-column mb-3 needs-validation">
                <div class="input-group me-sm-3 mb-sm-0 mb-3">
                    <input
                        class="form-control form-control-lg rounded-3 ps-5"
                        required
                        value={form?.email ?? ''}
                        disabled={isSubmittingInvite}
                        autocomplete="off"
                        name="email"
                        type="email"
                        placeholder="Enter an email to invite to {slug}"
                    />
                    <input
                        class="form-control form-control-lg rounded-3 ps-5"
                        value={userGroupId}
                        hidden={true}
                        autocomplete="off"
                        name="userGroupId"
                    />
                </div>
                <button
                    class="btn btn-lg btn-primary"
                    disabled={isSubmittingInvite}
                    type="submit"
                >
                    {#if isSubmittingInvite && !form?.success}
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
