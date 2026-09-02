<script lang="ts">
    import { BadgeType } from '$lib/types/BadgeType';

    const badgeClasses = {
        [BadgeType.DISABLED]: 'bg-secondary',
        [BadgeType.INFO]: 'bg-info',
        [BadgeType.WARN]: 'bg-warning text-dark',
        [BadgeType.ALERT]: 'bg-danger',
    };

    interface Props {
        type?: BadgeType;
        children?: import('svelte').Snippet;
    }

    let { type = BadgeType.INFO, children }: Props = $props();
</script>

<div class="badge rounded-pill mx-1 px-2 {badgeClasses[type]} shadow-secondary">
    {@render children?.()}
</div>
