<script lang="ts">
    import { base } from "$app/paths";

    import type { ActionData } from "./$types";
    export let form;
</script>

<section class="py-5 bg-secondary">
    <div class="container py-md-3">
        {#if !form}
            <form method="post">
                <h1>Email Login</h1>
                <button class="btn btn-lg btn-primary mb-3"
                    >Show Credentials</button
                >
            </form>
        {:else if form?.credentials?.api_token}
            <h1>Email Login Success</h1>
            <h2>Email: {form.credentials.email}</h2>
            <h2>API Key: {form.credentials.api_token}</h2>
            <p class="form-text fs-sm text-sm-start text-center">
                Please store this API key in a secure location. You will not be
                able to retrieve it again using this link.
            </p>
        {:else}
            <h1>Login Error</h1>
            <h4>Invalid ACROSS user verification key</h4>
            <h4>
                <a href="{base}/user/login" class=".text-decoration"
                    >>Visit login to try again</a
                >
            </h4>
        {/if}
    </div>
</section>
