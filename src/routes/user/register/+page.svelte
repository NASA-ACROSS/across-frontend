<script lang="ts">
    import { resolve } from '$app/paths';
    import Section from '$lib/components/Section.svelte';
    import Fieldset from '$lib/components/Fieldset.svelte';
    import FormInputFeedback from '$lib/components/FormInputFeedback.svelte';
    import NasaSecurityBanner from '$lib/components/NasaSecurityBanner.svelte';
    import Page from '$lib/components/Page.svelte';
    import { frontendAlphaNumRegex } from '$lib/utils/regex/internationalAlphanumericRegex';

    /** @type {import('./$types').ActionData} */
    export let form;
</script>

<Page center={true}>
    <div role="alert" class="alert alert-info alert-soft mt-5 w-2xl justify-center">
        <span class=""
            >Registration is not required to GET data from ACROSS. <a href={resolve('/help/documentation')} class="link font-normal"
                >See documentation for more details.</a
            ></span
        >
    </div>
    <Section title="Create Account" icon="user" containerClasses="w-2xl">
        <Fieldset title="User Information">
            <form method="post">
                <label for="firstname">Name</label>
                <div class="flex flex-row flex-grow mb-3 needs-validation join">
                    <div class="join-item mb-3 w-1/2">
                        <input
                            id="firstname"
                            class="input form-control ps-5 w-full"
                            pattern={frontendAlphaNumRegex}
                            title="First name (alphanumeric, 25 character max)"
                            value={form?.firstname ?? ''}
                            disabled={form?.success}
                            autocomplete="off"
                            name="firstname"
                            type="text"
                            placeholder="First name"
                            required
                            maxlength={25}
                        />
                    </div>
                    <div class="join-item mb-3 w-1/2">
                        <input
                            class="input form-control form-control-lg ps-5 w-full"
                            pattern={frontendAlphaNumRegex}
                            title="Last name (alphanumeric, 25 character max)"
                            value={form?.lastname ?? ''}
                            disabled={form?.success}
                            autocomplete="off"
                            name="lastname"
                            type="text"
                            placeholder="Last name"
                            required
                            maxlength={25}
                        />
                    </div>
                </div>
                <label for="username">Username</label>
                <div class="flex sm:flex-row flex-column mb-3 needs-validation">
                    <div class="input-group mb-3 w-full">
                        <input
                            class="input form-control form-control-lg ps-5 w-full"
                            pattern={frontendAlphaNumRegex}
                            title="Username (alphanumeric, 25 character max)"
                            value={form?.username ?? ''}
                            disabled={form?.success}
                            autocomplete="off"
                            name="username"
                            type="text"
                            placeholder="Username"
                            required
                            maxlength={25}
                        />
                    </div>
                </div>
                <label for="email">Email</label>
                <div class="flex flex-sm-row flex-column mb-3 needs-validation">
                    <div class="input-group mb-3 w-full">
                        <input
                            class="input form-control form-control-lg ps-5 w-full"
                            required
                            title="Email"
                            type="email"
                            value={form?.email ?? ''}
                            disabled={form?.success}
                            autocomplete="off"
                            name="email"
                            placeholder="Please enter your email"
                        />
                    </div>
                </div>

                <div class="flex justify-end gap-3 items-center">
                    {#if form?.success}
                        <FormInputFeedback>Please check your email for a verification link!</FormInputFeedback>
                    {/if}
                    {#if form?.userAlreadyExists}
                        <FormInputFeedback type="error">Invalid Email or Username Specified. Account already exists.</FormInputFeedback>
                    {/if}
                    {#if form?.rateLimit}
                        <FormInputFeedback type="error">
                            You are being rate limited, please retry after {form?.retryAfter}
                            seconds.
                        </FormInputFeedback>
                    {/if}
                    {#if form?.failValidation}
                        <FormInputFeedback type="error">Form validation failed. Please try again. If this error persists, contact support.</FormInputFeedback>
                    {/if}
                    {#if form?.fail}
                        <FormInputFeedback type="error">Something went wrong, please try again. If this error persists, contact support.</FormInputFeedback>
                    {/if}
                    <button class="btn btn-lg btn-info" type="submit" disabled={form?.success}>Register</button>
                </div>
            </form>
        </Fieldset>
    </Section>
    <NasaSecurityBanner></NasaSecurityBanner>
</Page>

<style>
    input:valid:not(:placeholder-shown) {
        border: 1px solid var(--color-info);
    }

    input:disabled {
        border: 1px solid var(--color-info) !important;
    }

    input:invalid:not(:placeholder-shown) {
        border: 1px solid var(--color-accent);
    }
</style>
