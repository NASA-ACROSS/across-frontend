<script lang="ts">
    import { createEventDispatcher, tick } from 'svelte';
    import type { NameResolver } from '$lib/types/across/NameResolver';

    /**
     * Generic Object Name Resolver Component
     * Can be used in any form where RA/Dec coordinates need to be populated
     *
     * Usage:
     * <ObjectNameResolver on:apply={(e) => { ra = e.detail.ra; dec = e.detail.dec; }} />
     *
     * Events:
     * - apply: Fired when coordinates are applied with NameResolver data
     *
     * Props:
     * - title: Optional custom title (default: "Resolve Object Name to Coordinates")
     */

    export let title: string = 'Resolve Object Name to Coordinates';

    const dispatch = createEventDispatcher<{
        apply: NameResolver;
    }>();

    // Internal state
    let targetNameInput = '';
    let resolverStatus: 'idle' | 'resolving' | 'resolved' | 'discarded' | 'error' = 'idle';
    let resolvedData: NameResolver | null = null;
    let resolverError: string = '';
    let isResolving = false;
    let dialog: HTMLDialogElement;

    $: if (dialog && (resolverStatus === 'resolved' || resolverStatus === 'error') && !dialog.open) {
        dialog.showModal();
    }

    function resetResolver(status: typeof resolverStatus = 'idle') {
        resolverStatus = status;
        isResolving = false;
        if (dialog && dialog.open) {
            dialog.close();
        }
    }

    function extractCoordinates(apiData: any): NameResolver | null {
        // Handle array format: [metadata, boolean, mapping, ra, dec, resolver]
        if (Array.isArray(apiData) && apiData.length >= 6) {
            return { ra: apiData[3], dec: apiData[4], resolver: apiData[5] || '' };
        }

        // Handle object format
        if (apiData && typeof apiData === 'object') {
            const data = apiData.data || apiData;
            return {
                ra: data.ra,
                dec: data.dec,
                resolver: data.resolver || '',
            };
        }

        return null;
    }

    async function handleResolve() {
        if (!targetNameInput.trim()) {
            resolverError = '';
            resetResolver();
            return;
        }

        isResolving = true;
        resolverStatus = 'resolving';
        resolverError = '';

        try {
            const formData = new FormData();
            formData.append('targetName', targetNameInput.trim());
            const response = await fetch('?/resolveTarget', { method: 'POST', body: formData });
            const result = await response.json();

            if (result?.error || !response.ok) {
                resolverError = result?.error || 'Failed to resolve target coordinates';
                resolverStatus = 'error';
                return;
            }

            // Parse string data if needed
            let apiData = result?.data;
            if (typeof apiData === 'string') {
                apiData = JSON.parse(apiData);
            }

            const resolved = extractCoordinates(apiData);

            if (resolved && resolved.ra !== undefined && resolved.dec !== undefined) {
                resolvedData = {
                    ra: parseFloat(String(resolved.ra)),
                    dec: parseFloat(String(resolved.dec)),
                    resolver: resolved.resolver,
                };
                resolverStatus = 'resolved';
            } else {
                resolverError = 'Failed to resolve target coordinates - no RA/DEC in response';
                resolverStatus = 'error';
            }
        } catch (error) {
            console.error('Error resolving target name:', error);
            resolverError = 'Failed to resolve target coordinates. Please try again.';
            resolverStatus = 'error';
        } finally {
            isResolving = false;
        }
    }

    async function handleApply() {
        if (resolvedData) {
            const data = resolvedData;

            resetResolver();

            // Wait for DOM to update
            await tick();

            // Clear state
            targetNameInput = '';
            resolvedData = null;
            resolverError = '';

            dispatch('apply', data);
        }
    }

    function handleDiscard() {
        targetNameInput = '';
        resolvedData = null;
        resolverError = '';
        resetResolver('discarded');
        setTimeout(() => resetResolver(), 2000);
    }
</script>

<!-- Object Name Resolver -->
<div class="mb-6 p-4 bg-base-100 border border-base-300">
    <h4 class="text-md font-semibold mb-3">{title}</h4>
    <div class="flex gap-2 items-end">
        <div class="form-control flex-1">
            <label class="label text-lg" for="target-name-resolver-input">
                <span class="label-text">Object Name</span>
            </label>
            <input
                id="target-name-resolver-input"
                type="text"
                bind:value={targetNameInput}
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
<dialog
    class="modal"
    class:modal-open={resolverStatus === 'resolved' || resolverStatus === 'error'}
    bind:this={dialog}
    on:close={() => {
        if (resolverStatus === 'resolved' || resolverStatus === 'error') resetResolver();
    }}
>
    <div class="modal-box">
        {#if resolverStatus === 'resolved'}
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
                <button type="button" class="btn btn-sm btn-error" on:click={handleDiscard}> No, discard </button>
            </div>
        {:else if resolverStatus === 'error'}
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
