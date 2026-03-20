<script lang="ts">
    import { afterNavigate } from '$app/navigation';
    import { page } from '$app/state';
    import Page from '$lib/components/Page.svelte';
    import Section from '$lib/components/Section.svelte';

    type SidebarLink = { href: string; label: string };
    type SidebarItem = SidebarLink & { subsections?: SidebarLink[] };

    const docsLinks: SidebarItem[] = [
        { href: '/docs/about', label: 'About' },
        {
            href: '/docs/data-models',
            label: 'Data Models',
            subsections: [
                { href: '#observatories', label: 'Observatories' },
                { href: '#schedules', label: 'Schedules' },
                { href: '#units', label: 'Units' },
            ],
        },
        { href: '/docs/data-ingestion', label: 'Data Ingestion' },
        {
            href: '/docs/tools',
            label: 'Tools & Code',
            subsections: [
                { href: '#visibility-calculator', label: 'Visibility Calculator' },
                { href: '#query-portals', label: 'Query Portals' },
                { href: '#python-libraries', label: 'Python Libraries' },
            ],
        },
        { href: '/docs/code-of-conduct', label: 'Code of Conduct' },
        { href: '/docs/contributing', label: 'Contributing' },
    ];

    const normalizePath = (path: string) => (path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path);

    let currentPath = normalizePath(page.url.pathname);

    afterNavigate(() => {
        currentPath = normalizePath(page.url.pathname);
    });
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
                                        class={currentPath === normalizePath(link.href) ? 'active font-semibold border-l-4 border-nasa-blue' : ''}
                                    >
                                        {link.label}
                                    </a>
                                    {#if link.subsections && currentPath === normalizePath(link.href)}
                                        <ul class="rounded-box w-full divide-y divide-base-300/70">
                                            {#each link.subsections as subsection}
                                                <li class="first:border-t border-base-300/70">
                                                    <a href={link.href + subsection.href} class="text-[.95rem] pl-4">
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
