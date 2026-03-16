<script lang="ts">
    import { afterNavigate } from '$app/navigation';
    import { page } from '$app/state';
    import Page from '$lib/components/Page.svelte';
    import Section from '$lib/components/Section.svelte';

    const docsLinks = [
        { href: '/docs/about', label: 'About' },
        { href: '/docs/data-model', label: 'Data Model' },
        { href: '/docs/data-ingestion', label: 'Data Ingestion' },
        { href: '/docs/tools', label: 'Tools' },
        { href: '/docs/code-of-conduct', label: 'Code of Conduct' },
        { href: '/docs/contributing', label: 'Contributing' },
    ];

    const dataModelSubsections = [
        { href: '#observatories', label: 'Observatories' },
        { href: '#schedules', label: 'Schedules' },
        { href: '#units', label: 'Units' },
    ];

    const normalizePath = (path: string) => (path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path);

    let currentPath = normalizePath(page.url.pathname);

    afterNavigate(() => {
        currentPath = normalizePath(page.url.pathname);
    });

    $: isDataModelPage = currentPath === '/docs/data-model';
</script>

<Page center={true}>
    <Section containerClasses={'w-full'}>
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 p-4">
            <div class="col-span-1 rounded-box p-4">
                <div class="drawer drawer-open">
                    <input id="docs-drawer" type="checkbox" class="drawer-toggle" />
                    <div class="drawer-content z-10 w-full">
                        <label for="docs-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
                        <ul class="menu menu-lg p-0 gap-1 divide-y divide-base-300/70 w-full">
                            {#each docsLinks as link}
                                <li class="first:border-t last:border-b border-base-300/70 w-full">
                                    <a
                                        data-sveltekit-preload-data="tap"
                                        href={link.href}
                                        class={currentPath === normalizePath(link.href) ? 'active font-semibold docs-link-active' : ''}
                                    >
                                        {link.label}
                                    </a>
                                    {#if link.href === '/docs/data-model' && isDataModelPage}
                                        <ul class="rounded-box w-full divide-y divide-base-300/70">
                                            {#each dataModelSubsections as subsection}
                                                <li class="first:border-t border-base-300/70">
                                                    <a href={link.href + subsection.href} class="docs-subsection-link pl-4">
                                                        {subsection.label}
                                                    </a>
                                                </li>
                                            {/each}
                                        </ul>
                                    {/if}
                                </li>
                            {/each}
                        </ul>
                    </div>
                </div>
            </div>

            <div class="col-span-3 p-6">
                <slot />
            </div>
        </div>
    </Section>
</Page>

<style>
    .docs-link-active {
        border-left: 4px solid var(--color-nasa-blue);
        color: var(--color-nasa-blue);
    }

    .docs-subsection-link {
        font-size: 0.95rem;
    }
</style>
