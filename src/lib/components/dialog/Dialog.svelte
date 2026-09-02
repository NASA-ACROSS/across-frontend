<script lang="ts">
    interface Props {
        title?: string | undefined;
        icon: string | undefined;
        body?: string | undefined;
        confirmText?: string | undefined;
        hasCancel?: boolean | undefined;
        cancelText?: string | undefined;
        confirmDelaySeconds?: number | undefined;
        isOpen?: boolean;
        color?: 'info' | 'warning' | 'error' | 'success' | 'neutral';
        onConfirm?: (() => void) | undefined;
        onClose?: (() => void) | undefined;
        children?: import('svelte').Snippet;
    }

    let {
        title = 'Dialog',
        icon,
        body = undefined,
        confirmText = 'OK',
        hasCancel = true,
        cancelText = 'Cancel',
        confirmDelaySeconds = undefined,
        isOpen = $bindable(false),
        color = 'info',
        onConfirm = undefined,
        onClose = undefined,
        children,
    }: Props = $props();

    // Svelte 5 migration: `$state()` with no argument is `undefined` until assigned,
    // and svelte-check 4 now types that honestly (`export let` used to launder it). The
    // annotation has to admit undefined; use sites guard with `?.`.
    let dialog: HTMLDialogElement | undefined = $state();
    let timeout: ReturnType<typeof setTimeout> | undefined = undefined;
    let countdownRemaining = $state(confirmDelaySeconds ?? 0);

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
    // Svelte 5 migration: replaces two `run()` shims from 'svelte/legacy'.
    // Genuine imperative DOM side effect, so $effect is correct here (unlike the purely
    // derived values above). It intentionally does not run during SSR -- showModal()
    // needs a real element, and `dialog` is only populated after bind:this on the client.
    $effect(() => {
        if (isOpen) {
            countdownRemaining = confirmDelaySeconds ?? 0;
            countdown(confirmDelaySeconds ?? 0);
            // showModal() throws if the dialog is already open
            if (dialog && !dialog.open) dialog.showModal();
        } else if (dialog?.open) {
            dialog.close();
        }
    });

    let isConfirmDisabled = $derived(countdownRemaining > 0);
    let border = $derived(color ? `border-3 ${borderColors[color]}` : '');
</script>

<dialog class="modal" bind:this={dialog} onclose={close}>
    <div class="modal-box min-h-1/3 overscroll-none flex flex-col justify-between gap-3 {border}">
        <!-- header -->
        <div class="flex items-center flex-row">
            <!-- title & icon -->
            <div class="flex-1 flex items-center gap-2">
                {#if icon}
                    <i class="text-3xl bxf bx-{icon} text-{color}"></i>
                {/if}
                <h2 class="font-bold text-lg">{title}</h2>
            </div>

            <!-- close button -->
            <div class="flex flex-end">
                <button class="btn btn-xs btn-ghost" onclick={close} disabled={isConfirmDisabled}>
                    <i class="text-2xl bx bx-x h-max"></i>
                </button>
            </div>
        </div>

        <!-- body -->
        <div class="flex-1 m-2">
            {#if body}
                <p>{body}</p>
            {:else}
                {@render children?.()}
            {/if}
        </div>

        <!-- footer -->
        <div class="flex justify-around gap-3">
            <button class="btn flex-1/3 btn-{color}" onclick={confirm} disabled={isConfirmDisabled}>
                {confirmText}
                {#if isConfirmDisabled}
                    ({countdownRemaining})
                {/if}
            </button>
            {#if hasCancel}
                <button class="btn btn-accent" onclick={close}>{cancelText}</button>
            {/if}
        </div>
    </div>
</dialog>
