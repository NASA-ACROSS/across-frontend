<script lang="ts">
    export let title = '';
    export let icon: string | undefined = undefined;
    export let containerClasses: string | undefined = '';
</script>

<div class="lg:mx-13 lg:w-256 w-full mx-3 my-8 flex flex-col items-center">
    <div class="text-primary grow {containerClasses}">
        <h2 class="text-3xl flex justify-between text-primary items-center pb-3">
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
