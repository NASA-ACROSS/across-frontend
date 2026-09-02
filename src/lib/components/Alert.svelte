<script lang="ts">
    interface Props {
        type?: string;
        soft?: boolean;
        children?: import('svelte').Snippet;
    }

    let { type = 'info', soft = true, children }: Props = $props();
</script>

<div role="alert" class={`alert alert-${type} ${soft ? 'alert-soft' : ''} w-full place-content-center mx-auto`}>
    <span class="">
        {@render children?.()}
    </span>
</div>
