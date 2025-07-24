<script lang="ts">
    import { base } from '$app/paths';
    import ArrowButton from '$lib/components/ArrowButton.svelte';
    import Container from '$lib/components/Container.svelte';
    import Section from '$lib/components/Section.svelte';

    export let form;
</script>

<Section center={true}>
    <Container title="Email Link Login">
        {#if !form}
            <form method="post">
                <div class="form-check">
                    <label
                        class="label text-primary mt-auto"
                        for="remember-me-checkbox"
                        ><input
                            class="checkbox"
                            type="checkbox"
                            name="rememberMe"
                            id="remember-me-checkbox"
                        />Remember me on this computer</label
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
            <form action="{base}/user/login">
                <button class="btn btn-lg btn-primary mb-3">
                    Visit login to try again
                </button>
            </form>
        {/if}
    </Container>
</Section>
