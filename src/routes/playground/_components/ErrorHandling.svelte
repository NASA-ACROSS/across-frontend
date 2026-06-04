<script lang="ts">
    import { enhance, applyAction } from '$app/forms';
    import type { SubmitFunction } from '@sveltejs/kit';
    import type { ActionData } from '../$types';
    import Spinner from '$lib/components/Spinner.svelte';

    export let form: ActionData;

    let selectedStatus: string;
    let selectedFailureType: string;
    let isSubmitting = false;

    const handleSubmit: SubmitFunction = async () => {
        isSubmitting = true;
        await new Promise((resolve) => setTimeout(resolve, 500));

        return async ({ result }) => {
            applyAction(result);
            isSubmitting = false;
        };
    };
</script>

<div class="flex flex-col gap-2">
    <form method="post" use:enhance={handleSubmit} action="playground?/callApi">
        <div class="flex flex-col gap-2">
            <fieldset class="fieldset">
                <legend class="fieldset-legend">Error Status</legend>
                <select class="select" bind:value={selectedStatus}>
                    <option disabled selected value="">Pick an Error status</option>
                    {#each [401, 403, 404, 500] as status}
                        <option>{status}</option>
                    {/each}
                </select>
                <span class="label">Optional</span>
            </fieldset>
            <fieldset class="fieldset">
                <legend class="fieldset-legend">Failure Type</legend>
                <select class="select" bind:value={selectedFailureType}>
                    <option disabled selected value="">Pick a Failure type</option>
                    <option value="request_failure">Request Failure</option>
                    <option value="response_failure">Response Failure</option>
                    <option value="unknown_error">Unknown Error</option>
                </select>
                <span class="label">Optional</span>
            </fieldset>
            <button type="submit" class="btn btn-info btn-md px-4 py-2" disabled={isSubmitting}>
                {#if isSubmitting}
                    <Spinner />
                {:else}
                    Call API
                {/if}
            </button>

            <input type="hidden" name="status" value={selectedStatus} />
            <input type="hidden" name="failure_type" value={selectedFailureType} />
        </div>
    </form>

    {#if form}
        {#if form.type === 'success'}
            <div class="flex flex-col p-2 bg-success text-success-content">
                <h2 class="p-2 text-xl font-bold">API Success Response</h2>
                <div class="bg-nasa-green-tint p-2">
                    <p class="text-lg"><span class="font-bold">Data:</span> {JSON.stringify(form.data, null, 2)}</p>
                </div>
            </div>
        {:else if form.type === 'error'}
            <div class="flex flex-col p-2 bg-error text-error-content">
                <h2 class="p-2 text-xl font-bold">API Error Response</h2>
                <div class="bg-nasa-red-tint p-2">
                    <p class="text-lg">{form.message}</p>
                    <div class="divider" />
                    <div class="flex flex-row justify-between gap-1">
                        <code class="text-sm bg">Error ID: {form.errorId}</code>
                        <code class="text-sm bg">Error Code: {form.code}</code>
                    </div>
                </div>
            </div>
        {/if}
    {/if}
</div>
