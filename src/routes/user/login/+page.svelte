<script lang="ts">
    import { enhance } from "$app/forms";
    
    /** @type {import('./$types').ActionData} */
    export let form;

    let isLoggingIn = false;
    // submit function to toggle ui state while waiting for response
    function enhancedLogin(){
        isLoggingIn = true;

        return async ({ update }) => {
            await update();
            isLoggingIn = false;
        }
    }
    
</script>

<section class="py-5 bg-secondary">
    <div class="container py-md-3">
        <h1>API Login</h1>
        <form method="post" use:enhance={enhancedLogin}>
            <label for="email">Email</label>
            <div class="d-flex flex-sm-row flex-column mb-3 needs-validation">
                <div class="input-group me-sm-3 mb-sm-0 mb-3">
                    <input
                        class="form-control form-control-lg rounded-3 ps-5"
                        required
                        value={form?.email ?? ''}
                        disabled={isLoggingIn || form?.success}
                        autocomplete="off"
                        name="email"
                        type="email"
                        placeholder="Please enter your email"
                    />
                </div>
                <button class="btn btn-lg btn-primary" disabled={isLoggingIn || form?.success}>
                    {#if isLoggingIn && !form?.success}
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    {:else}
                        Login
                    {/if}
                </button
                >
            </div>
            {#if form?.success}
                <p
                    class="form-text fs-sm text-sm-start text-center text-success"
                >
                    Please check your email for a login link!
                </p>
            {/if}
            {#if form?.invalidEmail}
                <p
                    class="form-text fs-sm text-sm-start text-center text-danger"
                >
                    Invalid Email Specified. User not found.
                </p>
            {/if}
            {#if form?.rateLimit}
                <p
                    class="form-text fs-sm text-sm-start text-center text-danger"
                >
                    You are being rate limited, please retry after {form.retryAfter}
                    seconds.
                </p>
            {/if}
            {#if form?.fail}
                <p
                    class="form-text fs-sm text-sm-start text-center text-danger"
                >
                    Something went wrong, please try again. If this error
                    persists, contact support.
                </p>
            {/if}
        </form>
    </div>
</section>
