<script lang="ts">
    import { applyAction, enhance } from '$app/forms';
    import { goto, invalidateAll } from '$app/navigation';

    export let id;
    export let item;
    export let key;
    export let value;
    export let index;
    export let type;
    export let toastSuccessCallback;
    export let toastFailCallback;

    let status = '';

    // given a string, parse the % and set a color, override color with yellow if in SAA
    const probabilityColor = (text: string) => {
        let color = 'rgb(210,210,210)';
        // test that the required characters are present
        const required_delimiters = [':', '%'];
        if (text.split('').some((val) => required_delimiters.includes(val))) {
            // find the percentage
            const percent = parseInt(
                text
                    .split(required_delimiters[0])[1]
                    .split(required_delimiters[1])[0] || '0'
            );
            if (percent >= 90) color = 'rgb(0,200,0)';
            if (percent >= 70 && percent < 90) color = 'rgb(255,225,0)';
            if (percent < 70) color = 'rgb(255,0,0)';
        }

        // yellow when partially inside SAA
        if (text.includes('partially inside SAA')) color = 'rgb(255,225,0)';

        return color;
    };

    /**
     * sveltekit progressive form enhancement
     * see docs for more information
     * https://kit.svelte.dev/docs/form-actions#progressive-enhancement-customising-use-enhance
     *
     * `formElement` is this `<form>` element.
     * `formData` is its `FormData` object that's about to be submitted.
     * `action` is the URL to which the form is posted.
     * `cancel()` will prevent the submission.
     * `submitter` is the `HTMLElement` that caused the form to be submitted.
     * @param param0
     */
    const enhancedForm = ({
        formElement,
        formData,
        action,
        cancel,
        submitter,
    }) => {
        // set form data to send, specific to this table
        if (status === item.status) {
            cancel();
        }
        formData.set('id', id);
        formData.set('action', status);

        /**
         * `result` is an `ActionResult` object
         * `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
         */
        return async ({ result, update }) => {
            if (result.type === 'success') {
                // rerun all `load` functions, following the successful update
                await invalidateAll();
            } else if (result.type === 'redirect') {
                goto(result.location);
            } else {
                await applyAction(result);
            }
        };
    };
</script>

<div>
    {#if type == 'key'}
        {#if key == 'actions'}
            <div style="d-flex flex-row justify-content-end">
                <b style="letter-spacing: 0.1em">{value}</b>
            </div>
        {:else}
            <b style="letter-spacing: 0.1em">{value}</b>
        {/if}
    {:else if key == 'id'}
        <div style="color:rgb(160,160,255)">{value}</div>
    {:else if key == 'created_on' || key == 'trigger_time'}
        <div>{value.split('T').join('\n')}</div>
    {:else if key == 'trigger_info'}
        <button
            class="btn btn-sm btn-outline-primary"
            data-bs-toggle="modal"
            data-bs-target="#triggerInfoModal">Show Trigger Info</button
        >
    {:else if key == 'status'}
        {#if value == 'Requested'}
            <div style="color:rgb(255,225,0)">{value}</div>
        {:else if value == 'Rejected' || value == 'Declined'}
            <div style="color:rgb(255,50,50)">{value}</div>
        {:else if value == 'Approved'}
            <div style="color:rgb(0,200,0)">{value}</div>
        {:else if value == 'Executed'}
            <div style="color:rgb(160,160,255)">{value}</div>
        {:else}
            <div>{value}</div>
        {/if}
    {:else if key == 'too_info'}
        <div style="color:{probabilityColor(value)}">{value}</div>
    {:else if key == 'actions'}
        <div
            class="btn-group d-flex flex-row justify-content-end"
            role="group"
            aria-label="Approve/Reject Actions"
        >
            <form
                method="post"
                action="?/modifyStatus"
                use:enhance={enhancedForm}
            >
                <button
                    type="submit"
                    class="btn btn-outline-success btn-icon"
                    aria-label="Approve"
                    title="Approve"
                    on:click={() => {
                        status = 'Approved';
                    }}
                >
                    <i class="bx bx-check-circle"></i>
                </button>
            </form>
            <form
                method="post"
                action="?/modifyStatus"
                use:enhance={enhancedForm}
            >
                <button
                    type="submit"
                    class="btn btn-outline-danger btn-icon"
                    aria-label="Decline"
                    title="Decline"
                    on:click={() => {
                        status = 'Declined';
                    }}
                >
                    <i class="bx bx-trash"></i>
                </button>
            </form>
            <form
                method="post"
                action="?/modifyStatus"
                use:enhance={enhancedForm}
            >
                <button
                    type="submit"
                    class="btn btn-outline-warning btn-icon"
                    aria-label="Reset"
                    title="Reset"
                    on:click={() => {
                        status = 'Requested';
                    }}
                >
                    <i class="bx bx-reset"></i>
                </button>
            </form>
            <form
                method="post"
                action="?/modifyStatus"
                use:enhance={enhancedForm}
            >
                <button
                    type="submit"
                    class="btn btn-outline-primary btn-icon"
                    aria-label="Executed"
                    title="Executed"
                    on:click={() => {
                        status = 'Executed';
                    }}
                >
                    <i class="bx bx-rocket"></i>
                </button>
            </form>
        </div>
    {:else}
        {value}
    {/if}
</div>
