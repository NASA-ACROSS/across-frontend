<script lang="ts">
    import type { Telescope } from '$lib/types/across/Telescope';
    import type { TelescopeInstrument } from '$lib/types/across/TelescopeInstrument';
    import type { TelescopeObservatory } from '$lib/types/across/TelescopeObservatory';
    import { createEventDispatcher } from 'svelte';

    export let observatories: TelescopeObservatory[] = [];
    export let telescopes: Telescope[] = [];
    export let instruments: TelescopeInstrument[] = [];

    export let selectedObservatories: string[] = [];
    export let selectedTelescopes: string[] = [];
    export let selectedInstruments: string[] = [];

    let observatorySearch = '';
    let telescopeSearch = '';
    let instrumentSearch = '';

    const dispatch = createEventDispatcher<{
        selectionChange: {
            observatoryIds: string[];
            telescopeIds: string[];
            instrumentIds: string[];
        };
    }>();

    $: filteredObservatories = observatories.filter(
        (obs) => obs.name.toLowerCase().includes(observatorySearch.toLowerCase()) || obs.short_name.toLowerCase().includes(observatorySearch.toLowerCase())
    );
    $: filteredTelescopes = telescopes.filter(
        (tel) => tel.name.toLowerCase().includes(telescopeSearch.toLowerCase()) || tel.short_name.toLowerCase().includes(telescopeSearch.toLowerCase())
    );
    $: filteredInstruments = instruments.filter(
        (inst) => inst.name.toLowerCase().includes(instrumentSearch.toLowerCase()) || inst.short_name.toLowerCase().includes(instrumentSearch.toLowerCase())
    );

    function dispatchChange() {
        dispatch('selectionChange', {
            observatoryIds: selectedObservatories,
            telescopeIds: selectedTelescopes,
            instrumentIds: selectedInstruments,
        });
    }

    function toggleObservatory(observatoryId: string) {
        const isCurrentlySelected = selectedObservatories.includes(observatoryId);

        if (isCurrentlySelected) {
            selectedObservatories = selectedObservatories.filter((id) => id !== observatoryId);
            const telescopesToRemove = telescopes.filter((tel) => tel.observatory.id === observatoryId).map((tel) => tel.id);
            selectedTelescopes = selectedTelescopes.filter((id) => !telescopesToRemove.includes(id));
            const instrumentsToRemove = telescopes
                .filter((tel) => tel.observatory.id === observatoryId)
                .flatMap((tel) => tel.instruments.map((inst) => inst.id));
            selectedInstruments = selectedInstruments.filter((id) => !instrumentsToRemove.includes(id));
        } else {
            selectedObservatories = [...selectedObservatories, observatoryId];
            const telescopesToAdd = telescopes
                .filter((tel) => tel.observatory.id === observatoryId)
                .map((tel) => tel.id)
                .filter((id) => !selectedTelescopes.includes(id));
            selectedTelescopes = [...selectedTelescopes, ...telescopesToAdd];
            const instrumentsToAdd = telescopes
                .filter((tel) => tel.observatory.id === observatoryId)
                .flatMap((tel) => tel.instruments.map((inst) => inst.id))
                .filter((id) => !selectedInstruments.includes(id));
            selectedInstruments = [...selectedInstruments, ...instrumentsToAdd];
        }
        dispatchChange();
    }

    function toggleTelescope(telescopeId: string) {
        const isCurrentlySelected = selectedTelescopes.includes(telescopeId);

        if (isCurrentlySelected) {
            selectedTelescopes = selectedTelescopes.filter((id) => id !== telescopeId);
            const telescope = telescopes.find((tel) => tel.id === telescopeId);
            if (telescope) {
                const instrumentsToRemove = telescope.instruments.map((inst) => inst.id);
                selectedInstruments = selectedInstruments.filter((id) => !instrumentsToRemove.includes(id));
            }
        } else {
            selectedTelescopes = [...selectedTelescopes, telescopeId];
            const telescope = telescopes.find((tel) => tel.id === telescopeId);
            if (telescope) {
                const instrumentsToAdd = telescope.instruments.map((inst) => inst.id).filter((id) => !selectedInstruments.includes(id));
                selectedInstruments = [...selectedInstruments, ...instrumentsToAdd];
                if (!selectedObservatories.includes(telescope.observatory.id)) {
                    selectedObservatories = [...selectedObservatories, telescope.observatory.id];
                }
            }
        }
        dispatchChange();
    }

    function toggleInstrument(instrumentId: string) {
        const isCurrentlySelected = selectedInstruments.includes(instrumentId);

        if (isCurrentlySelected) {
            selectedInstruments = selectedInstruments.filter((id) => id !== instrumentId);
        } else {
            selectedInstruments = [...selectedInstruments, instrumentId];
            const telescope = telescopes.find((tel) => tel.instruments.some((inst) => inst.id === instrumentId));
            if (telescope) {
                if (!selectedTelescopes.includes(telescope.id)) {
                    selectedTelescopes = [...selectedTelescopes, telescope.id];
                }
                if (!selectedObservatories.includes(telescope.observatory.id)) {
                    selectedObservatories = [...selectedObservatories, telescope.observatory.id];
                }
            }
        }
        dispatchChange();
    }
</script>

<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    <label class="flex items-center px-1.5 py-2 cursor-pointer select-none transition-colors hover:bg-blue-50">
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
                    <label class="flex items-center px-1.5 py-2 cursor-pointer select-none transition-colors hover:bg-blue-50">
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

    <div class="min-w-0">
        <label class="label text-lg" for="instrument-select-input">
            <span class="label-text">Instrument Select</span>
        </label>
        <div class="border border-base-300 p-2 bg-base-100 h-full flex flex-col">
            <input
                id="instrument-select-input"
                type="text"
                placeholder="Search instruments..."
                bind:value={instrumentSearch}
                class="input input-bordered input-sm w-full mb-2"
                title="Search by full name or short name"
            />
            <div class="max-h-60 overflow-y-auto border border-base-200 p-2 flex-1">
                {#each filteredInstruments as instrument}
                    <label class="flex items-center px-1.5 py-2 cursor-pointer select-none transition-colors hover:bg-blue-50">
                        <input
                            type="checkbox"
                            value={instrument.id}
                            checked={selectedInstruments.includes(instrument.id)}
                            on:change={() => toggleInstrument(instrument.id)}
                            class="checkbox checkbox-primary checkbox-sm mr-2.5 shrink-0"
                        />
                        <span class="text-sm">{instrument.name}</span>
                    </label>
                {/each}
            </div>
        </div>
    </div>
</div>
