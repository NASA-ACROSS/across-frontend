<script>
    import { BadgeType } from '$lib/types/BadgeType';
    import Badge from './Badge.svelte';
</script>

<Badge type={BadgeType.ALERT}>
    <slot></slot>
</Badge>
