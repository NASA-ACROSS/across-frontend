<script lang="ts">
    import { afterNavigate } from '$app/navigation';
    import { page } from '$app/state';
    import Page from '$lib/components/Page.svelte';

    type SidebarLink = { href: string; label: string };
    type SidebarItem = SidebarLink & { subsections?: SidebarLink[] };

    const aboutLinks: SidebarItem[] = [
        { href: '/about', label: 'About' },
        {
            href: '/about/data-models',
            label: 'Data Models',
            subsections: [
                { href: '#observatories', label: 'Observatories' },
                { href: '#schedules', label: 'Schedules' },
                { href: '#units', label: 'Units  & Conventions' },
            ],
        },
        { href: '/about/data-ingestion', label: 'Data Ingestion' },
        {
            href: '/about/tools',
            label: 'Tools & Code',
            subsections: [
                { href: '#visibility-calculator', label: 'Visibility Calculator' },
                { href: '#query-portals', label: 'Query Portals' },
                { href: '#python-libraries', label: 'Python Libraries' },
            ],
        },
        { href: '/about/code-of-conduct', label: 'Code of Conduct' },
        { href: '/about/contributing', label: 'Contributing' },
    ];

    const normalizePath = (path: string) => (path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path);

    let currentPath = normalizePath(page.url.pathname);

    afterNavigate(() => {
        currentPath = normalizePath(page.url.pathname);
    });
</script>

<Page showMenu={true}>
    <div slot="menu" class="drawer drawer-open lg:mt-16">
        <input id="about-drawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content z-10 w-full">
            <label for="about-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
            <ul class="menu menu-lg p-0 divide-y divide-base-300/70 w-full">
                {#each aboutLinks as link}
                    <li class="first:border-t last:border-b border-base-300/70 w-full">
                        <a
                            data-sveltekit-preload-data="tap"
                            href={link.href}
                            class={currentPath === normalizePath(link.href) ? 'active font-semibold border-l-4 border-nasa-blue' : ''}
                        >
                            {link.label}
                        </a>
                        {#if link.subsections && currentPath === normalizePath(link.href)}
                            <ul class="w-full divide-y divide-base-300/70">
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

    <slot />
</Page>
