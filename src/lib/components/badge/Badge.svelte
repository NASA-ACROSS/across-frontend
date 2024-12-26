<script lang="ts">
    import { BadgeType } from '$lib/types/BadgeType';

    const badgeClasses = {
        [BadgeType.DISABLED]: 'bg-secondary',
        [BadgeType.INFO]: 'bg-info',
        [BadgeType.WARN]: 'bg-warning text-dark',
        [BadgeType.ALERT]: 'bg-danger',
    };

    export let type: BadgeType = BadgeType.INFO;
</script>

<div class="badge rounded-pill mx-1 px-2 {badgeClasses[type]} shadow-secondary">
    <slot></slot>
</div>
