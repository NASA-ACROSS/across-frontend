<script lang="ts">
    export let visible: boolean;
    export let title: string = 'Confirmation';
    export let body: string = 'Are you sure?';
    export let confirmHook: Function;

    const confirm = (confirm: boolean) => {
        visible = !visible;
        confirmHook(confirm);
    };
</script>

{#if visible}
    <!-- Modal markup -->
    <div class="modal modal-sm d-block" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{title}</h5>
                    <button
                        type="button"
                        class="btn-close"
                        aria-label="Close"
                        on:click={() => confirm(false)}
                    ></button>
                </div>
                <div class="modal-body">
                    <p>{body}</p>
                </div>
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-secondary btn-sm"
                        on:click={() => confirm(false)}>Close</button
                    >
                    <button
                        type="button"
                        class="btn btn-primary btn-sm"
                        on:click={() => confirm(true)}>Confirm</button
                    >
                </div>
            </div>
        </div>
    </div>
{/if}
