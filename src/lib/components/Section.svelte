<script lang="ts">
    export let title = '';
    export let icon: string | undefined = undefined;
</script>

<section class="py-4 bg-secondary">
    <h1>
        {#if icon}
            <div class="bx bx-{icon} opacity-70 mx-2" />
        {/if}
        {title}
    </h1>

    <slot />
</section>
