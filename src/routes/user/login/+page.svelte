<script lang="ts">
    import { type SubmitFunction } from '@sveltejs/kit';
    import type { ActionData } from './$types';
    import OpenDataPolicyBanner from '$lib/components/OpenDataPolicyBanner.svelte';

    import { enhance } from '$app/forms';
    import Section from '$lib/components/Section.svelte';
    import EmailInput from '$lib/components/inputs/EmailInput.svelte';
    import Page from '$lib/components/Page.svelte';
    import FormSubmitFeedback from '$lib/components/FormSubmitFeedback.svelte';
    import { resolve } from '$app/paths';
    import ArrowButton from '$lib/components/ArrowButton.svelte';
    import NasaSecurityBanner from '$lib/components/NasaSecurityBanner.svelte';

    export let form: ActionData;

    let isLoggingIn = false;

    $: isButtonDisabled = isLoggingIn || form?.type === 'success';

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
    <OpenDataPolicyBanner slot="alert" />
    <Section>
        <form method="post" use:enhance={enhancedLogin} novalidate>
            <EmailInput
                value={form?.email || ''}
                disabled={isLoggingIn || form?.type === 'success' || isButtonDisabled}
                autocomplete={false}
                includeButton={true}
                isLoading={isLoggingIn && form?.type !== 'success'}
            />
            <FormSubmitFeedback />
        </form>
        <ArrowButton
            href={resolve('/user/register')}
            containerClasses="mt-6 text-right justify-self-end mb-10"
            textClasses="text-sm text-right"
        >
            Don't have an account? Register here
        </ArrowButton>
        <NasaSecurityBanner></NasaSecurityBanner>
    </Section>
</Page>
