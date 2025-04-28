<script lang="ts">
    export let title = '';
    export let icon: string | undefined = undefined;
</script>

<div class="container rounded-2 my-3 py-3">
    <h2>
        {#if icon}
            <div class="bx bx-{icon} opacity-70 mx-2" />
        {/if}
        {title}
    </h2>

    <slot />
</div>
