<script lang="ts">
    interface Props {
        id?: string;
        name?: string;
        href?: string | null;
        containerClasses?: string;
        textClasses?: string;
        direction?: 'right' | 'left';
        openInNewTab?: boolean;
        // Svelte 5 migration (B8): replaces the `createBubbler()` shim that `sv migrate`
        // injected from 'svelte/legacy' to emulate Svelte 4 `on:click` forwarding. No
        // caller currently forwards a click, but a callback prop keeps the capability
        // without depending on the deprecated compatibility layer.
        onclick?: (event: MouseEvent) => void;
        children?: import('svelte').Snippet;
    }

    let {
        id = '',
        name = '',
        href = null,
        containerClasses = '',
        textClasses = '',
        direction = 'right',
        openInNewTab = false,
        onclick,
        children,
    }: Props = $props();
</script>

<div class="my-2 {containerClasses}">
    <a
        data-testid="ArrowButton:{id}"
        data-sveltekit-preload-code="hover"
        data-sveltekit-preload-data="tap"
        {href}
        target={openInNewTab ? '_blank' : '_self'}
        class="text-lg h-auto no-underline hover:underline decoration-dashed underline-offset-4 {textClasses}"
    >
        <button class="flex me-0 cursor-pointer gap-1" {onclick}>
            <span class="color-primary-content self-center pb-1">
                {#if name}
                    {name}
                {:else}
                    {@render children?.()}
                {/if}
            </span>
            <svg
                class="btn-circle bg-accent border-none grid- w-8 h-8 {direction === 'left' ? 'left-arrow' : ''}"
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
