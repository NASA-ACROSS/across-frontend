<script lang="ts">
    import Section from '$lib/components/Section.svelte';
    import Fieldset from '$lib/components/Fieldset.svelte';
    import FormSubmitFeedback from '$lib/components/FormSubmitFeedback.svelte';
    import NasaSecurityBanner from '$lib/components/NasaSecurityBanner.svelte';
    import Page from '$lib/components/Page.svelte';
    import { frontendAlphaNumRegex } from '$lib/utils/regex/internationalAlphanumericRegex';
    import OpenDataPolicyBanner from '$lib/components/OpenDataPolicyBanner.svelte';

    /** @type {import('./$types').ActionData} */
    export let form;
</script>

<Page title="Create Account" icon="user">
    <OpenDataPolicyBanner slot="alert" />
    <Section>
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
                            disabled={form?.type === 'success'}
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
                            disabled={form?.type === 'success'}
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
                            disabled={form?.type === 'success'}
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
                            disabled={form?.type === 'success'}
                            autocomplete="off"
                            name="email"
                            placeholder="Please enter your email"
                        />
                    </div>
                </div>

                <div class="flex justify-end gap-3 text-lg items-center">
                    <FormSubmitFeedback />
                    <button class="btn btn-lg btn-info" type="submit" disabled={form?.type === 'success'}>Register</button>
                </div>
            </form>
        </Fieldset>
        <NasaSecurityBanner></NasaSecurityBanner>
    </Section>
</Page>

<style>
    input:valid:not(:placeholder-shown) {
        border: 1px solid var(--color-info);
    }

    input:disabled {
        border: 1px solid var(--color-info) !important;
    }

    input:invalid:not(:placeholder-shown) {
        border: 1px solid var(--color-warning);
    }
</style>
