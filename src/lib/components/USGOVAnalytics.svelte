<script lang="ts">
    import { browser } from '$app/environment';
    import { PUBLIC_CONFIG } from '$config/config.public';

    // Only load DAP in real prod browser sessions on NASA-hosted domains.
    const shouldLoadUSGovAnalytics = browser && PUBLIC_CONFIG.IS_PROD && window.location.hostname.endsWith('.nasa.gov');
</script>

<svelte:head>
    {#if shouldLoadUSGovAnalytics}
        <!-- We participate in the US government's analytics program. See the data at analytics.usa.gov. -->
        <script
            async
            type="text/javascript"
            src="https://dap.digitalgov.gov/Universal-Federated-Analytics-Min.js?agency=NASA"
            id="_fed_an_ua_tag"
        ></script>
    {/if}
</svelte:head>
