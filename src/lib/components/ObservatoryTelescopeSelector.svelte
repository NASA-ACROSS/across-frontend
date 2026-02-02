<script lang="ts">
    import type { Telescope } from '$lib/types/across/Telescope';
    import type { TelescopeObservatory } from '$lib/types/across/TelescopeObservatory';
    import { createEventDispatcher } from 'svelte';

    export let observatories: TelescopeObservatory[] = [];
    export let telescopes: Telescope[] = [];

    export let selectedObservatories: string[] = [];
    export let selectedTelescopes: string[] = [];

    let observatorySearch = '';
    let telescopeSearch = '';

    const dispatch = createEventDispatcher<{
        selectionChange: {
            observatoryIds: string[];
            telescopeIds: string[];
        };
    }>();

    $: filteredObservatories = observatories.filter(
        (obs) => obs.name.toLowerCase().includes(observatorySearch.toLowerCase()) || obs.short_name.toLowerCase().includes(observatorySearch.toLowerCase())
    );
    $: filteredTelescopes = telescopes.filter(
        (tel) => tel.name.toLowerCase().includes(telescopeSearch.toLowerCase()) || tel.short_name.toLowerCase().includes(telescopeSearch.toLowerCase())
    );

    function dispatchChange() {
        dispatch('selectionChange', {
            observatoryIds: selectedObservatories,
            telescopeIds: selectedTelescopes,
        });
    }

    function toggleObservatory(observatoryId: string) {
        const isCurrentlySelected = selectedObservatories.includes(observatoryId);

        if (isCurrentlySelected) {
            selectedObservatories = selectedObservatories.filter((id) => id !== observatoryId);
            const telescopesToRemove = telescopes.filter((tel) => tel.observatory.id === observatoryId).map((tel) => tel.id);
            selectedTelescopes = selectedTelescopes.filter((id) => !telescopesToRemove.includes(id));
        } else {
            selectedObservatories = [...selectedObservatories, observatoryId];
            const telescopesToAdd = telescopes
                .filter((tel) => tel.observatory.id === observatoryId)
                .map((tel) => tel.id)
                .filter((id) => !selectedTelescopes.includes(id));
            selectedTelescopes = [...selectedTelescopes, ...telescopesToAdd];
        }
        dispatchChange();
    }

    function toggleTelescope(telescopeId: string) {
        const isCurrentlySelected = selectedTelescopes.includes(telescopeId);

        if (isCurrentlySelected) {
            selectedTelescopes = selectedTelescopes.filter((id) => id !== telescopeId);
        } else {
            selectedTelescopes = [...selectedTelescopes, telescopeId];
            const telescope = telescopes.find((tel) => tel.id === telescopeId);
            if (telescope) {
                if (!selectedObservatories.includes(telescope.observatory.id)) {
                    selectedObservatories = [...selectedObservatories, telescope.observatory.id];
                }
            }
        }
        dispatchChange();
    }
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="min-w-0">
        <label class="label text-lg" for="observatory-select-input">
            <span class="label-text">Observatory Select</span>
        </label>
        <div class="border border-base-300 p-2 bg-base-100 h-full flex flex-col">
            <input
                id="observatory-select-input"
                type="text"
                placeholder="Search observatories..."
                bind:value={observatorySearch}
                class="input input-bordered input-sm w-full mb-2"
                title="Search by full name or short name"
            />
            <div class="max-h-60 overflow-y-auto border border-base-200 p-2 flex-1">
                {#each filteredObservatories as observatory}
                    <label class="flex items-center px-1.5 py-2 cursor-pointer select-none transition-colors hover:bg-nasa-blue-lite">
                        <input
                            type="checkbox"
                            value={observatory.id}
                            checked={selectedObservatories.includes(observatory.id)}
                            on:change={() => toggleObservatory(observatory.id)}
                            class="checkbox checkbox-primary checkbox-sm mr-2.5 shrink-0"
                        />
                        <span class="text-sm">{observatory.name}</span>
                    </label>
                {/each}
            </div>
        </div>
    </div>

    <div class="min-w-0">
        <label class="label text-lg" for="telescope-select-input">
            <span class="label-text">Telescope Select</span>
        </label>
        <div class="border border-base-300 p-2 bg-base-100 h-full flex flex-col">
            <input
                id="telescope-select-input"
                type="text"
                placeholder="Search telescopes..."
                bind:value={telescopeSearch}
                class="input input-bordered input-sm w-full mb-2"
                title="Search by full name or short name"
            />
            <div class="max-h-60 overflow-y-auto border border-base-200 p-2 flex-1">
                {#each filteredTelescopes as telescope}
                    <label class="flex items-center px-1.5 py-2 cursor-pointer select-none transition-colors hover:bg-nasa-blue-lite">
                        <input
                            type="checkbox"
                            value={telescope.id}
                            checked={selectedTelescopes.includes(telescope.id)}
                            on:change={() => toggleTelescope(telescope.id)}
                            class="checkbox checkbox-primary checkbox-sm mr-2.5 shrink-0"
                        />
                        <span class="text-sm">{telescope.name}</span>
                    </label>
                {/each}
            </div>
        </div>
    </div>
</div>
