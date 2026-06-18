<script lang="ts">
    import type { Header } from '$lib/types/navigation';
    import MobileLink from './MobileLink.svelte';

    export let header: Header;
</script>

<li class="text-primary-content">
    {#if header.links}
        <li>
            <p class=" hover:cursor-default">{header.label}</p>
            <ul class="p-2 font-small">
                {#each header.links as link}
                    <MobileLink {link} />
                {/each}
            </ul>
        </li>
    {:else}
        <MobileLink link={header} />
    {/if}
</li>
