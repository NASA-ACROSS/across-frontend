<script lang="ts">
    import '../app.css';

    import { PUBLIC_CONFIG } from '../config/config.public';

    // components
    import Navigation from '$lib/components/Navigation.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import { resolve } from '$app/paths';

    import type { PageData } from './$types';
    import type { Header } from '$lib/types/navigation';

    export let data: PageData;

    const navItems: Header[] = [
        {
            label: 'Playground',
            href: resolve('/playground'),
            localOnly: true,
        },
        {
            label: 'Data',
            links: [
                { label: 'Schedules', href: resolve('/schedules') },
                { label: 'Observations', href: resolve('/observations') },
                { label: 'Observatories', href: resolve('/observatories') },
            ],
        },
        {
            label: 'Tools',
            links: [
                { label: 'Data Ingestion Status', href: resolve('/ingestion-status') },
                { label: 'Visibility Calculator', href: resolve('/visibility-calculator') },
            ],
        },
        {
            label: 'About',
            href: resolve('/about'),
        },
        {
            label: 'API',
            href: data.apiDocsUrl,
            newTab: false,
        },
    ];
</script>

<svelte:head>
    <meta charset="utf-8" />
    <title>ACROSS</title>

    <!-- Viewport -->
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!-- Meta -->
    <meta name="build-version" content={PUBLIC_CONFIG.BUILD_VERSION} />

    <!-- BoxIcons -->
    <link href="https://cdn.boxicons.com/3.0.8/fonts/basic/boxicons.min.css" rel="stylesheet" />
    <!-- Filled Icons -->
    <link href="https://cdn.boxicons.com/3.0.8/fonts/filled/boxicons-filled.min.css" rel="stylesheet" />
</svelte:head>

<main class="min-h-screen m-0 flex flex-col content-between bg-primary">
    <Navigation {navItems} user={data.user}></Navigation>

    <slot />

    <Footer></Footer>
</main>
