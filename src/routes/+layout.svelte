<script lang="ts">
    import '../app.css';

    import { PUBLIC_CONFIG } from '../config/config.public';

    // components
    import Navigation from '$lib/components/Navigation.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import USGOVAnalytics from '$lib/components/USGOVAnalytics.svelte';
    import { resolve } from '$app/paths';
    import { page } from '$app/stores';

    import type { PageData } from './$types';
    import type { Header } from '$lib/types/navigation';

    interface Props {
        data: PageData;
        children?: import('svelte').Snippet<[any]>;
    }

    let { data, children }: Props = $props();

    const navItems: Header[] = [
        {
            id: 'playground',
            label: 'Playground',
            href: resolve('/playground'),
            localOnly: true,
        },
        {
            id: 'data',
            label: 'Data',
            links: [
                { id: 'schedules', label: 'Schedules', href: resolve('/schedules') },
                { id: 'observations', label: 'Observations', href: resolve('/observations') },
                { id: 'observatories', label: 'Observatories', href: resolve('/observatories') },
            ],
        },
        {
            id: 'tools',
            label: 'Tools',
            links: [
                { id: 'data-ingestion-status', label: 'Data Ingestion Status', href: resolve('/ingestion-status') },
                { id: 'visibility-calculator', label: 'Visibility Calculator', href: resolve('/visibility-calculator') },
            ],
        },
        {
            id: 'about',
            label: 'About',
            href: resolve('/about'),
        },
        {
            id: 'api',
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

{#if !$page.url.pathname.startsWith('/user') && !$page.url.pathname.startsWith('/playground')}
    <USGOVAnalytics />
{/if}

<main class="min-h-screen m-0 flex flex-col content-between bg-primary">
    <Navigation {navItems} user={data.user}></Navigation>

    {@render children?.({ testid: 'main-slot' })}

    <Footer></Footer>
</main>
