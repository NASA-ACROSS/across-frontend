<script lang="ts">
    import type { PageData } from "./$types";
    import { base } from "$app/paths";
    export let data: PageData;
</script>

<section class="py-5 bg-secondary">
    <div class="container py-md-3">
        {#if data?.credentials?.api_token}
            <h1>Login Success</h1>
            <h2>Email: {data.credentials.email}</h2>
            <h2>Api Key: {data.credentials.api_token}</h2>
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
