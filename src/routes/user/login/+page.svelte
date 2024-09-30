<script lang="ts">
    import type { SubmitFunction } from '@sveltejs/kit';
    import type { ActionData } from './$types';

    import { enhance } from '$app/forms';
    import Button from '$lib/components/Button.svelte';
    import Container from '$lib/components/Container.svelte';
    import EmailInput from '$lib/components/inputs/EmailInput.svelte';
    import Section from '$lib/components/Section.svelte';
    import FormInputFeedback from '$lib/components/FormInputFeedback.svelte';
    import { base } from '$app/paths';

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

<Section>
    <Container title="Login">
        <form method="post" use:enhance={enhancedLogin} novalidate>
            <div class="d-flex">
                <div class="flex-grow-1 me-3">
                    <EmailInput
                        value={form?.email}
                        disabled={isLoggingIn || form?.success}
                        autocomplete={false}
                    />
                </div>
                <Button
                    name="Send Link"
                    isLoading={isLoggingIn && !form?.success}
                    disabled={isButtonDisabled}
                />
            </div>

            {#if form?.success}
                <FormInputFeedback>
                    Please check your email for a login link!
                </FormInputFeedback>
            {/if}

            {#if form?.invalidEmail}
                <FormInputFeedback type="error">
                    Please provide a valid email.
                </FormInputFeedback>
            {/if}

            {#if form?.rateLimit}
                <FormInputFeedback type="error">
                    You are being rate limited, please retry after {form.retryAfter}
                    seconds.
                </FormInputFeedback>
            {/if}

            {#if form?.fail}
                <FormInputFeedback type="error">
                    Something went wrong, please try again. If this error
                    persists, contact support.
                </FormInputFeedback>
            {/if}

            {#if form?.notFound}
                <div class="mt-4">
                    <p>
                        The email address is not registered,
                        <a href="{base}/user/register"
                            >click here to register!</a
                        >
                    </p>
                </div>
            {/if}
        </form>
    </Container>
</Section>
