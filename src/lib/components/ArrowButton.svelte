<script lang="ts">
    export let name: string = '';
    export let href: string | null = null;
    export let containerClasses = '';
    export let textClasses = '';
    export let direction: 'right' | 'left' = 'right';
</script>

<div class="my-2 {containerClasses}">
    <a {href} class="text-lg h-auto {textClasses}">
        <button class="flex me-0 cursor-pointer gap-1" on:click>
            <span class="color-primary-content self-center pb-1">
                {#if name}
                    {name}
                {:else}
                    <slot></slot>
                {/if}
            </span>
            <svg
                class="btn-xs btn-circle bg-accent border-none {direction === 'left' ? 'left-arrow' : ''}"
                viewBox="0 0 32 32"
                fill="var(--color-nasa-white)"
                xmlns="http://www.w3.org/2000/svg"
                ><path d="M8 16.956h12.604l-3.844 4.106 1.252 1.338L24 16l-5.988-6.4-1.252 1.338 3.844 4.106H8v1.912z" class=""></path></svg
            >
        </button>
    </a>
</div>

<style>
    .left-arrow {
        transform: scaleX(-1);
    }
</style>
