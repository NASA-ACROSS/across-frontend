<script lang="ts">
    import { PUBLIC_CONFIG } from '$config/config.public';
    interface Props {
        children?: import('svelte').Snippet;
    }

    let { children }: Props = $props();
</script>

{#if PUBLIC_CONFIG.IS_LOCAL}
    {@render children?.()}
{/if}
