<script lang="ts">
    import { PUBLIC_CONFIG } from '$config/config.public';
    import type { SubmitFunction } from '@sveltejs/kit';
    import type { ActionData } from './$types';

    import { enhance } from '$app/forms';
    import Section from '$lib/components/Section.svelte';
    import EmailInput from '$lib/components/inputs/EmailInput.svelte';
    import Page from '$lib/components/Page.svelte';
    import FormInputFeedback from '$lib/components/FormInputFeedback.svelte';
    import { resolve } from '$app/paths';
    import ArrowButton from '$lib/components/ArrowButton.svelte';
    import NasaSecurityBanner from '$lib/components/NasaSecurityBanner.svelte';
    import Alert from '$lib/components/Alert.svelte';

    export let form: ActionData;

    let isLoggingIn = false;

    $: isButtonDisabled = isLoggingIn || form?.success;

    // submit function to toggle ui state while waiting for response
    const enhancedLogin: SubmitFunction = () => {
        isLoggingIn = true;

        return async ({ update }) => {
            await update();
            isLoggingIn = false;
        };
    };
</script>

<Page title="Login" icon="user">
    <Alert slot="alert">
        Login is not required to GET data from ACROSS. <a href={PUBLIC_CONFIG.DOCUMENTATION_URL} class="link font-normal">
            See documentation for more details.</a
        >
    </Alert>
    <Section>
        <form method="post" use:enhance={enhancedLogin} novalidate>
            <EmailInput
                value={form?.email || ''}
                disabled={isLoggingIn || form?.success || isButtonDisabled}
                autocomplete={false}
                includeButton={true}
                isLoading={isLoggingIn && !form?.success}
            >
                {#if form?.success}
                    <FormInputFeedback>Please check your email for a login link!</FormInputFeedback>
                {/if}

                {#if form?.rateLimit}
                    <FormInputFeedback type="error">
                        You are being rate limited, please retry after {form.retryAfter}
                        seconds.
                    </FormInputFeedback>
                {/if}

                {#if form?.fail}
                    <FormInputFeedback type="error">Something went wrong, please try again. If this error persists, contact support.</FormInputFeedback>
                {/if}

                {#if form?.notFound}
                    <FormInputFeedback type="error">The email address is not registered.</FormInputFeedback>
                {/if}
            </EmailInput>
        </form>
        <ArrowButton href={resolve('/user/register')} containerClasses="mt-6 text-right justify-self-end mb-10" textClasses="text-sm text-right">
            Don't have an account? Register here
        </ArrowButton>
        <NasaSecurityBanner></NasaSecurityBanner>
    </Section>
</Page>
