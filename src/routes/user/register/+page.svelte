<script lang="ts">
    /** @type {import('./$types').ActionData} */
    export let form;
</script>

<section class="py-5 bg-secondary">
    <div class="container py-md-3">
        <h1>API Register</h1>
        <form method="post">
            <label for="firstname">Name</label>
            <div class="d-flex flex-sm-row flex-column mb-3 needs-validation">
                <div class="input-group me-sm-3 mb-sm-0 mb-3">
                    <input
                        class="form-control form-control-lg rounded-3 ps-5"
                        required
                        value={form?.firstname ?? ""}
                        disabled={form?.success}
                        autocomplete="off"
                        name="firstname"
                        type="text"
                        placeholder="First"
                    />
                </div>
                <div class="input-group me-sm-3 mb-sm-0 mb-3">
                    <input
                        class="form-control form-control-lg rounded-3 ps-5"
                        required
                        value={form?.lastname ?? ""}
                        disabled={form?.success}
                        autocomplete="off"
                        name="lastname"
                        type="text"
                        placeholder="Last"
                    />
                </div>
            </div>
            <label for="username">Username</label>
            <div class="d-flex flex-sm-row flex-column mb-3 needs-validation">
                <div class="input-group me-sm-3 mb-sm-0 mb-3">
                    <input
                        class="form-control form-control-lg rounded-3 ps-5"
                        required
                        value={form?.username ?? ""}
                        disabled={form?.success}
                        autocomplete="off"
                        name="username"
                        type="text"
                        placeholder="Username"
                    />
                </div>
            </div>
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
                <!-- <button class="btn btn-lg btn-primary" disabled={form?.success}
                    >Login</button
                > -->
            </div>
            <button class="btn btn-lg btn-primary" disabled={form?.success}
                >Register</button
            >
            {#if form?.success}
                <p class="form-text fs-sm text-sm-start text-center">
                    Please check your email for a verification link!
                </p>
            {/if}
            {#if form?.userAlreadyExists}
                <p class="form-text fs-sm text-sm-start text-center">
                    Invalid Email or Username Specified. Account already exists.
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
