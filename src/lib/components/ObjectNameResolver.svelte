<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    /**
     * Generic Object Name Resolver Component
     * Can be used in any form where RA/Dec coordinates need to be populated
     *
     * Usage:
     * <ObjectNameResolver on:apply={(e) => { ra = e.detail.ra; dec = e.detail.dec; }} />
     *
     * Events:
     * - apply: Fired when coordinates are applied { ra: number, dec: number, resolver: string | null }
     *
     * Props:
     * - title: Optional custom title (default: "Resolve Object Name to Coordinates")
     */

    export let title: string = 'Resolve Object Name to Coordinates';

    const dispatch = createEventDispatcher<{
        apply: { ra: number; dec: number; resolver: string | null };
    }>();

    // Internal state
    let targetNameInput = '';
    let resolverStatus: 'idle' | 'resolving' | 'resolved' | 'discarded' = 'idle';
    let resolvedRa: number | null = null;
    let resolvedDec: number | null = null;
    let resolverUsed: string | null = null;
    let resolverError: string = '';
    let isResolving = false;

    function resetResolver(status: typeof resolverStatus = 'idle') {
        resolverStatus = status;
        isResolving = false;
    }

    function extractCoordinates(apiData: any) {
        // Handle array format: [metadata, boolean, mapping, ra, dec, resolver]
        if (Array.isArray(apiData) && apiData.length >= 6) {
            return { ra: apiData[3], dec: apiData[4], resolver: apiData[5] };
        }

        // Handle object format
        if (apiData && typeof apiData === 'object') {
            const data = apiData.data || apiData;
            return {
                ra: data.ra,
                dec: data.dec,
                resolver: data.resolver || data.service || data.source || data.provider,
            };
        }

        return { ra: undefined, dec: undefined, resolver: undefined };
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
                resetResolver();
                return;
            }

            // Parse string data if needed
            let apiData = result?.data;
            if (typeof apiData === 'string') {
                apiData = JSON.parse(apiData);
            }

            const { ra, dec, resolver } = extractCoordinates(apiData);

            if (ra !== undefined && dec !== undefined) {
                resolvedRa = parseFloat(String(ra));
                resolvedDec = parseFloat(String(dec));
                resolverUsed = resolver || null;
                resolverStatus = 'resolved';
            } else {
                resolverError = 'Failed to resolve target coordinates - no RA/DEC in response';
                resetResolver();
            }
        } catch (error) {
            console.error('Error resolving target name:', error);
            resolverError = 'Failed to resolve target coordinates. Please try again.';
            resetResolver();
        } finally {
            isResolving = false;
        }
    }

    function handleApply() {
        if (resolvedRa !== null && resolvedDec !== null) {
            dispatch('apply', { ra: resolvedRa, dec: resolvedDec, resolver: resolverUsed });
            resolvedRa = null;
            resolvedDec = null;
            resolverUsed = null;
            resetResolver();
        }
    }

    function handleDiscard() {
        resolvedRa = null;
        resolvedDec = null;
        resolverUsed = null;
        resolverError = '';
        resetResolver('discarded');
        setTimeout(() => resetResolver(), 2000);
    }
</script>

<!-- Object Name Resolver -->
<div class="mb-6 p-4 bg-base-100 rounded-lg border border-base-300">
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
    {#if resolverError}
        <div class="alert alert-error mt-3">
            <span>{resolverError}</span>
        </div>
    {/if}
</div>

<!-- Resolver Confirmation Alert -->
{#if resolverStatus === 'resolved'}
    <div class="alert alert-info mb-6 w-fit relative px-4">
        <div class="flex flex-col gap-3">
            <div class="text-center">
                <p class="font-semibold">Coordinates Resolved!</p>
                <p class="text-sm">RA: {resolvedRa?.toFixed(4)}° | DEC: {resolvedDec?.toFixed(4)}°</p>
                {#if resolverUsed}
                    <p class="text-xs opacity-75 mt-1">Resolved via: {resolverUsed}</p>
                {/if}
            </div>
            <div class="flex gap-2 justify-center">
                <button type="button" class="btn btn-sm btn-outline" on:click={handleApply}> Yes, use these coordinates </button>
                <button type="button" class="btn btn-sm btn-failure" on:click={handleDiscard}> No, discard </button>
            </div>
        </div>
        <button
            type="button"
            class="absolute top-2 right-2 text-2xl font-bold leading-none hover:opacity-70"
            title="Close"
            on:click={() => {
                resolverStatus = 'idle';
                resolvedRa = null;
                resolvedDec = null;
            }}
        >
            ✕
        </button>
    </div>
{:else if resolverStatus === 'discarded'}
    <div class="alert alert-warning mb-6">
        <span>Coordinates discarded</span>
    </div>
{/if}
