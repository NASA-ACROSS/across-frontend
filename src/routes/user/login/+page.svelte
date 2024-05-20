<script lang="ts">
    /** @type {import('./$types').ActionData} */
    export let form;
</script>

<section class="py-5 bg-secondary">
    <div class="container py-md-3">
        <h1>API Login</h1>
        <form method="post">
            <label for="email">Email</label>
            <div class="d-flex flex-sm-row flex-column mb-3 needs-validation">
                <div class="input-group me-sm-3 mb-sm-0 mb-3">
                    <input
                        class="form-control form-control-lg rounded-3 ps-5"
                        required
                        value={form?.email ?? ""}
                        disabled={form?.success}
                        autocomplete="off"
                        name="email"
                        type="email"
                        placeholder="Please enter your email"
                    />
                </div>
                <button class="btn btn-lg btn-primary" disabled={form?.success}
                    >Login</button
                >
            </div>
            {#if form?.success}
                <p class="form-text fs-sm text-sm-start text-center">
                    Please check your email for a login link!
                </p>
            {/if}
            {#if form?.invalidEmail}
                <p class="form-text fs-sm text-sm-start text-center">
                    Invalid Email Specified. User not found.
                </p>
            {/if}
            {#if form?.rateLimit}
                <p class="form-text fs-sm text-sm-start text-center">
                    You are being rate limited, please retry after {form.retryAfter} seconds.
                </p>
            {/if}
            {#if form?.fail}
                <p class="form-text fs-sm text-sm-start text-center">
                    Something went wrong, please try again. If this error
                    persists, contact support.
                </p>
            {/if}
        </form>
    </div>
</section>
