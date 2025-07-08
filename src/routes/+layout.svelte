<script lang="ts">
    import '../app.css';

    import { PUBLIC_CONFIG } from '../config/config.public';
    import { onMount } from 'svelte';

    import { page } from '$app/stores';

    import { beforeNavigate } from '$app/navigation';
    import { updated } from '$app/stores';

    // components
    import Navigation from '$lib/components/Navigation.svelte';
    import Footer from '$lib/components/Footer.svelte';

    import { loggedIn } from '$lib/stores/login';
    import type { PageData } from './$types';
    export let data: PageData;

    $: {
        loggedIn.set(!!data.user);
    }

    $: DOM_MOUNTED = false;

    onMount(() => {
        DOM_MOUNTED = true;

        // bootstrap creates a partially transparent black backdrop when displaying modals
        // bootstrap does not like to clean them up, they stack up and create an opaque black background
        // this removes extra backdrops when an event to show modal is triggered
        document.addEventListener('show.bs.modal', () => {
            const backdrops = document.getElementsByClassName(
                'modal-backdrop fade show'
            );
            for (const backdrop of backdrops) {
                backdrop.remove();
            }
        });
    });

    beforeNavigate(({ willUnload, to }) => {
        if ($updated && !willUnload && to?.url) {
            location.href = to.url.href;
        }
    });
</script>

<svelte:head>
    <meta charset="utf-8" />
    <title>ACROSS</title>

    <!-- Viewport -->
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!-- Meta -->
    <meta name="build-version" content={PUBLIC_CONFIG.BUILD_VERSION} />

    <!-- BoxIcons -->
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css"
    />

    {#key $page.url}
        {#if DOM_MOUNTED}
            <!-- Main Theme Script -->
            <!-- <script src="{base}/assets/js/theme.min.js"></script> -->
        {/if}
    {/key}
</svelte:head>

<main class="d-flex flex-column min-vh-100 m-0">
    <Navigation user={data.user}></Navigation>

    <slot />

    <Footer></Footer>
</main>
