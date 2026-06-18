<script lang="ts">
    export let title: string | undefined = 'Dialog';
    export let icon: string | undefined;
    export let body: string | undefined = undefined;
    export let confirmText: string | undefined = 'OK';
    export let hasCancel: boolean | undefined = true;
    export let cancelText: string | undefined = 'Cancel';
    export let confirmDelaySeconds: number | undefined = undefined;
    export let isOpen: boolean = false;

    export let color: 'info' | 'warning' | 'error' | 'success' | 'neutral' = 'info';

    export let onConfirm: (() => void) | undefined = undefined;
    export let onClose: (() => void) | undefined = undefined;

    let dialog: HTMLDialogElement;
    let timeout: ReturnType<typeof setTimeout> | undefined = undefined;
    let countdownRemaining = confirmDelaySeconds ?? 0;

    // Tailwind doesn't support dynamic class names (they must be defined statically
    // somewhere in the project), so we have to map the colors manually.
    // The assumption is that the confirm button color will match the border color, but this
    // can be easily modified if needed.
    const borderColors = {
        info: 'border-info',
        warning: 'border-warning',
        error: 'border-error',
        success: 'border-success',
        neutral: 'border-neutral',
    };

    $: isConfirmDisabled = countdownRemaining > 0;

    $: if (isOpen) {
        countdownRemaining = confirmDelaySeconds ?? 0;
        countdown(confirmDelaySeconds ?? 0);
        dialog?.showModal();
    }

    $: if (!isOpen && dialog?.open) {
        dialog.close();
    }

    $: border = color ? `border-3 ${borderColors[color]}` : '';

    const countdown = (seconds: number) => {
        if (seconds) {
            timeout = setTimeout(() => {
                countdownRemaining = seconds - 1;
                countdown(countdownRemaining);
            }, 1000);
        }
    };

    const confirm = () => {
        if (onConfirm) onConfirm();

        close();
    };

    const clearCountdown = () => {
        if (!timeout) return;

        clearTimeout(timeout);
        timeout = undefined;
    };

    const close = () => {
        clearCountdown();
        isOpen = false;

        if (onClose) onClose();
    };
</script>

<dialog class="modal" bind:this={dialog} on:close={close}>
    <div class="modal-box min-h-1/3 overscroll-none flex flex-col justify-between gap-3 {border}">
        <!-- header -->
        <div class="flex items-center flex-row">
            <!-- title & icon -->
            <div class="flex-1 flex items-center gap-2">
                {#if icon}
                    <i class="text-3xl bxf bx-{icon} text-{color}" />
                {/if}
                <h2 class="font-bold text-lg">{title}</h2>
            </div>

            <!-- close button -->
            <div class="flex flex-end">
                <button class="btn btn-xs btn-ghost" on:click={close} disabled={isConfirmDisabled}>
                    <i class="text-2xl bx bx-x h-max" />
                </button>
            </div>
        </div>

        <!-- body -->
        <div class="flex-1 m-2">
            {#if body}
                <p>{body}</p>
            {:else}
                <slot />
            {/if}
        </div>

        <!-- footer -->
        <div class="flex justify-around gap-3">
            <button class="btn flex-1/3 btn-{color}" on:click={confirm} disabled={isConfirmDisabled}>
                {confirmText}
                {#if isConfirmDisabled}
                    ({countdownRemaining})
                {/if}
            </button>
            {#if hasCancel}
                <button class="btn btn-accent" on:click={close}>{cancelText}</button>
            {/if}
        </div>
    </div>
</dialog>
