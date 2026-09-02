<script lang="ts">
    import { BadgeType } from '$lib/types/BadgeType';
    import Badge from './Badge.svelte';
    interface Props {
        children?: import('svelte').Snippet;
    }

    let { children }: Props = $props();
</script>

<Badge type={BadgeType.INFO}>
    {@render children?.()}
</Badge>
