<script lang="ts">
    export let title = '';
    export let icon: string | undefined = undefined;
</script>

<div class="container my-md-3 py-md-4">
    {#if icon}
        <div class="bx bx-{icon} opacity-70 mx-2" />
    {/if}
    <h2>{title}</h2>

    <slot />
</div>
