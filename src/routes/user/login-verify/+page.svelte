<script lang="ts">
    import { base } from '$app/paths';

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
