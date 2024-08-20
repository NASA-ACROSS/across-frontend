<script lang="ts">
    import { enhance } from '$app/forms';

    export let data;

    /** @type {import('./$types').ActionData} */
    export let form;

    let isSubmittingInvite = false;
    // submit function to toggle ui state while waiting for response
    function enhancedLogin() {
        isSubmittingInvite = true;

        return async ({ update }) => {
            await update();
            isSubmittingInvite = false;
        };
    }
</script>

<section class="py-5 bg-secondary">
    <div class="container py-md-3">
        <h1>Manage User Group: {data.slug}</h1>
        <form method="post" action="?/inviteUser" use:enhance={enhancedLogin}>
            <label for="email">Email</label>
            <div class="d-flex flex-sm-row flex-column mb-3 needs-validation">
                <div class="input-group me-sm-3 mb-sm-0 mb-3">
                    <input
                        class="form-control form-control-lg rounded-3 ps-5"
                        required
                        value={form?.email ?? ''}
                        disabled={isSubmittingInvite || form?.success}
                        autocomplete="off"
                        name="email"
                        type="email"
                        placeholder="Enter an email to invite to {data.slug}"
                    />
                </div>
                <button
                    class="btn btn-lg btn-primary"
                    disabled={isSubmittingInvite || form?.success}
                >
                    {#if isSubmittingInvite && !form?.success}
                        <span
                            class="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                        ></span>
                    {:else}
                        Invite
                    {/if}
                </button>
            </div>
            {#if form?.success}
                <p
                    class="form-text fs-sm text-sm-start text-center text-success"
                >
                    User Invited!
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
