<script lang="ts">
    import { resolve } from '$app/paths';
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
    import Section from '$lib/components/Section.svelte';
    import Container from '$lib/components/Container.svelte';
    import Fieldset from '$lib/components/Fieldset.svelte';
    import FormInputFeedback from '$lib/components/FormInputFeedback.svelte';

    export let data: PageData;

    // user selected role
    let roleSelection: string = '';
    let leaveUserGroup: UserGroup;

    let originalUserData = structuredClone(data.user);
    let user = data.user;
    $: isUserDataUnchanged = _.isEqual(originalUserData, user);
    $: (form?.successUpdateUserInformation,
        (originalUserData = structuredClone(data.user)));

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

<Section>
    <Container title="Profile" icon="user">
        <div slot="buttons" class="">
            <a
                data-sveltekit-preload-data="false"
                href={resolve('/user/logout')}
                class="btn btn-accent text-xl"
            >
                <i class="bx bx-log-out opacity-70 me-2"></i>Logout
            </a>
        </div>

        <Fieldset title="User Information">
            <form
                method="post"
                action="?/updateUserInformation"
                use:enhance={enhancedForm}
            >
                <label for="firstname">Name</label>
                <div class="flex flex-row flex-grow mb-3 needs-validation join">
                    <div class="join-item me-sm-3 mb-sm-0 mb-3 w-1/2">
                        <input
                            id="firstname"
                            class="{!isUserDataUnchanged
                                ? 'validation-border-color'
                                : ''} input form-control form-control-lg ps-5 w-full"
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
                    <div class="join-item me-sm-3 mb-sm-0 mb-3 w-1/2">
                        <input
                            class="{!isUserDataUnchanged
                                ? 'validation-border-color'
                                : ''} input form-control form-control-lg ps-5 w-full"
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
                <div class="flex flex-sm-row flex-column mb-3 needs-validation">
                    <div class="input-group me-sm-3 mb-sm-0 mb-3 w-full">
                        <input
                            class="{!isUserDataUnchanged
                                ? 'validation-border-color'
                                : ''} input form-control form-control-lg ps-5 w-full"
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
                <div class="flex flex-sm-row flex-column mb-3 needs-validation">
                    <div class="input-group me-sm-3 mb-sm-0 mb-3 w-full">
                        <input
                            class="input form-control form-control-lg ps-5 w-full disabled:bg-base-300 disabled:text-carbon-70"
                            required
                            disabled
                            bind:value={user.email}
                            autocomplete="off"
                            name="email"
                            title="Email"
                            type="email"
                            placeholder="Please enter your email"
                        />
                    </div>
                </div>
                <div class="flex justify-end items-center">
                    {#if form?.successUpdateUserInformation}
                        <FormInputFeedback>
                            Successfully updated user information!
                        </FormInputFeedback>
                    {/if}
                    {#if form?.failUpdateUserInformation}
                        <FormInputFeedback type="error">
                            Something went wrong, please try again. If this
                            error persists, contact support.
                        </FormInputFeedback>
                    {/if}
                    {#if form?.failValidation}
                        <FormInputFeedback type="error">
                            Form validation failed. Please try again. If this
                            error persists, contact support.
                        </FormInputFeedback>
                    {/if}
                    <button
                        type="submit"
                        class="btn text-lg btn-info ml-5"
                        disabled={isUserDataUnchanged}
                    >
                        Update
                    </button>
                </div>
            </form>
        </Fieldset>
    </Container>

    <UserGroupInvites {invitations} />
    <UserGroups {user} {userGroups} bind:leaveUserGroup {enhancedForm} />
</Section>

<style>
    input:disabled.default-cursor {
        cursor: default;
        pointer-events: none;
    }

    input:valid:not(:placeholder-shown).validation-border-color {
        border: 1px solid var(--color-info);
    }

    input:invalid:not(:placeholder-shown).validation-border-color {
        border: 1px solid var(--color-error);
    }
</style>
