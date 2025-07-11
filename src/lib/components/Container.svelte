<script lang="ts">
    export let title = '';
    export let icon: string | undefined = undefined;
    export let center: boolean | undefined = false;
</script>

<div class="mx-10 my-3 py-3 flex flex-col {center ? 'place-items-center' : ''}">
    <div class="">
        <h2 class="text-2xl">
            {#if icon}
                <div class="bx bx-{icon} opacity-70 mx-2" />
            {/if}
            {title}
        </h2>

        <slot />
    </div>
</div>
