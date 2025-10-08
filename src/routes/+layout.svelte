<script lang="ts">
    import '../app.css';

    import { PUBLIC_CONFIG } from '../config/config.public';

    // components
    import Navigation from '$lib/components/Navigation.svelte';
    import Footer from '$lib/components/Footer.svelte';

    import type { PageData } from './$types';
    export let data: PageData;
</script>

<svelte:head>
    <meta charset="utf-8" />
    <title>ACROSS</title>

    <!-- Viewport -->
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!-- Meta -->
    <meta name="build-version" content={PUBLIC_CONFIG.BUILD_VERSION} />

    <!-- BoxIcons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css" />
</svelte:head>

<main class="min-h-screen m-0 flex flex-col content-between bg-primary">
    <Navigation user={data.user} API_URL={data.API_URL}></Navigation>

    <slot />

    <Footer></Footer>
</main>
