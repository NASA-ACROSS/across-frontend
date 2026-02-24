<script lang="ts">
    export let title = '';
    export let icon: string | undefined = undefined;
    export let parentContainerClasses: string | undefined = '';
    export let containerClasses: string | undefined = '';
</script>

<div class="lg:mx-13 mx-3 mt-8 flex flex-col items-center {parentContainerClasses}">
    <!-- Section -->
    <div class="text-primary grow w-full {containerClasses}">
        <h2 class="text-3xl flex flex-col md:flex-row justify-between text-primary md:items-center items-start pb-3">
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
