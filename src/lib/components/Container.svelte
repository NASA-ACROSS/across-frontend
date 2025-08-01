<script lang="ts">
    export let title = '';
    export let icon: string | undefined = undefined;
    export let center: boolean | undefined = false;
    export let containerClasses: string | undefined = undefined;
</script>

<div
    class="lg:mx-13 mx-3 my-8 flex flex-col {center
        ? 'items-center'
        : ''} {containerClasses}"
>
    <div class="text-primary">
        <h2
            class="text-3xl flex justify-between text-primary items-center pb-3"
        >
            <div>
                {#if icon}
                    <div class="bx bx-{icon} opacity-80" />
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
