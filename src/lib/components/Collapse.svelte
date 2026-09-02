<script lang="ts">
    import type { Snippet } from 'svelte';

    // Svelte 5 migration (G1): this component previously declared BOTH a string prop
    // named `title` and a `<slot name="title">`. In Svelte 5 slots become snippets, and
    // snippets are just props -- so the two collided. `sv migrate` detected that, refused
    // the component and left it in Svelte 4 syntax, but still migrated its callers to
    // `{#snippet title()}`. Callers therefore passed a *function* into a prop the
    // component treated as a *string*, and `{#if title}` is truthy for a function, so the
    // page rendered the function's own source text where the heading belonged. It failed
    // silently at runtime; svelte-check reported it only as
    // `Type '() => any' is not assignable to type 'string'`.
    // Resolved by making `title` snippet-only. The 6 former string call sites now pass
    // `{#snippet title()}...{/snippet}`.
    interface Props {
        /** rendered as the collapse summary; pass as a snippet */
        title?: Snippet;
        open?: boolean;
        arrow?: boolean;
        /** applied to both title and content */
        backgroundColor?: string;
        /** enable light border when using a white background color */
        border?: boolean;
        children?: Snippet;
    }

    let { title, open = true, arrow = true, backgroundColor = '', border = false, children }: Props = $props();
</script>

<details {open} class="collapse {arrow ? 'collapse-arrow' : ''} bg-base-100 {border ? 'border border-base-300' : ''} {backgroundColor}">
    <summary class="collapse-title font-semibold {backgroundColor}">
        {@render title?.()}
    </summary>
    <div class="collapse-content text-sm">
        {@render children?.()}
    </div>
</details>
