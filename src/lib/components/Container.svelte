<script lang="ts">
    export let title = '';
    export let icon: string | undefined = undefined;
    export let center: boolean | undefined = false;
</script>

<div
    class="lg:mx-13 mx-3 my-6 flex flex-col {center
        ? 'place-items-center'
        : ''}"
>
    <div class="">
        <h2 class="text-2xl flex justify-between">
            <div>
                {#if icon}
                    <div class="bx bx-{icon} opacity-70" />
                {/if}
                {title}
            </div>

            <div class="flex justify-end">
                <slot name="buttons"></slot>
            </div>
        </h2>

        <slot />
    </div>
</div>
