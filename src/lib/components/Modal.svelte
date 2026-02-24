<script lang="ts">
    // @ts-nocheck -- TODO: this component will be refactored in the near future, so we are ignoring type errors for now
    export let showModal: boolean;
    export let centered = false;

    let dialog; // HTMLDialogElement

    $: if (dialog && showModal) {
        dialog.showModal();
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
{#if showModal}
    <dialog id="triggerInfoModal" bind:this={dialog} on:close={() => (showModal = false)} on:click|self={() => dialog.close()} class="modal d-block">
        <div class="modal-dialog {centered ? 'modal-dialog-centered' : ''}" role="document" on:click|stopPropagation>
            <div class="modal-content">
                <div class="modal-header">
                    <slot name="header" />
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" on:click={() => dialog.close()}></button>
                </div>
                <div class="modal-body">
                    <slot />
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary btn-sm" data-bs-dismiss="modal" autofocus on:click={() => dialog.close()}>Close</button>
                </div>
            </div>
        </div>
    </dialog>
{/if}

<style>
    dialog {
        border-radius: 0.2em;
        border: none;
        padding: 0;
        background: rgba(0, 0, 0, 0);
        color: white;
    }
    dialog::backdrop {
        background: rgba(0, 0, 0, 0.3);
    }
    dialog > div {
        padding: 1em;
    }
    dialog[open] {
        animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    @keyframes zoom {
        from {
            transform: scale(0.95);
        }
        to {
            transform: scale(1);
        }
    }
    dialog[open]::backdrop {
        animation: fade 0.2s ease-out;
    }
    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    button {
        display: block;
    }
</style>
