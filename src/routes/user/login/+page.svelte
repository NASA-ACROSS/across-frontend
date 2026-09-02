<script lang="ts">
    import { PUBLIC_CONFIG } from '$config/config.public';
    import type { SubmitFunction } from '@sveltejs/kit';
    import type { ActionData } from './$types';

    import { enhance } from '$app/forms';
    import Section from '$lib/components/Section.svelte';
    import EmailInput from '$lib/components/inputs/EmailInput.svelte';
    import Page from '$lib/components/Page.svelte';
    import FormSubmitFeedback from '$lib/components/FormSubmitFeedback.svelte';
    import { resolve } from '$app/paths';
    import ArrowButton from '$lib/components/ArrowButton.svelte';
    import NasaSecurityBanner from '$lib/components/NasaSecurityBanner.svelte';
    import Alert from '$lib/components/Alert.svelte';

    interface Props {
        form: ActionData;
    }

    let { form }: Props = $props();

    let isLoggingIn = $state(false);

    let isButtonDisabled = $derived(isLoggingIn || form?.type === 'success');

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
    {#snippet alert()}
        <Alert>
            Login is not required to GET data from ACROSS. <a href={PUBLIC_CONFIG.DOCUMENTATION_URL} class="link font-normal">
                See documentation for more details.</a
            >
        </Alert>
    {/snippet}
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
