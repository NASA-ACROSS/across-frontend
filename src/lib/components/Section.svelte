<script lang="ts">
    export let title = '';
    export let icon: string | undefined = undefined;
    export let center: boolean | undefined = false;
</script>

<section
    class="pt-2 pb-5 color-base-300 flex flex-col flex-grow {center
        ? 'items-center'
        : ''}"
>
    <h1>
        {#if icon}
            <div class="bx bx-{icon} opacity-70 mx-2" />
        {/if}
        {title}
    </h1>

    <slot />
</section>
