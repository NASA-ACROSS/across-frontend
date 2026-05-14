<script lang="ts">
    import Dialog from '$lib/components/dialog/Dialog.svelte';
    import InfoDialog from '$lib/components/dialog/InfoDialog.svelte';
    import AlertDialog from '$lib/components/dialog/AlertDialog.svelte';
    import ErrorDialog from '$lib/components/dialog/ErrorDialog.svelte';
    import SuccessDialog from '$lib/components/dialog/SuccessDialog.svelte';

    let isCustomOpen = false;
    let isInfoOpen = false;
    let isSuccessOpen = false;
    let isWarningOpen = false;
    let isErrorOpen = false;

    let title: string | undefined = undefined;
    let confirmDelaySeconds: number | undefined = undefined;
    let icon: string | undefined = undefined;
    let defaultBody: string =
        "You've opened the dialog! You can do whatever you want with this one, \
        it can have a custom icon, a title, a body or slotted content, only a confirm button, \
        a specific color (test it out). It may optionally have a confirm delay.";

    let body: string | undefined = undefined;
    let dialogColor: 'info' | 'success' | 'warning' | 'error' | undefined = undefined;
</script>

<div class="flex flex-col gap-3">
    <div class="flex flex-row gap-2">
        <fieldset class="fieldset bg-base-200 border-base-300 w-xs border p-4 flex flex-col">
            <legend class="fieldset-legend">Dialog Details</legend>
            <label class="input">
                <span class="label">Title</span>
                <input type="text" placeholder="Title" bind:value={title} />
            </label>

            <textarea class="textarea" placeholder="Body of the dialog..." bind:value={body}></textarea>
        </fieldset>

        <div class="flex flex-col gap-3">
            <fieldset class="fieldset bg-base-200 border-base-300 border p-4">
                <legend class="fieldset-legend">Settings</legend>

                <label class="input">
                    <span class="label">Confirm Delay (applies to all)</span>
                    <input type="number" placeholder="Seconds" bind:value={confirmDelaySeconds} />
                </label>

                <div class="flex gap-2 items-center">
                    <label class="input">
                        <span class="label">Icon</span>
                        <input type="text" placeholder="info-circle" bind:value={icon} />
                    </label>
                    <p class="link decoration-dashed">
                        <a href="https://boxicons.com/icons?free=true" target="_blank" rel="noopener noreferrer">Boxicons</a>
                    </p>
                </div>

                <select class="select" bind:value={dialogColor} placeholder="Pick a color">
                    <option disabled selected>Pick a color</option>
                    <option value="neutral">Neutral</option>
                    <option value="info">Info</option>
                    <option value="success">Success</option>
                    <option value="warning">Warning</option>
                    <option value="error">Error</option>
                </select>
            </fieldset>
        </div>
    </div>

    <div class="flex flex-row gap-3">
        <button class="btn" on:click={() => (isCustomOpen = true)}>Open Dialog</button>
        <button class="btn btn-info" on:click={() => (isInfoOpen = true)}>Open Info</button>
        <button class="btn btn-success" on:click={() => (isSuccessOpen = true)}>Open Success</button>
        <button class="btn btn-warning" on:click={() => (isWarningOpen = true)}>Open Warning</button>
        <button class="btn btn-error" on:click={() => (isErrorOpen = true)}>Open Error</button>
    </div>
</div>

<Dialog {title} {confirmDelaySeconds} bind:isOpen={isCustomOpen} {icon} color={dialogColor} body={body ?? defaultBody} />

<InfoDialog
    bind:isOpen={isInfoOpen}
    {confirmDelaySeconds}
    confirmText="Got It!"
    body="This is an info dialog. It has a preset icon, a title, a body or slotted content, and only a confirm button. It may optionally have a confirm delay."
/>
<SuccessDialog
    bind:isOpen={isSuccessOpen}
    {confirmDelaySeconds}
    confirmText="Sweet!"
    body="This is a success dialog. It has a preset icon, a title, a body or slotted content, and only a confirm button. It may optionally have a confirm delay."
/>

<AlertDialog
    bind:isOpen={isWarningOpen}
    {confirmDelaySeconds}
    confirmText="Yikes!"
    body="This is a warning dialog. It has a preset icon, a title, a body or slotted content, and only a confirm button. It may optionally have a confirm delay."
/>

<ErrorDialog
    bind:isOpen={isErrorOpen}
    {confirmDelaySeconds}
    confirmText="Barnacles!"
    error={{
        id: 'ERROR_UUID_1234',
        message:
            'This is an error dialog. It has a preset icon, a title, an error message, a collapsible details section, and a confirm button.',
        details:
            "This is where you can put more information about the error, such as a stack trace or debugging info. This section is collapsible, so it won't overwhelm the user if they don't want to see it. Some example details about the error are included here to demonstrate the formatting and capabilities of this section. You can put as much information here as you need, and it will be displayed in a scrollable container if it exceeds the maximum height. ",
    }}
/>
