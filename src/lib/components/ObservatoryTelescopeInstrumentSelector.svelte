<script lang="ts">
    import type { Telescope } from '$lib/types/across/Telescope';
    import type { TelescopeInstrument } from '$lib/types/across/TelescopeInstrument';
    import type { TelescopeObservatory } from '$lib/types/across/TelescopeObservatory';
    import MultiSelect, { type Option } from './MultiSelect.svelte';

    export let observatories: TelescopeObservatory[] = [];
    export let telescopes: Telescope[] = [];
    export let instruments: TelescopeInstrument[] = [];

    export let selectedObservatories: TelescopeObservatory[] = [];
    export let selectedTelescopes: Telescope[] = [];
    export let selectedInstruments: TelescopeInstrument[] = [];

    function mapToOption<T extends { id: string; name: string; short_name: string }>(item: T): Option<T> {
        return {
            value: item,
            displayName: item.name,
            key: item.id,
            searchableText: `${item.name} ${item.short_name}`,
        };
    }

    function updateSelections(obsIds: Set<string>, telIds: Set<string>, instIds: Set<string>) {
        selectedObservatories = observatories.filter((obs) => obsIds.has(obs.id));
        selectedTelescopes = telescopes.filter((tel) => telIds.has(tel.id));
        selectedInstruments = instruments.filter((inst) => instIds.has(inst.id));
    }

    function buildSelectedSets() {
        const obsSet = new Set(selectedObservatories.map((o) => o.id));
        const telSet = new Set(selectedTelescopes.map((t) => t.id));
        const instSet = new Set(selectedInstruments.map((i) => i.id));

        return { obsSet, telSet, instSet };
    }

    function toggleObservatory(observatory: TelescopeObservatory) {
        const { obsSet, telSet, instSet } = buildSelectedSets();

        const obsId = observatory.id;
        const isSelected = obsSet.has(obsId);

        if (isSelected) {
            obsSet.delete(obsId);
            // cascade unselect all telescopes and instruments
            telescopes
                .filter((t) => t.observatory.id === obsId)
                .forEach((t) => {
                    telSet.delete(t.id);
                    t.instruments.forEach((inst) => instSet.delete(inst.id));
                });
        } else {
            obsSet.add(obsId);
            // cascade select all telescopes and instruments
            telescopes
                .filter((t) => t.observatory.id === obsId)
                .forEach((t) => {
                    telSet.add(t.id);
                    t.instruments.forEach((inst) => instSet.add(inst.id));
                });
        }

        updateSelections(obsSet, telSet, instSet);
    }

    function toggleTelescope(telescope: Telescope) {
        const { obsSet, telSet, instSet } = buildSelectedSets();

        const telId = telescope.id;
        const isSelected = telSet.has(telId);

        if (isSelected) {
            telSet.delete(telId);
            // cascade unselect all instruments
            telescope.instruments.forEach((inst) => instSet.delete(inst.id));

            // check if we need to unselect the observatory
            const obsId = telescope.observatory.id;
            const hasSelectedTelescopes = telescopes.some((tel) => tel.observatory.id === obsId && telSet.has(tel.id));

            if (!hasSelectedTelescopes) {
                obsSet.delete(obsId);
            }
        } else {
            telSet.add(telId);
            // cascade select all instruments
            telescope.instruments.forEach((inst) => instSet.add(inst.id));

            // select the observatory if it's not already selected
            if (!obsSet.has(telescope.observatory.id)) {
                obsSet.add(telescope.observatory.id);
            }
        }

        updateSelections(obsSet, telSet, instSet);
    }

    function toggleInstrument(instrument: TelescopeInstrument) {
        const { obsSet, telSet, instSet } = buildSelectedSets();

        const instId = instrument.id;
        const isSelected = instSet.has(instId);

        if (isSelected) {
            instSet.delete(instId);

            // find the telescope this instrument belongs to
            const telescope = telescopes.find((tel) => tel.instruments.some((inst) => inst.id === instId));
            if (telescope) {
                // check if we need to unselect the telescope
                const hasSelectedInstruments = telescope.instruments.some((inst) => instSet.has(inst.id));
                if (!hasSelectedInstruments) {
                    telSet.delete(telescope.id);

                    // check if we need to unselect the observatory
                    const obsId = telescope.observatory.id;
                    const hasSelectedTelescopes = telescopes.some((tel) => tel.observatory.id === obsId && telSet.has(tel.id));
                    if (!hasSelectedTelescopes) {
                        obsSet.delete(obsId);
                    }
                }
            }
        } else {
            instSet.add(instId);

            // find and select the parent telescope and observatory
            const telescope = telescopes.find((tel) => tel.instruments.some((inst) => inst.id === instId));
            if (telescope) {
                if (!telSet.has(telescope.id)) {
                    telSet.add(telescope.id);
                }
                if (!obsSet.has(telescope.observatory.id)) {
                    obsSet.add(telescope.observatory.id);
                }
            }
        }

        updateSelections(obsSet, telSet, instSet);
    }
</script>

<div class="grid grid-cols-1 md:grid-cols-3 gap-4 h-full auto-rows-fr">
    <MultiSelect
        label="Observatory Select"
        placeholder="Search observatories..."
        options={observatories.map(mapToOption)}
        selected={selectedObservatories.map(mapToOption)}
        onToggle={toggleObservatory}
        title="Search by full name or short name"
    />

    <MultiSelect
        label="Telescope Select"
        placeholder="Search telescopes..."
        options={telescopes.map(mapToOption)}
        selected={selectedTelescopes.map(mapToOption)}
        onToggle={toggleTelescope}
        title="Search by full name or short name"
    />

    <MultiSelect
        label="Instrument Select"
        placeholder="Search instruments..."
        options={instruments.map(mapToOption)}
        selected={selectedInstruments.map(mapToOption)}
        onToggle={toggleInstrument}
        title="Search by full name or short name"
    />
</div>
