<script lang="ts">
    import { enhance } from '$app/forms';
    import type { NameResolver } from '$lib/types/across/NameResolver';

    /**
     * Generic Object Name Resolver Component
     * Can be used in any form where RA/Dec coordinates need to be populated
     *
     * Usage:
     * <ObjectNameResolver bind:ra bind:dec />
     *
     * Props:
     * - title: Optional custom title (default: "Resolve Object Name to Coordinates")
     * - ra: Two-way bound RA value
     * - dec: Two-way bound DEC value
     */

    export let title: string = 'Resolve Object Name to Coordinates';
    export let ra: string | number = '';
    export let dec: string | number = '';
    export let objectName: string = '';

    // Internal state
    let resolvedData: NameResolver | null = null;
    let error: Error | null = null;
    let isResolving = false;
    let dialog: HTMLDialogElement;

    function resetResolver() {
        isResolving = false;
        resolvedData = null;
        error = null;

        if (dialog?.open) {
            dialog.close();
        }
    }

    function onResolveSubmit() {
        isResolving = true;
        error = null;

        return async ({ result }: { result: { type: string; data?: unknown } }) => {
            isResolving = false;

            if (result.type === 'failure') {
                const failureData = result.data as { message?: string };
                error = new Error(failureData?.message || 'Failed to resolve object coordinates');
            } else if (result.type === 'success') {
                resolvedData = (result.data as { resolvedObject: NameResolver }).resolvedObject;
            }

            dialog?.showModal();
        };
    }

    function handleApply() {
        if (resolvedData) {
            ra = resolvedData.ra;
            dec = resolvedData.dec;
            resetResolver();
        }
    }
</script>

<!-- Object Name Resolver -->
<div class="mb-6 p-4 bg-base-100 border border-base-300">
    <h4 class="text-md font-semibold mb-3">{title}</h4>
    <form method="POST" action="?/resolveObject" use:enhance={onResolveSubmit}>
        <div class="flex gap-2 items-end">
            <div class="form-control flex-1">
                <label class="label text-lg" for="object-name-resolver-input">
                    <span class="label-text">Object Name</span>
                </label>
                <input
                    id="object-name-resolver-input"
                    name="objectName"
                    type="text"
                    bind:value={objectName}
                    placeholder="e.g. Crab, M31, NGC 2237"
                    class="input input-bordered text-lg w-full"
                />
            </div>
            <button type="submit" class="btn btn-primary" disabled={isResolving}>
                {#if isResolving}
                    <span class="loading loading-spinner loading-sm"></span>
                    Resolving Coordinates...
                {:else}
                    Resolve
                {/if}
            </button>
        </div>
    </form>
</div>

<!-- Resolver Confirmation Modal -->
<dialog class="modal" bind:this={dialog} on:close={() => resetResolver()}>
    <div class="modal-box">
        {#if resolvedData}
            <div role="alert" class="alert alert-success mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <div>
                    <h3 class="font-bold">Coordinates Resolved!</h3>
                    <div class="text-sm">RA: {resolvedData.ra.toFixed(4)}° | DEC: {resolvedData.dec.toFixed(4)}°</div>
                    {#if resolvedData.resolver}
                        <div class="text-xs opacity-75 mt-1">Resolved via: {resolvedData.resolver}</div>
                    {/if}
                </div>
            </div>
            <div class="modal-action flex justify-center gap-2">
                <button type="button" class="btn btn-sm btn-outline" on:click={handleApply}> Yes, use these coordinates </button>
                <button type="button" class="btn btn-sm btn-error" on:click={resetResolver}> No, discard </button>
            </div>
        {:else if error}
            <div role="alert" class="alert alert-error mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <div>
                    <h3 class="font-bold">Resolution Failed</h3>
                    <div class="text-sm">{error.message}</div>
                </div>
            </div>
            <div class="modal-action flex justify-center gap-2">
                <button type="button" class="btn btn-sm btn-outline" on:click={() => resetResolver()}> Close </button>
            </div>
        {/if}
    </div>
    <form method="dialog" class="modal-backdrop">
        <button>close</button>
    </form>
</dialog>
