<script lang="ts">
    import Collapse from '../Collapse.svelte';
    import Dialog from './Dialog.svelte';

    export let isOpen: boolean = false;
    export let error: { message: string; id: string; details?: string };
    export let title: string | undefined = 'Error!';
    export let confirmDelaySeconds: number | undefined = undefined;
    export let confirmText: string | undefined = undefined;
</script>

<Dialog {title} {confirmText} bind:isOpen icon="bomb" {confirmDelaySeconds} hasCancel={false} color="error">
    <div class="flex flex-col gap-3">
        <p>{error.message}</p>
        <Collapse title="Details" border={true} open={false}>
            <div class="py-3 max-h-40 overflow-auto">
                <pre class="whitespace-pre-wrap">{error.details}</pre>
            </div>
        </Collapse>

        <p class="text-xs">Error ID: {error.id}</p>
    </div>
</Dialog>
