<script lang="ts">
    import { frontendAlphaNumRegex } from '$lib/utils/regex/internationalAlphanumericRegex';

    /** @type {import('./$types').ActionData} */
    export let form;
</script>

<section class="py-5 bg-secondary">
    <div class="container py-md-3">
        <h1>API User Registration</h1>
        <form method="post">
            <label for="firstname">Name</label>
            <div class="d-flex flex-sm-row flex-column mb-3 needs-validation">
                <div class="input-group me-sm-3 mb-sm-0 mb-3">
                    <input
                        class="form-control form-control-lg rounded-3 ps-5"
                        pattern={frontendAlphaNumRegex}
                        title="First name (alphanumeric, 25 character max)"
                        value={form?.firstname ?? ''}
                        disabled={form?.success}
                        autocomplete="off"
                        name="firstname"
                        type="text"
                        placeholder="First name"
                        required
                        maxlength={25}
                    />
                </div>
                <div class="input-group me-sm-3 mb-sm-0 mb-3">
                    <input
                        class="form-control form-control-lg rounded-3 ps-5"
                        pattern={frontendAlphaNumRegex}
                        title="Last name (alphanumeric, 25 character max)"
                        value={form?.lastname ?? ''}
                        disabled={form?.success}
                        autocomplete="off"
                        name="lastname"
                        type="text"
                        placeholder="Last name"
                        required
                        maxlength={25}
                    />
                </div>
            </div>
            <label for="username">Username</label>
            <div class="d-flex flex-sm-row flex-column mb-3 needs-validation">
                <div class="input-group me-sm-3 mb-sm-0 mb-3">
                    <input
                        class="form-control form-control-lg rounded-3 ps-5"
                        pattern={frontendAlphaNumRegex}
                        title="Username (alphanumeric, 25 character max)"
                        value={form?.username ?? ''}
                        disabled={form?.success}
                        autocomplete="off"
                        name="username"
                        type="text"
                        placeholder="Username"
                        required
                        maxlength={25}
                    />
                </div>
            </div>
            <label for="email">Email</label>
            <div class="d-flex flex-sm-row flex-column mb-3 needs-validation">
                <div class="input-group me-sm-3 mb-sm-0 mb-3">
                    <input
                        class="form-control form-control-lg rounded-3 ps-5"
                        required
                        title="Email"
                        type="email"
                        value={form?.email ?? ''}
                        disabled={form?.success}
                        autocomplete="off"
                        name="email"
                        placeholder="Please enter your email"
                    />
                </div>
            </div>
            <button
                class="btn btn-lg btn-primary"
                type="submit"
                disabled={form?.success}>Register</button
            >
            {#if form?.success}
                <p
                    class="form-text fs-sm text-sm-start text-center text-success"
                >
                    Please check your email for a verification link!
                </p>
            {/if}
            {#if form?.userAlreadyExists}
                <p
                    class="form-text fs-sm text-sm-start text-center text-danger"
                >
                    Invalid Email or Username Specified. Account already exists.
                </p>
            {/if}
            {#if form?.rateLimit}
                <p
                    class="form-text fs-sm text-sm-start text-center text-danger"
                >
                    You are being rate limited, please retry after {form?.retryAfter}
                    seconds.
                </p>
            {/if}
            {#if form?.failValidation}
                <p
                    class="form-text fs-sm text-sm-start text-center text-danger"
                >
                    Form validation failed. Please try again. If this error
                    persists, contact support.
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

<style>
    input:valid:not(:placeholder-shown) {
        border: 1px solid rgba(160, 160, 255, 1);
    }

    input:disabled {
        border: 1px solid rgb(34, 197, 94) !important;
    }

    input:invalid:not(:placeholder-shown) {
        border: 1px solid rgba(255, 0, 0, 1);
    }
</style>
