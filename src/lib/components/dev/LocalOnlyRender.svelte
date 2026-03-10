<script lang="ts">
    import { PUBLIC_CONFIG } from '$config/config.public';
</script>

{#if PUBLIC_CONFIG.isLocal()}
    <slot></slot>
{/if}
