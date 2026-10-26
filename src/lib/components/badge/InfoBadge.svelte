<script lang="ts">
    import { BadgeType } from '#lib/types/BadgeType.js';
    import Badge from './Badge.svelte';
    import type { Snippet } from 'svelte';

    interface Props {
        children?: Snippet;
    }

    let { children }: Props = $props();
</script>

<Badge type={BadgeType.INFO}>
    {@render children?.()}
</Badge>
