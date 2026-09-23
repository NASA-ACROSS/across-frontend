<script lang="ts">
    import type { Header } from '$lib/types/navigation';
    import NavLink from './NavLink.svelte';

    export let header: Header;

    const borderClasses = 'border-3 border-transparent hover:border-3 hover:border-nasa-blue-tint';
</script>

<li class="text-primary-content text-lg font-bold">
    {#if header.links}
        <div data-testid="NavHeader:{header.id}" class="dropdown dropdown-hover dropdown-end {borderClasses}">
            <div tabindex="0" role="button">
                {header.label}
                <div class="bx bx-chevron-down"></div>
            </div>
            <ul class="dropdown-content menu bg-primary z-1 w-52 p-2 shadow-sm font-normal">
                {#each header.links as link}
                    <NavLink {link} />
                {/each}
            </ul>
        </div>
    {:else}
        <div class={borderClasses}>
            <NavLink link={header} />
        </div>
    {/if}
</li>
