<script lang="ts">
    export let buttonText = 'Open Dialog';
    export let title = 'My Dialog';
    export let confirmationText = 'Confirm';
    export let confirmationDelay = 3;
    export let border = false;
    export let action;
    /** @type {import('./$types').ActionData} */
    export let form;

    let dialog: HTMLDialogElement;
    $: {
        if (dialog) {
            if (isOpen) {
                dialog.showModal();
            } else {
                dialog.close();
            }
        }
    }

    let countdownRemaining = 0;
    let isOpen = false;
    let isConfirmEnabled = false;

    let countdown = (countdownRemaining: number) => {
        countdownRemaining = countdownRemaining - 1;
        if (countdownRemaining) {
            setTimeout(() => {
                countdown(countdownRemaining);
            }, 1000);
        } else {
            isConfirmEnabled = true;
        }
    };
</script>

<button
    class={`btn btn-accent text-lg`}
    type="button"
    on:click={() => {
        isOpen = true;
        isConfirmEnabled = false;
        countdownRemaining = confirmationDelay;
        setTimeout(() => {
            countdown(countdownRemaining);
        }, 1000);
    }}
>
    <i class="bx bx-log-out opacity-70 me-2"></i>
    {buttonText}
</button>
{#if form?.dialogSuccess}
    <div>Dialog Success!</div>
{/if}

<dialog class="modal" bind:this={dialog}>
    <form method="post" {action}>
        <div class="modal-box bg-base-100 p-6 w-full max-w-xl shadow-2xl {border ? 'border-3 border-accent' : ''}">
            <div class="text-lg font-bold mb-4 flex flex-row justify-between">
                <h3 class="flex">{title}</h3>
                <button class="justify-end btn btn-sm btn-primary max-h-8" title="Close" on:click={() => (isOpen = false)}>X</button>
            </div>
            <div class="pb-4">
                <slot></slot>
            </div>
            <div class="flex justify-between">
                <div>
                    <button
                        data-sveltekit-preload-data="off"
                        data-sveltekit-preload-code="off"
                        class="btn btn-sm btn-accent w-xs max-w-md"
                        disabled={!isConfirmEnabled}
                        type="submit"
                        title={confirmationText}
                    >
                        {#if !isConfirmEnabled}
                            <span class="loading loading-spinner" role="status" aria-hidden="true"></span>
                        {:else}
                            {confirmationText}
                        {/if}
                    </button>
                </div>
                <div>
                    <button class="btn btn-sm btn-primary" type="button" title="Cancel" on:click={() => (isOpen = false)}> Cancel </button>
                </div>
            </div>
        </div>
    </form>
</dialog>
