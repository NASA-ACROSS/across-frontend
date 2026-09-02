<script lang="ts">
    import Collapse from '../Collapse.svelte';
    import Dialog from './Dialog.svelte';

    interface Props {
        isOpen?: boolean;
        error: { message: string; id: string; details?: string };
        title?: string | undefined;
        confirmDelaySeconds?: number | undefined;
        confirmText?: string | undefined;
    }

    let { isOpen = $bindable(false), error, title = 'Error!', confirmDelaySeconds = undefined, confirmText = undefined }: Props = $props();
</script>

<Dialog {title} {confirmText} bind:isOpen icon="bomb" {confirmDelaySeconds} hasCancel={false} color="error">
    <div class="flex flex-col gap-3">
        <p>{error.message}</p>
        <Collapse border={true} open={false}>
            {#snippet title()}Details{/snippet}
            <div class="py-3 max-h-40 overflow-auto">
                <pre class="whitespace-pre-wrap">{error.details}</pre>
            </div>
        </Collapse>

        <p class="text-xs">Error ID: {error.id}</p>
    </div>
</Dialog>
