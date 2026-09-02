<script lang="ts">
    import type { Header } from '$lib/types/navigation';
    import MobileLink from './MobileLink.svelte';

    interface Props {
        header: Header;
    }

    let { header }: Props = $props();
</script>

<li class="text-primary-content">
    <!--
        Svelte 5 migration (B1): this branch used to wrap its contents in a second <li>
        nested directly inside this one. Svelte 5 rejects invalid HTML nesting because
        hydration assumes the server-rendered markup survives in the browser, and browsers
        "repair" <li>-inside-<li> by hoisting it out. The inner <li> was redundant anyway:
        <p> + <ul> is daisyUI's expected shape for a menu item with a submenu.
    -->
    {#if header.links}
        <p class=" hover:cursor-default">{header.label}</p>
        <ul class="p-2 font-small">
            {#each header.links as link}
                <MobileLink {link} />
            {/each}
        </ul>
    {:else}
        <MobileLink link={header} />
    {/if}
</li>
