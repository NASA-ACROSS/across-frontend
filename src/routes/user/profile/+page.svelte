<script lang="ts">
    import { base } from '$app/paths';
    import _ from 'lodash';
    /** @type {import('./$types').ActionData} */
    export let form;

    import type { PageData } from './$types';
    import { browser } from '$app/environment';
    import { frontendAlphaNumRegex } from '$lib/utils/regex/internationalAlphanumericRegex';
    import { applyAction, enhance } from '$app/forms';
    import { goto, invalidateAll } from '$app/navigation';
    import { afterUpdate } from 'svelte';
    import type { SubmitFunction } from '@sveltejs/kit';
    import UserGroups from './_components/UserGroups.svelte';
    import UserGroupInvites from './_components/UserGroupInvites.svelte';
    import type { UserGroup } from '$lib/types/User/UserGroup';

    export let data: PageData;

    // user selected role
    let roleSelection: string = '';
    let leaveUserGroup: UserGroup;

    let originalUserData = structuredClone(data.user);
    let user = data.user;
    $: isUserDataUnchanged = _.isEqual(originalUserData, user);
    $: form?.successUpdateUserInformation,
        (originalUserData = structuredClone(data.user));

    // safari browser should force a reload on cached navigation using back button
    if (browser) {
        window.onpageshow = function (event) {
            if (event.persisted) {
                window.location.reload();
            }
        };
    }

    let userGroups = data.user.groups;
    let invitations = data.user.received_invites;

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
    const enhancedForm: SubmitFunction = ({ formData, action, cancel }) => {
        if (action.href.includes('updateUserInformation')) {
            // set form data to send, specific to this table
            if (isUserDataUnchanged) {
                cancel();
            }
            formData.set('firstname', user.first_name);
            formData.set('lastname', user.last_name);
            formData.set('username', user.username);
        } else if (action.href.includes('requestRole')) {
            formData.set('role', roleSelection);
        } else if (action.href.includes('cancelRequestedRole')) {
            formData.set('role', roleSelection);
        } else if (action.href.includes('leaveGroup')) {
            formData.set('userId', user.id.toString());
            formData.set('groupId', leaveUserGroup.id.toString());
        }

        /**
         * `result` is an `ActionResult` object
         * `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
         */
        return async ({ result }) => {
            if (result.type === 'success') {
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

    afterUpdate(() => {
        user = data.user;
        userGroups = data.user.groups;
        invitations = data.user.received_invites;
    });
</script>

<section class="pt-5 pb-2 bg-secondary">
    <div class="container py-md-3">
        <div class="d-flex justify-content-between align-items-end">
            <h1>
                <i class="bx bx-user opacity-70 me-2"></i>
                Profile
            </h1>
            <a
                data-sveltekit-preload-data="false"
                href="{base}/user/logout"
                class="btn btn-lg btn-danger"
            >
                <i class="bx bx-log-out opacity-70 me-2"></i>Logout
            </a>
        </div>
        <h3>
            <i class="bx bx-edit-alt opacity-70 me-2"></i>
            User Information
        </h3>
        <form
            method="post"
            action="?/updateUserInformation"
            use:enhance={enhancedForm}
        >
            <label for="firstname">Name</label>
            <div class="d-flex flex-sm-row flex-column mb-3 needs-validation">
                <div class="input-group me-sm-3 mb-sm-0 mb-3">
                    <input
                        class="{!isUserDataUnchanged
                            ? 'validation-border-color'
                            : ''} form-control form-control-lg rounded-3 ps-5"
                        required
                        bind:value={user.first_name}
                        pattern={frontendAlphaNumRegex}
                        autocomplete="off"
                        name="first_name"
                        title="First name (alphanumeric, 25 character max)"
                        type="text"
                        placeholder="First"
                    />
                </div>
                <div class="input-group me-sm-3 mb-sm-0 mb-3">
                    <input
                        class="{!isUserDataUnchanged
                            ? 'validation-border-color'
                            : ''} form-control form-control-lg rounded-3 ps-5"
                        required
                        bind:value={user.last_name}
                        pattern={frontendAlphaNumRegex}
                        autocomplete="off"
                        name="last_name"
                        title="Last name (alphanumeric, 25 character max)"
                        type="text"
                        placeholder="Last"
                    />
                </div>
            </div>
            <label for="username">Username</label>
            <div class="d-flex flex-sm-row flex-column mb-3 needs-validation">
                <div class="input-group me-sm-3 mb-sm-0 mb-3">
                    <input
                        class="{!isUserDataUnchanged
                            ? 'validation-border-color'
                            : ''} form-control form-control-lg rounded-3 ps-5"
                        required
                        bind:value={user.username}
                        pattern={frontendAlphaNumRegex}
                        autocomplete="off"
                        name="username"
                        title="Username (alphanumeric, 25 character max)"
                        type="text"
                        placeholder="Username"
                    />
                </div>
            </div>
            <label for="email">Email</label>
            <div class="d-flex flex-sm-row flex-column mb-3 needs-validation">
                <div class="input-group me-sm-3 mb-sm-0 mb-3">
                    <input
                        class="form-control form-control-lg rounded-3 ps-5"
                        required
                        disabled
                        bind:value={user.email}
                        autocomplete="off"
                        name="email"
                        title="You cannot change your email"
                        type="email"
                        placeholder="Please enter your email"
                    />
                </div>
            </div>
            <button
                type="submit"
                class="btn btn-lg btn-primary"
                disabled={isUserDataUnchanged}>Update</button
            >
            {#if form?.successUpdateUserInformation}
                <p
                    class="form-text fs-sm text-sm-start text-center text-success"
                >
                    Successfully updated user information!
                </p>
            {/if}
            {#if form?.failUpdateUserInformation}
                <p
                    class="form-text fs-sm text-sm-start text-center text-danger"
                >
                    Something went wrong, please try again. If this error
                    persists, contact support.
                </p>
            {/if}
            {#if form?.failValidation}
                <p
                    class="form-text fs-sm text-sm-start text-center text-danger"
                >
                    Form validation failed. Please try again. If this error
                    persists, contact support.
                </p>
            {/if}
        </form>
    </div>
</section>

<UserGroupInvites {invitations} />
<UserGroups {user} {userGroups} bind:leaveUserGroup {enhancedForm} />

<section class="pb-5 bg-secondary"></section>

<section class="pb-5 bg-secondary"></section>

<style>
    input:disabled.default-cursor {
        cursor: default;
        pointer-events: none;
    }

    input:valid:not(:placeholder-shown).validation-border-color {
        border: 1px solid rgba(160, 160, 255, 1);
    }

    input:invalid:not(:placeholder-shown).validation-border-color {
        border: 1px solid rgba(255, 0, 0, 1);
    }
</style>
