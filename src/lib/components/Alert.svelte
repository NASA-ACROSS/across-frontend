<script lang="ts">
    interface Props {
        type?: string;
        soft?: boolean;
        vertical?: boolean;
        children?: import('svelte').Snippet;
    }

    let { type = 'info', soft = true, vertical = true, children }: Props = $props();
</script>

<div role="alert" class={`alert alert-${type} ${soft ? 'alert-soft' : ''} ${vertical ? 'alert-vertical' : ''} grid w-full mx-auto`}>
    <span class="">
        {@render children?.()}
    </span>
</div>
