<script lang="ts">
    import type { Telescope } from '$lib/types/across/Telescope';
    import { createEventDispatcher } from 'svelte';

    export let observatories: { id: string; name: string; short_name: string }[] = [];
    export let telescopes: Telescope[] = [];
    export let instruments: { id: string; name: string; short_name: string }[] = [];

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
            // Uncheck observatory
            selectedObservatories = selectedObservatories.filter((id) => id !== observatoryId);

            // Uncheck all telescopes belonging to this observatory
            const telescopesToRemove = telescopes.filter((tel) => tel.observatory.id === observatoryId).map((tel) => tel.id);
            selectedTelescopes = selectedTelescopes.filter((id) => !telescopesToRemove.includes(id));

            // Uncheck all instruments belonging to those telescopes
            const instrumentsToRemove = telescopes
                .filter((tel) => tel.observatory.id === observatoryId)
                .flatMap((tel) => tel.instruments.map((inst) => inst.id));
            selectedInstruments = selectedInstruments.filter((id) => !instrumentsToRemove.includes(id));
        } else {
            // Check observatory
            selectedObservatories = [...selectedObservatories, observatoryId];

            // Check all telescopes belonging to this observatory
            const telescopesToAdd = telescopes
                .filter((tel) => tel.observatory.id === observatoryId)
                .map((tel) => tel.id)
                .filter((id) => !selectedTelescopes.includes(id));
            selectedTelescopes = [...selectedTelescopes, ...telescopesToAdd];

            // Check all instruments belonging to those telescopes
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
            // Uncheck telescope
            selectedTelescopes = selectedTelescopes.filter((id) => id !== telescopeId);

            // Uncheck all instruments belonging to this telescope
            const telescope = telescopes.find((tel) => tel.id === telescopeId);
            if (telescope) {
                const instrumentsToRemove = telescope.instruments.map((inst) => inst.id);
                selectedInstruments = selectedInstruments.filter((id) => !instrumentsToRemove.includes(id));
            }
        } else {
            // Check telescope
            selectedTelescopes = [...selectedTelescopes, telescopeId];

            // Check all instruments belonging to this telescope
            const telescope = telescopes.find((tel) => tel.id === telescopeId);
            if (telescope) {
                const instrumentsToAdd = telescope.instruments.map((inst) => inst.id).filter((id) => !selectedInstruments.includes(id));
                selectedInstruments = [...selectedInstruments, ...instrumentsToAdd];

                // Check the observatory if not already checked
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
            // Uncheck instrument
            selectedInstruments = selectedInstruments.filter((id) => id !== instrumentId);
        } else {
            // Check instrument
            selectedInstruments = [...selectedInstruments, instrumentId];

            // Find which telescope has this instrument
            const telescope = telescopes.find((tel) => tel.instruments.some((inst) => inst.id === instrumentId));

            if (telescope) {
                // Check the telescope if not already checked
                if (!selectedTelescopes.includes(telescope.id)) {
                    selectedTelescopes = [...selectedTelescopes, telescope.id];
                }

                // Check the observatory if not already checked
                if (!selectedObservatories.includes(telescope.observatory.id)) {
                    selectedObservatories = [...selectedObservatories, telescope.observatory.id];
                }
            }
        }
        dispatchChange();
    }
</script>

<div class="columns-container">
    <div class="column">
        <label class="label text-lg" for="observatory-select-input">
            <span class="label-text">Observatory Select</span>
        </label>
        <div class="multi-select">
            <input
                id="observatory-select-input"
                type="text"
                placeholder="Search observatories..."
                bind:value={observatorySearch}
                class="search-input"
                title="Search by full name or short name"
            />
            <div class="checkbox-list">
                {#each filteredObservatories as observatory}
                    <label class="checkbox-item">
                        <input
                            type="checkbox"
                            value={observatory.id}
                            checked={selectedObservatories.includes(observatory.id)}
                            on:change={() => toggleObservatory(observatory.id)}
                        />
                        {observatory.name}
                    </label>
                {/each}
            </div>
        </div>
    </div>

    <div class="column">
        <label class="label text-lg" for="telescope-select-input">
            <span class="label-text">Telescope Select</span>
        </label>
        <div class="multi-select">
            <input
                id="telescope-select-input"
                type="text"
                placeholder="Search telescopes..."
                bind:value={telescopeSearch}
                class="search-input"
                title="Search by full name or short name"
            />
            <div class="checkbox-list">
                {#each filteredTelescopes as telescope}
                    <label class="checkbox-item">
                        <input
                            type="checkbox"
                            value={telescope.id}
                            checked={selectedTelescopes.includes(telescope.id)}
                            on:change={() => toggleTelescope(telescope.id)}
                        />
                        {telescope.name}
                    </label>
                {/each}
            </div>
        </div>
    </div>

    <div class="column">
        <label class="label text-lg" for="instrument-select-input">
            <span class="label-text">Instrument Select</span>
        </label>
        <div class="multi-select">
            <input
                id="instrument-select-input"
                type="text"
                placeholder="Search instruments..."
                bind:value={instrumentSearch}
                class="search-input"
                title="Search by full name or short name"
            />
            <div class="checkbox-list">
                {#each filteredInstruments as instrument}
                    <label class="checkbox-item">
                        <input
                            type="checkbox"
                            value={instrument.id}
                            checked={selectedInstruments.includes(instrument.id)}
                            on:change={() => toggleInstrument(instrument.id)}
                        />
                        {instrument.name}
                    </label>
                {/each}
            </div>
        </div>
    </div>
</div>

<style>
    .columns-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
    }

    .column {
        min-width: 0;
    }

    .multi-select {
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 8px;
        background: white;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .search-input {
        width: 100%;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
        margin-bottom: 8px;
        box-sizing: border-box;
    }

    .checkbox-list {
        max-height: 240px;
        overflow-y: auto;
        border: 1px solid #eee;
        border-radius: 4px;
        padding: 8px;
        flex: 1;
    }

    .checkbox-item {
        display: flex;
        align-items: center;
        padding: 8px 6px;
        cursor: pointer;
        user-select: none;
        border-radius: 4px;
        transition: background-color 0.15s ease;
    }

    .checkbox-item:hover {
        background-color: #f0f4ff;
    }

    .checkbox-item input[type='checkbox'] {
        appearance: none;
        -webkit-appearance: none;
        width: 18px;
        height: 18px;
        border: 2px solid #d1d5db;
        border-radius: 4px;
        margin-right: 10px;
        cursor: pointer;
        position: relative;
        transition: all 0.2s ease;
        flex-shrink: 0;
    }

    .checkbox-item input[type='checkbox']:hover {
        border-color: #3b82f6;
    }

    .checkbox-item input[type='checkbox']:checked {
        background-color: #3b82f6;
        border-color: #3b82f6;
    }

    .checkbox-item input[type='checkbox']:checked::after {
        content: '';
        position: absolute;
        left: 5px;
        top: 2px;
        width: 4px;
        height: 8px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
    }

    .checkbox-item input[type='checkbox']:focus {
        outline: 2px solid #3b82f6;
        outline-offset: 2px;
    }
</style>
