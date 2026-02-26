<script lang="ts">
    import Page from '$lib/components/Page.svelte';
    import Section from '$lib/components/Section.svelte';
    import CoordinateSearch from '$lib/components/CoordinateSearch.svelte';
    import DateRangeInputs from '$lib/components/DateRangeInputs.svelte';
    import ObservatoryTelescopeInstrumentSelector from '$lib/components/ObservatoryTelescopeInstrumentSelector.svelte';
    import { beforeNavigate, afterNavigate } from '$app/navigation';
    import { goto } from '$app/navigation';
    import { page } from '$app/state';
    import { onMount } from 'svelte';
    import type { TelescopeObservatory } from '$lib/types/across/TelescopeObservatory';
    import type { Telescope } from '$lib/types/across/Telescope';
    import type { TelescopeInstrument } from '$lib/types/across/TelescopeInstrument';
    import type { VisibilityWindow } from '$lib/types/across/VisibilityWindow';
    import type { JointVisibilityPageData } from './+page.server';

    beforeNavigate(() => {
        isLoading = true;
    });

    afterNavigate(() => {
        isLoading = false;
    });

    export let data: JointVisibilityPageData;

    $: error = data.error;
    $: telescopes = data.telescopes;
    $: joint_visibility_windows = data.joint_visibility_windows;
    $: visibility_window_instrument_ids = data.visibility_window_instrument_ids;
    $: observatory_visibility_windows = data.observatory_visibility_windows;

    // Observatory/Telescope/Instrument selector state
    $: observatories = telescopes
        .map((telescope) => telescope.observatory)
        .filter((value, index, self) => self.findIndex((obs) => obs.id === value.id) === index);
    $: instruments = telescopes
        .flatMap((telescope) => telescope.instruments || [])
        .filter((value, index, self) => self.findIndex((inst) => inst.id === value.id) === index);

    // Create observatory short names dictionary for efficient lookups
    $: observatoryShortNames = telescopes.reduce(
        (acc, telescope) => {
            if (!acc[telescope.observatory.id]) {
                acc[telescope.observatory.id] = telescope.observatory.short_name;
            }
            return acc;
        },
        {} as Record<string, string>
    );

    let isLoading = false;

    let selectedObservatories: TelescopeObservatory[] = [];
    let selectedTelescopes: Telescope[] = [];
    let selectedInstruments: TelescopeInstrument[] = [];

    // Coordinate inputs
    let ra = '';
    let dec = '';

    // Date range inputs
    let dateBegin = '';
    let timeBegin = '';
    let dateEnd = '';
    let timeEnd = '';

    // Optional parameters
    let hi_res = false;
    let min_visibility_duration = '';

    // Populate inputs from URL parameters
    onMount(() => {
        const urlParams = new URLSearchParams(window.location.search);

        // Populate coordinates
        if (urlParams.has('ra')) ra = urlParams.get('ra') || '';
        if (urlParams.has('dec')) dec = urlParams.get('dec') || '';

        // Populate date range
        const dateRangeBegin = urlParams.get('date_range_begin');
        if (dateRangeBegin) {
            const [date, time] = dateRangeBegin.split('T');
            dateBegin = date;
            timeBegin = time || '';
        }

        const dateRangeEnd = urlParams.get('date_range_end');
        if (dateRangeEnd) {
            const [date, time] = dateRangeEnd.split('T');
            dateEnd = date;
            timeEnd = time || '';
        }

        // Populate optional parameters
        if (urlParams.has('hi_res')) hi_res = urlParams.get('hi_res') === 'true';
        if (urlParams.has('min_visibility_duration')) min_visibility_duration = urlParams.get('min_visibility_duration') || '';

        // Populate instrument selection
        const instrumentIds = urlParams.get('instrument_ids')?.split(',') || [];
        if (instrumentIds.length > 0) {
            selectedInstruments = instruments.filter((inst) => instrumentIds.includes(inst.id));

            // Auto-select parent telescopes and observatories
            const telescopeIds = new Set<string>();
            const observatoryIds = new Set<string>();

            selectedInstruments.forEach((inst) => {
                const telescope = telescopes.find((tel) => tel.instruments.some((i) => i.id === inst.id));
                if (telescope) {
                    telescopeIds.add(telescope.id);
                    observatoryIds.add(telescope.observatory.id);
                }
            });

            selectedTelescopes = telescopes.filter((tel) => telescopeIds.has(tel.id));
            selectedObservatories = observatories.filter((obs) => observatoryIds.has(obs.id));
        }
    });

    async function calculateVisibility() {
        const params = new URLSearchParams();

        if (dateBegin) params.append('date_range_begin', `${dateBegin}T${timeBegin ? timeBegin : '00:00:00'}`);
        if (dateEnd) params.append('date_range_end', `${dateEnd}T${timeEnd ? timeEnd : '00:00:00'}`);
        if (ra) params.append('ra', ra);
        if (dec) params.append('dec', dec);
        if (hi_res) params.append('hi_res', 'true');
        if (min_visibility_duration) params.append('min_visibility_duration', min_visibility_duration);

        if (selectedInstruments.length) params.append('instrument_ids', selectedInstruments.map((inst) => inst.id).join(','));

        await goto(`?${params.toString()}`, { noScroll: true, invalidateAll: true });
    }

    async function resetFilters() {
        selectedObservatories = [];
        selectedTelescopes = [];
        selectedInstruments = [];
        ra = '';
        dec = '';
        dateBegin = '';
        timeBegin = '';
        dateEnd = '';
        timeEnd = '';
        hi_res = false;
        min_visibility_duration = '';

        await calculateVisibility();
    }

    function formatConstraintReason(reason: string, observatoryId: string, observatoryShortNames: Record<string, string>): string {
        const shortName = observatoryShortNames[observatoryId] || 'Observatory';
        return reason.replace(/Observatory/g, shortName);
    }
</script>

<Page center={true}>
    <Section title="Joint Visibility Calculator" icon="calendar">
        <p class="text-sm mb-4 italic text-gray-600">
            Calculate the visibility of celestial objects from selected instruments. Enter target coordinates and a date range to determine when and for how
            long the object will be observable.
        </p>
        <div class="bg-base-200 p-4 mb-6 w-full">
            <div class="flex justify-between">
                <div class="text-carbon-90 text-2xl pb-4 opacity-80">Input Parameters</div>
                <button class="btn btn-sm btn-primary text-md h-9" on:click={resetFilters}>
                    <div class="bx bx-refresh"></div>
                    Reset
                </button>
            </div>

            <div class="bg-base-100 p-4 mb-4">
                <h3 class="text-lg font-semibold mb-4">Observatory / Telescope / Instrument</h3>
                <div class="py-4 h-200 md:min-h-80 md:max-h-100">
                    <ObservatoryTelescopeInstrumentSelector
                        {observatories}
                        {telescopes}
                        {instruments}
                        bind:selectedObservatories
                        bind:selectedTelescopes
                        bind:selectedInstruments
                    />
                </div>
            </div>

            <div class="bg-base-100 p-4 mb-4">
                <h3 class="text-lg font-semibold mb-4">Object Name Resolver / Coordinates (J2000)</h3>
                <CoordinateSearch bind:ra bind:dec />
            </div>

            <div class="bg-base-100 p-4 mb-4">
                <h3 class="text-lg font-semibold mb-4">Date Range</h3>
                <DateRangeInputs bind:dateBegin bind:timeBegin bind:dateEnd bind:timeEnd />
            </div>

            <div class="bg-base-100 p-4 mb-4">
                <h3 class="text-lg font-semibold mb-4">Optional Parameters</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="form-control">
                        <label class="label cursor-pointer justify-start gap-4">
                            <input id="hi_res-input" type="checkbox" bind:checked={hi_res} class="checkbox checkbox-primary" />
                            <span class="label-text text-lg">High Resolution</span>
                        </label>
                    </div>

                    <div class="form-control">
                        <label class="label text-lg" for="minvis-duration-input">
                            <span class="label-text">Minimum Visibility Duration (seconds)</span>
                        </label>
                        <input
                            id="minvis-duration-input"
                            type="number"
                            inputmode="numeric"
                            bind:value={min_visibility_duration}
                            placeholder="e.g. 300"
                            min="1"
                            step="1"
                            class="input input-bordered text-lg w-full"
                        />
                    </div>
                </div>
            </div>

            <div class="flex justify-end mt-4">
                {#if error}
                    <p class="self-center pe-3 text-error">{error}</p>
                {/if}
                {#if isLoading}
                    <div class="self-center spinner-border spinner-border-sm text-primary">
                        <span class="loading loading-spinner loading-sm"></span>
                    </div>
                {/if}
                <button class="btn btn-info text-lg {isLoading ? 'cursor-wait' : ''}" on:click={async () => await calculateVisibility()} disabled={isLoading}>
                    Calculate Visibility
                </button>
            </div>
        </div>
    </Section>
    <Section title="Joint Visibility Windows (Total: {joint_visibility_windows.length})" icon="globe" parentContainerClasses="lg:w-full lg:px-5">
        <div class="overflow-x-auto">
            <table class="table table-pin-rows table-zebra w-full">
                <thead>
                    <tr class="bg-primary text-primary-content">
                        <th class="text-center">Window #</th>
                        <th>Start Reason</th>
                        <th>Begin</th>
                        <th>End</th>
                        <th>End Reason</th>
                        <th class="text-center">Max Visibility Duration (s)</th>
                    </tr>
                </thead>
                <tbody>
                    {#if joint_visibility_windows.length === 0}
                        <tr>
                            <td colspan="6" class="text-center py-4">
                                No visibility windows found for the given parameters. Please modify your selection and try again.
                            </td>
                        </tr>
                    {/if}
                    {#each joint_visibility_windows as window, index}
                        <tr>
                            <td class="text-center">{index + 1}</td>
                            <td>{formatConstraintReason(window.constraint_reason.start_reason, window.window.begin.observatory_id, observatoryShortNames)}</td>
                            <td class="text-xs">
                                {new Date(window.window.begin.datetime).toISOString().slice(0, -5).replace('T', ' ')}
                            </td>
                            <td class="text-xs">
                                {new Date(window.window.end.datetime).toISOString().slice(0, -5).replace('T', ' ')}
                            </td>
                            <td>{formatConstraintReason(window.constraint_reason.end_reason, window.window.end.observatory_id, observatoryShortNames)}</td>
                            <td class="text-center">{window.max_visibility_duration.toFixed(2)}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </Section>

    {#if joint_visibility_windows.length > 0}
        <Section title="Visibility Windows by Instrument" icon="telescope" parentContainerClasses="lg:w-full lg:px-5">
            <div class="space-y-4">
                {#each visibility_window_instrument_ids as instrumentId}
                    {@const instrument = instruments.find((inst) => inst.id === instrumentId)}
                    {@const windows = observatory_visibility_windows[instrumentId] || []}
                    {#if instrument && windows.length > 0}
                        <div class="collapse collapse-arrow bg-base-200">
                            <input type="checkbox" />
                            <div class="collapse-title text-xl font-medium">
                                {instrument.name}
                                <span class="badge badge-primary ml-2">{windows.length} windows</span>
                            </div>
                            <div class="collapse-content">
                                <div class="overflow-x-auto">
                                    <table class="table table-pin-rows table-zebra w-full">
                                        <thead>
                                            <tr class="bg-primary text-primary-content">
                                                <th class="text-center">Window #</th>
                                                <th>Start Reason</th>
                                                <th>Begin</th>
                                                <th>End</th>
                                                <th>End Reason</th>
                                                <th class="text-center">Max Visibility Duration (s)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {#each windows as window, index}
                                                <tr>
                                                    <td class="text-center">{index + 1}</td>
                                                    <td
                                                        >{formatConstraintReason(
                                                            window.constraint_reason.start_reason,
                                                            window.window.begin.observatory_id,
                                                            observatoryShortNames
                                                        )}</td
                                                    >
                                                    <td class="text-xs">
                                                        {new Date(window.window.begin.datetime).toISOString().slice(0, -5).replace('T', ' ')}
                                                    </td>
                                                    <td class="text-xs">
                                                        {new Date(window.window.end.datetime).toISOString().slice(0, -5).replace('T', ' ')}
                                                    </td>
                                                    <td
                                                        >{formatConstraintReason(
                                                            window.constraint_reason.end_reason,
                                                            window.window.end.observatory_id,
                                                            observatoryShortNames
                                                        )}</td
                                                    >
                                                    <td class="text-center">{window.max_visibility_duration.toFixed(2)}</td>
                                                </tr>
                                            {/each}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    {/if}
                {/each}
            </div>
        </Section>
    {/if}
</Page>
