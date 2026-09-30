<script lang="ts">
    import type { Snippet } from 'svelte';

    interface Props {
        type?: string;
        soft?: boolean;
        vertical?: boolean;
        children?: Snippet;
    }

    let { type = 'info', soft = true, vertical = true, children }: Props = $props();
</script>

<div role="alert" class={`alert alert-${type} ${soft ? 'alert-soft' : ''} ${vertical ? 'alert-vertical' : ''} grid w-full mx-auto`}>
    <span class="">
        {@render children?.()}
    </span>
</div>
