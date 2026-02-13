<script lang="ts">
    import { resolve } from '$app/paths';
    import ArrowButton from '$lib/components/ArrowButton.svelte';
    import Section from '$lib/components/Section.svelte';
    import Page from '$lib/components/Page.svelte';

    export let form;
</script>

<Page center={true}>
    <Section title="Email Link Login">
        {#if !form}
            <form method="post">
                <div class="form-check">
                    <label class="label text-primary mt-auto" for="remember-me-checkbox"
                        ><input class="checkbox" type="checkbox" name="rememberMe" id="remember-me-checkbox" />Remember me on this computer</label
                    >
                </div>
                <ArrowButton>Login</ArrowButton>
            </form>
        {:else if form?.rateLimit}
            <h4>
                You are being rate-limited, please retry after {form?.retryAfter}
                seconds.
            </h4>
        {:else}
            <h4>Invalid ACROSS user token</h4>
            <ArrowButton href={resolve('/user/login')}>Visit login to try again</ArrowButton>
        {/if}
    </Section>
</Page>
