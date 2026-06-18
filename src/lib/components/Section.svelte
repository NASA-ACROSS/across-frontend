<script lang="ts">
    export let title = '';
    export let icon: string | undefined = undefined;
    export let type: 'row' | 'col' = 'col';
    export let wrap: boolean = false;

    // allow id for linking
    export let id = '';
</script>

<!-- Section -->
<div {id} class="w-full my-4 flex flex-col text-primary grow">
    <!-- Heading -->
    {#if icon || title || $$slots.buttons}
        <h2 class="text-3xl flex flex-col md:flex-row justify-between text-primary pb-3">
            <div class="flex gap-2 items-center wrap-anywhere">
                {#if icon}
                    <div class="bx bx-{icon} opacity-80" />
                {/if}
                {title}
            </div>

            <div class="flex justify-end">
                <slot name="buttons"></slot>
            </div>
        </h2>
    {/if}

    <div class="flex flex-{type} {wrap ? 'flex-wrap' : ''} gap-2">
        <slot />
    </div>
</div>
