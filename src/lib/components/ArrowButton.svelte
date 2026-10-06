<script lang="ts">
    import type { Snippet } from 'svelte';
    interface Props {
        id?: string;
        name?: string;
        href?: string | null;
        /**
         * Set the button type, "submit" for forms, defaults to "button" for everything else used with client side listeners for scripted behavior.
         * For more info see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button#type
         */
        type?: 'button' | 'submit' | 'reset' | null | undefined;
        containerClasses?: string;
        textClasses?: string;
        direction?: 'right' | 'left';
        openInNewTab?: boolean;
        disabled?: boolean;
        // Svelte 5 migration: replaces the `createBubbler()` shim that `sv migrate`
        // injected from 'svelte/legacy' to emulate Svelte 4 `on:click` forwarding. No
        // caller currently forwards a click, but a callback prop keeps the capability
        // without depending on the deprecated compatibility layer.
        onclick?: (event: MouseEvent) => void;
        children?: Snippet;
    }

    let {
        id = '',
        name = '',
        href = null,
        type = 'button',
        containerClasses = '',
        textClasses = '',
        direction = 'right',
        openInNewTab = false,
        disabled = false,
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
        <button class="flex me-0 cursor-pointer gap-1 disabled:cursor-not-allowed disabled:opacity-50" {disabled} {onclick}>
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
