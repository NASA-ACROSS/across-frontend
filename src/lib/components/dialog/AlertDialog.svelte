<script lang="ts">
    import Dialog from './Dialog.svelte';

    export let isOpen: boolean = false;
    export let body: string | undefined = undefined;
    export let title: string | undefined = 'Alert!';
    export let confirmDelaySeconds: number | undefined = undefined;
    export let confirmText: string | undefined = undefined;
</script>

<Dialog {title} {confirmText} bind:isOpen icon="alert-triangle" {confirmDelaySeconds} hasCancel={false} {body} color="warning">
    <slot />
</Dialog>
