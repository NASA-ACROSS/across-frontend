<script lang="ts">
    import { resolve } from '$app/paths';
    import ArrowButton from '#lib/components/ArrowButton.svelte';
    import Section from '#lib/components/Section.svelte';
    import Page from '#lib/components/Page.svelte';
    import FormSubmitFeedback from '#lib/components/FormSubmitFeedback.svelte';

    let { form } = $props();
</script>

<!-- 
The Login-Verify page exists since some email clients will pre-click links to 
verify their safety which if this was immediately directed to the profile page, 
this would consume the token to get the user's actual access and refresh tokens. 
-->
<Page>
    <Section title="Email Link Login">
        <div class="w-xs">
            {#if !form}
                <form method="post">
                    <div class="form-check">
                        <label class="label text-primary mt-auto" for="remember-me-checkbox">
                            <input data-testid="remember-me" class="checkbox" type="checkbox" name="rememberMe" id="remember-me-checkbox" />

                            Remember me on this computer
                        </label>
                    </div>
                    <FormSubmitFeedback />
                    <ArrowButton id="login-verify" type="submit">Login</ArrowButton>
                </form>
            {:else if form?.type === 'error'}
                <FormSubmitFeedback />
                <ArrowButton href={resolve('user/login')}>Visit login to try again</ArrowButton>
            {/if}
        </div>
    </Section>
</Page>
