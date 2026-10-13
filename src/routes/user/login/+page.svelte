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
    import Altcha from '$lib/components/Altcha.svelte';

    interface Props {
        form: ActionData;
    }

    let { form }: Props = $props();

    let isLoggingIn = $state(false);
    let isCaptchaVerified = $state(false);
    let altcha: ReturnType<typeof Altcha> | undefined = $state();

    let isButtonDisabled = $derived(isLoggingIn || form?.type === 'success');

    // submit function to toggle ui state while waiting for response
    const enhancedLogin: SubmitFunction = () => {
        isLoggingIn = true;

        return async ({ result, update }) => {
            await update();
            isLoggingIn = false;
            // The page didn't reload and the submit used up the captcha, so solve a new one for the retry.
            if (result.type === 'failure' || result.type === 'error') altcha?.refresh();
        };
    };
</script>

<Page title="Login" icon="user">
    {#snippet alert()}
        <OpenDataPolicyBanner />
    {/snippet}
    <Section>
        <form method="post" use:enhance={enhancedLogin} novalidate>
            <EmailInput
                value={form?.email || ''}
                disabled={isLoggingIn || form?.type === 'success' || isButtonDisabled}
                autocomplete={false}
                includeButton={true}
                buttonDisabled={!isCaptchaVerified}
                isLoading={isLoggingIn && form?.type !== 'success'}
            />
            <FormSubmitFeedback />
            <Altcha bind:this={altcha} bind:isVerified={isCaptchaVerified} />
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
