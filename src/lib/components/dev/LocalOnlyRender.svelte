<script lang="ts">
    import { PUBLIC_CONFIG } from '$config/config.public';
    import type { Snippet } from 'svelte';
    interface Props {
        children?: Snippet;
    }

    let { children }: Props = $props();
</script>

{#if PUBLIC_CONFIG.IS_LOCAL}
    {@render children?.()}
{/if}
