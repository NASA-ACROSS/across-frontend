<script lang="ts">
    import HeaderTitle from './HeaderTitle.svelte';

    export let title = '';
    export let icon: string | undefined = undefined;
</script>

<section class="py-5 bg-secondary flex-grow-1">
    {#if icon}
        <div class="bx bx-{icon} opacity-70 mx-2" />
    {/if}
    <h1>{title}</h1>

    <slot />
</section>
