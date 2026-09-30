<script lang="ts">
    import { resolve } from '$app/paths';
    import _ from 'lodash';
    import type { ActionData, PageData } from './$types';
    import { browser } from '$app/environment';
    import { frontendAlphaNumRegex } from '$lib/utils/regex/internationalAlphanumericRegex';
    import { applyAction, enhance } from '$app/forms';
    import { goto, invalidateAll } from '$app/navigation';
    import type { SubmitFunction } from '@sveltejs/kit';
    import UserGroups from './_components/UserGroups.svelte';
    import UserGroupInvites from './_components/UserGroupInvites.svelte';
    import type { UserGroup } from '$lib/types/User/UserGroup';
    import Page from '$lib/components/Page.svelte';
    import Section from '$lib/components/Section.svelte';
    import Fieldset from '$lib/components/Fieldset.svelte';
    import FormSubmitFeedback from '$lib/components/FormSubmitFeedback.svelte';
    import DangerZone from './_components/DangerZone.svelte';
    import type { ServiceAccountDetail } from '$lib/types/User/ServiceAccountDetail';
    import ArrowButton from '$lib/components/ArrowButton.svelte';

    interface Props {
        form: ActionData;
        data: PageData;
    }

    let { form, data }: Props = $props();

    let leaveUserGroup: UserGroup | undefined = $state();

    // Svelte 5 migration: `sv migrate` refused this file ("Can't migrate code with
    // afterUpdate"), so it was still Svelte 4.
    // `user` is a local editable copy driven by `bind:value` on the form inputs, so it
    // has to be real $state rather than a $derived view of `data.user`. It is cloned so
    // editing the form no longer mutates the load data in place (which is what the old
    // `let user = data.user` alias did).
    let originalUserData = $state(structuredClone(data.user));
    let user = $state(structuredClone(data.user));
    let isUserDataUnchanged = $derived(_.isEqual(originalUserData, user));

    // safari browser should force a reload on cached navigation using back button
    if (browser) {
        window.onpageshow = function (event) {
            if (event.persisted) {
                window.location.reload();
            }
        };
    }

    let userGroups = $derived(data.user.groups);
    let invitations = $derived(data.user.received_invites);

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
        } else if (action.href.includes('leaveGroup')) {
            formData.set('userId', user.id.toString());
            formData.set('groupId', leaveUserGroup?.id.toString() || '');
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

    // Re-seed the editable copy whenever `load` hands us fresh user data (e.g. after a
    // successful update calls invalidateAll). This replaces the old afterUpdate(), which
    // for `user` was effectively a self-assignment because `user` aliased `data.user`.
    // An $effect is warranted here specifically because we are syncing *editable local
    // state* from an external source; the purely-derived values above use $derived.
    // Typing does not retrigger this, since edits no longer touch `data.user`.
    $effect(() => {
        const fresh = data.user;
        originalUserData = structuredClone(fresh);
        user = structuredClone(fresh);
    });
</script>

<Page title="Profile" icon="user">
    <!--
        Svelte 5 migration: was `<div slot="buttons">`, which renders nothing when
        passed to a runes component that declares `buttons` as a Snippet. This is the
        `$$slot_def is of type 'unknown'` svelte-check error.
    -->
    {#snippet buttons()}
        <div>
            <a data-sveltekit-preload-data="false" data-sveltekit-reload href={resolve('/user/logout')} class="btn btn-accent text-xl">
                <i class="bx bx-door-open-alt opacity-70 me-2"></i>Logout
            </a>
        </div>
    {/snippet}
    <Section>
        <Fieldset title="User Information">
            <form method="post" action="?/updateUserInformation" use:enhance={enhancedForm}>
                <label for="firstname">Name</label>
                <div class="flex flex-row flex-grow mb-3 needs-validation join">
                    <div class="join-item me-sm-3 mb-sm-0 mb-3 w-1/2">
                        <input
                            id="firstname"
                            class="{!isUserDataUnchanged ? 'validation-border-color' : ''} input form-control form-control-lg ps-5 w-full"
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
                            class="{!isUserDataUnchanged ? 'validation-border-color' : ''} input form-control form-control-lg ps-5 w-full"
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
                            class="{!isUserDataUnchanged ? 'validation-border-color' : ''} input form-control form-control-lg ps-5 w-full"
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
                <div class="flex justify-end items-center text-lg">
                    <FormSubmitFeedback action="updateUserInformation" />
                    <button type="submit" class="btn text-lg btn-info ml-5" disabled={isUserDataUnchanged}> Update </button>
                </div>
            </form>
        </Fieldset>
    </Section>

    <UserGroupInvites {invitations} />
    <UserGroups {user} {userGroups} bind:leaveUserGroup {enhancedForm} />

    <Section title="My Service Accounts" icon="server">
        <ArrowButton href={resolve('/user/service-accounts/')}>Manage Service Accounts</ArrowButton>
    </Section>

    <DangerZone />
</Page>

<style>
    input:valid:not(:placeholder-shown).validation-border-color {
        border: 1px solid var(--color-info);
    }

    input:invalid:not(:placeholder-shown).validation-border-color {
        border: 1px solid var(--color-error);
    }
</style>
