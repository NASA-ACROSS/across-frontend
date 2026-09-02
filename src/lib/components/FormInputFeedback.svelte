<script lang="ts">
    interface Props {
        type?: 'error' | 'warning' | 'success';
        children?: import('svelte').Snippet;
    }

    let { type = 'success', children }: Props = $props();

    // Svelte 5 migration (B8): was a `run()` shim from 'svelte/legacy' assigning into
    // `$state`. It is a pure function of `type`, so it is a textbook $derived.
    let styleClass = $derived(type === 'error' ? 'text-error' : type === 'warning' ? 'text-warning' : 'text-info');
</script>

<div class={styleClass}>
    {@render children?.()}
</div>
