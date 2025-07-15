<script lang="ts">
    import { base } from '$app/paths';
    import Container from '$lib/components/Container.svelte';
    import Section from '$lib/components/Section.svelte';

    export let form;
</script>

<Section center={true}>
    <Container title="Email Link Login">
        {#if !form}
            <form method="post">
                <button class="btn btn-lg btn-info mb-3"> Login </button>

                <div class="form-check">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        name="rememberMe"
                        id="remember-me-checkbox"
                    />
                    <label class="form-check-label" for="remember-me-checkbox"
                        >Remember me on this computer</label
                    >
                </div>
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
