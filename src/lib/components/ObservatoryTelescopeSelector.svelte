<script lang="ts">
    import type { Observatory } from '$lib/types/across/Observatory';
    import type { Telescope } from '$lib/types/across/Telescope';
    import type { TelescopeObservatory } from '$lib/types/across/TelescopeObservatory';
    import { onMount } from 'svelte';
    import MultiSelect, { type Option } from './MultiSelect.svelte';
    import { page } from '$app/stores';

    export let telescopes: Telescope[] = [];

    export let selectedObservatories: TelescopeObservatory[] = [];
    export let selectedTelescopes: Telescope[] = [];

    $: data = $page.data;

    // Derive observatories from telescope response
    let seenObservatories = new Set<string>();
    let observatories: TelescopeObservatory[] = telescopes.reduce((telescopes, telescope) => {
        const obs = telescope.observatory;
        if (!seenObservatories.has(obs.id)) {
            seenObservatories.add(obs.id);
            telescopes.push(obs);
        }
        return telescopes;
    }, [] as TelescopeObservatory[]);

    $: observatoryOptions = observatories.map(mapToOption);
    $: telescopeOptions = telescopes.map(mapToOption);

    $: selectedObservatoryOptions = selectedObservatories.map(mapToOption);
    $: selectedTelescopeOptions = selectedTelescopes.map(mapToOption);

    function mapToOption<T extends { id: string; name: string; short_name: string }>(item: T): Option<T> {
        return {
            value: item,
            displayName: item.name,
            key: item.id,
            searchableText: `${item.name} ${item.short_name}`,
        };
    }

    function updateSelections(obsIds: Set<string>, telIds: Set<string>) {
        selectedObservatories = observatories.filter((obs) => obsIds.has(obs.id));
        selectedTelescopes = telescopes.filter((tel) => telIds.has(tel.id));
    }

    function buildSelectedSets() {
        const obsSet = new Set(selectedObservatories.map((o) => o.id));
        const telSet = new Set(selectedTelescopes.map((t) => t.id));

        return { obsSet, telSet };
    }

    function toggleObservatory(observatory: TelescopeObservatory) {
        const { obsSet, telSet } = buildSelectedSets();

        const obsId = observatory.id;
        const isSelected = obsSet.has(obsId);

        if (isSelected) {
            obsSet.delete(obsId);
            // cascade unselect all telescopes
            telescopes.filter((t) => t.observatory.id === obsId).forEach((t) => telSet.delete(t.id));
        } else {
            obsSet.add(obsId);
            // cascade select all telescopes
            telescopes.filter((t) => t.observatory.id === obsId).forEach((t) => telSet.add(t.id));
        }

        // Update selected observatories and telescopes
        updateSelections(obsSet, telSet);
    }

    function toggleTelescope(telescope: Telescope) {
        // Build sets for efficient lookup and modification
        const { obsSet, telSet } = buildSelectedSets();

        const telId = telescope.id;
        const isSelected = telSet.has(telId);

        if (isSelected) {
            telSet.delete(telId);

            // check if we need to unselect the observatory if all
            // telescopes from that observatory are now unselected
            const obsId = telescope.observatory.id;
            const hasSelectedTelescopes = telescopes.some((tel) => tel.observatory.id === obsId && telSet.has(tel.id));

            if (!hasSelectedTelescopes) {
                obsSet.delete(obsId);
            }
        } else {
            telSet.add(telId);

            // select the observatory if it's not already selected
            const isObsSelected = !obsSet.has(telescope.observatory.id);
            if (isObsSelected) {
                obsSet.add(telescope.observatory.id);
            }
        }

        // Update selected observatories and telescopes
        updateSelections(obsSet, telSet);
    }

    onMount(() => {
        // Populate observatory/telescope/instrument selection
        const telescopeIds = (data?.queryParams?.telescope_ids as string[]) || ([] as string[]);
        if (telescopeIds.length > 0) {
            selectedTelescopes = telescopes.filter((tel) => telescopeIds.includes(tel.id));

            // Auto-select parent observatories
            const selectedObservatoryIds = new Set<string>();
            selectedTelescopes.forEach((tel) => {
                selectedObservatoryIds.add(tel.observatory.id);
            });
            selectedObservatories = observatories.filter((obs) => selectedObservatoryIds.has(obs.id));
        }
    });
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 h-full auto-rows-fr">
    <MultiSelect
        label="Observatory Select"
        placeholder="Search observatories..."
        options={observatoryOptions}
        selected={selectedObservatoryOptions}
        onToggle={toggleObservatory}
        title="Search by full name or short name"
    />

    <MultiSelect
        label="Telescope Select"
        placeholder="Search telescopes..."
        options={telescopeOptions}
        selected={selectedTelescopeOptions}
        onToggle={toggleTelescope}
        title="Search by full name or short name"
    />
</div>
