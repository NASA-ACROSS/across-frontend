<script lang="ts">
    import { base } from '$app/paths';

    import type { ActionData } from './$types';
    export let form;
</script>

<section class="py-5 bg-secondary">
    <div class="container py-md-3">
        {#if !form}
            <form method="post">
                <h1>Email Login Verify</h1>

                <button class="btn btn-lg btn-primary mb-3"> Login </button>

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
        {:else if form?.credentials?.api_token}
            <h1>Email Login Success</h1>
            <h2>Email: {form.credentials.email}</h2>
            <h2>API Key: {form.credentials.api_token}</h2>
            <p class="form-text fs-sm text-sm-start text-center">
                Please store this API key in a secure location.
            </p>
        {:else if form?.rateLimit}
            <h1>Email Login Error</h1>
            <h4>
                You are being rate-limited, please retry after {form?.retryAfter}
                seconds.
            </h4>
        {:else}
            <h1>Email Login Error</h1>
            <h4>Invalid ACROSS user verification key</h4>
            <form action="{base}/user/login">
                <button class="btn btn-lg btn-primary mb-3">
                    Visit login to try again
                </button>
            </form>
        {/if}
    </div>
</section>
