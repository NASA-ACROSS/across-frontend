<script lang="ts">
    import { enhance, applyAction } from '$app/forms';
    import type { SubmitFunction } from '@sveltejs/kit';
    import type { ActionData } from '../$types';
    import Spinner from '$lib/components/Spinner.svelte';

    interface Props {
        form: ActionData;
    }

    let { form }: Props = $props();

    // Svelte 5 migration: `$state()` with no argument is `undefined` until assigned,
    // and svelte-check 4 now types that honestly (`export let` used to launder it). The
    // annotation has to admit undefined; use sites guard with `?.`.
    let selectedStatus: string | undefined = $state();
    let isSubmitting = $state(false);

    let resData = $derived(JSON.stringify(form?.data, null, 2));

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
    <form method="post" use:enhance={handleSubmit} action="playground?/mockCallApi">
        <div class="flex flex-col gap-2">
            <fieldset class="fieldset">
                <legend class="fieldset-legend">HTTP Status</legend>
                <select class="select" bind:value={selectedStatus}>
                    <option disabled selected value="200">Pick a status</option>
                    {#each [200, 201, 204, 401, 403, 404, 500] as status}
                        <option>{status}</option>
                    {/each}
                </select>
            </fieldset>
            <div class="flex flex-row gap-2 justify-start items-center">
                <button class="btn btn-info btn-md" disabled={isSubmitting}>
                    {#if isSubmitting}
                        <Spinner />
                    {:else}
                        Call API
                    {/if}
                </button>
                OR
                <button
                    onclick={() => {
                        // manually override the status to handle in the action
                        selectedStatus = 'BOOM';
                    }}
                    class="btn btn-error btn-md"
                    disabled={isSubmitting}
                >
                    {#if isSubmitting}
                        <Spinner />
                    {:else}
                        You want me to explode?
                    {/if}
                </button>
            </div>

            <input type="hidden" name="status" value={selectedStatus} />
        </div>
    </form>

    {#if form}
        {#if form.type === 'success'}
            <div class="flex flex-col p-2 bg-success text-success-content">
                <h2 class="p-2 text-xl font-bold">API Success Response</h2>
                <div class="bg-nasa-green-tint p-2">
                    <p class="text-lg"><span class="font-bold">Data:</span> {resData ?? 'No Content'}</p>
                </div>
            </div>
        {:else if form.type === 'error'}
            <div class="flex flex-col p-2 bg-error text-error-content">
                <h2 class="p-2 text-xl font-bold">API Error Response</h2>
                <div class="bg-nasa-red-tint p-2">
                    <p class="text-lg">{form.message}</p>
                    <div class="divider"></div>
                    <div class="flex flex-row justify-between gap-1">
                        <code class="text-sm bg">Error ID: {form.errorId}</code>
                        <code class="text-sm bg">Error Code: {form.code}</code>
                    </div>
                </div>
            </div>
        {/if}
    {/if}
</div>
