<script lang="ts">
    import { PUBLIC_CONFIG } from '$config/config.public';
</script>

<svelte:head>
    {#if PUBLIC_CONFIG.IS_PROD}
        <!-- We participate in the US government's analytics program for NASA. See the data at analytics.usa.gov. -->
        <script
            async
            type="text/javascript"
            src="https://dap.digitalgov.gov/Universal-Federated-Analytics-Min.js?agency=NASA"
            id="_fed_an_ua_tag"
        ></script>
    {/if}
</svelte:head>
