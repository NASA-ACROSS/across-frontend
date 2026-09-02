<script lang="ts">
    import Dialog from './Dialog.svelte';

    interface Props {
        isOpen?: boolean;
        body?: string | undefined;
        title?: string | undefined;
        confirmDelaySeconds?: number | undefined;
        confirmText?: string | undefined;
        children?: import('svelte').Snippet;
    }

    let {
        isOpen = $bindable(false),
        body = undefined,
        title = 'Awesome, it worked!',
        confirmDelaySeconds = undefined,
        confirmText = undefined,
        children,
    }: Props = $props();
</script>

<Dialog {title} {confirmText} bind:isOpen icon="check-circle" {confirmDelaySeconds} hasCancel={false} {body} color="success">
    {@render children?.()}
</Dialog>
