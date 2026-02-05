<script lang="ts">
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

    // Internal state
    let objectNameInput = '';
    let resolvedData: NameResolver | null = null;
    let resolverError: string = '';
    let isResolving = false;
    let dialog: HTMLDialogElement;

    function resetResolver() {
        isResolving = false;
        objectNameInput = '';
        resolvedData = null;
        resolverError = '';

        if (dialog?.open) {
            dialog.close();
        }
    }

    async function handleResolve() {
        const objectName = objectNameInput.trim();
        if (!objectName) {
            resolverError = '';
            resetResolver();
            return;
        }

        isResolving = true;
        resolverError = '';

        try {
            const formData = new FormData();
            formData.append('objectName', objectName);
            const response = await fetch('?/resolveObject', { method: 'POST', body: formData });
            const result = await response.json();

            // Handle errors from SvelteKit fail() responses
            if (result?.type === 'failure' || !response.ok) {
                let errorMsg = 'Failed to resolve object coordinates';

                // Extract error from fail() response data
                if (result?.data) {
                    let errorData = result.data;
                    if (typeof errorData === 'string') {
                        errorData = JSON.parse(errorData);
                    }
                    if (Array.isArray(errorData) && errorData.length > 1) {
                        errorMsg = errorData[1];
                    } else if (errorData?.error) {
                        errorMsg = errorData.error;
                    }
                }

                resolverError = errorMsg;
                dialog?.showModal();
                return;
            }

            // // Parse if data is still stringified
            let data = result.data;
            if (typeof data === 'string') {
                data = JSON.parse(data);
            }

            // Transform array format to object if needed
            // API returns: [metadata, boolean, mapping, ra, dec, resolver]
            let resolved: NameResolver;
            if (Array.isArray(data) && data.length >= 6) {
                resolved = {
                    ra: data[3],
                    dec: data[4],
                    resolver: data[5] || '',
                };
            } else {
                resolved = data as NameResolver;
            }

            if (resolved && resolved.ra !== undefined && resolved.dec !== undefined) {
                resolvedData = {
                    ra: parseFloat(String(resolved.ra)),
                    dec: parseFloat(String(resolved.dec)),
                    resolver: resolved.resolver,
                };
                dialog?.showModal();
            } else {
                resolverError = 'Failed to resolve object coordinates - no RA/DEC in response';
                dialog?.showModal();
            }
        } catch (error) {
            resolverError = 'Failed to resolve object coordinates. Please try again.';
            dialog?.showModal();
        } finally {
            isResolving = false;
        }
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
    <div class="flex gap-2 items-end">
        <div class="form-control flex-1">
            <label class="label text-lg" for="object-name-resolver-input">
                <span class="label-text">Object Name</span>
            </label>
            <input
                id="object-name-resolver-input"
                type="text"
                bind:value={objectNameInput}
                placeholder="e.g. Crab, M31, NGC 2237"
                class="input input-bordered text-lg w-full"
                on:keydown={(e) => e.key === 'Enter' && handleResolve()}
            />
        </div>
        <button type="button" class="btn btn-primary" on:click={handleResolve} disabled={isResolving}>
            {#if isResolving}
                <span class="loading loading-spinner loading-sm"></span>
                Resolving Coordinates...
            {:else}
                Resolve
            {/if}
        </button>
    </div>
</div>

<!-- Resolver Confirmation Modal -->
<dialog class="modal" class:modal-open={resolverError} bind:this={dialog} on:close={() => resetResolver()}>
    <div class="modal-box">
        {#if resolvedData}
            <div role="alert" class="alert alert-success mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                    <h3 class="font-bold">Coordinates Resolved!</h3>
                    <div class="text-sm">RA: {resolvedData?.ra.toFixed(4)}° | DEC: {resolvedData?.dec.toFixed(4)}°</div>
                    {#if resolvedData?.resolver}
                        <div class="text-xs opacity-75 mt-1">Resolved via: {resolvedData.resolver}</div>
                    {/if}
                </div>
            </div>
            <div class="modal-action flex justify-center gap-2">
                <button type="button" class="btn btn-sm btn-outline" on:click={handleApply}> Yes, use these coordinates </button>
                <button type="button" class="btn btn-sm btn-error" on:click={resetResolver}> No, discard </button>
            </div>
        {:else if resolverError}
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
                    <div class="text-sm">{resolverError}</div>
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
