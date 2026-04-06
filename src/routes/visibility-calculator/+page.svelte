<script lang="ts">
    import Page from '$lib/components/Page.svelte';
    import Section from '$lib/components/Section.svelte';
    import CoordinateSearch from '$lib/components/CoordinateSearch.svelte';
    import DateRangeInput from '$lib/components/datetime/DateRangeInput.svelte';
    import ObservatoryTelescopeInstrumentSelector from '$lib/components/ObservatoryTelescopeInstrumentSelector.svelte';
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { prettyUTC } from '$lib/utils/datetime/prettyUTC';
    import type { TelescopeObservatory } from '$lib/types/across/TelescopeObservatory';
    import type { Telescope } from '$lib/types/across/Telescope';
    import type { TelescopeInstrument } from '$lib/types/across/TelescopeInstrument';
    import type { JointVisibilityPageData, VisibilityWindowsData } from './+page.server';
    import type { SubmitFunction } from '@sveltejs/kit';
    import searchParams from '$lib/utils/searchParams/searchParams';
    import { type VisibilityWindow } from '$lib/types/across/VisibilityWindow';

    export let data: JointVisibilityPageData;

    let telescopes = data?.telescopes;
    let visibilityWindowsData: VisibilityWindowsData | undefined = undefined;

    let isLoading = false;

    let selectedObservatories: TelescopeObservatory[] = [];
    let selectedTelescopes: Telescope[] = [];
    let selectedInstruments: TelescopeInstrument[] = [];

    // Coordinate inputs
    let ra = String(data.queryParams?.ra || '');
    let dec = String(data.queryParams?.dec || '');

    // Date range inputs
    let dateRangeBegin = data.queryParams?.date_range_begin || '';
    let dateRangeEnd = data.queryParams?.date_range_end || '';

    // Optional parameters
    let hiRes = data.queryParams?.hi_res || false;
    let minVisibilityDuration = String(data.queryParams?.min_visibility_duration || '');

    $: qps = [ra, dec, dateRangeBegin, dateRangeEnd, selectedInstruments, hiRes, minVisibilityDuration];
    $: isQueryEmpty = qps.every((value) => !Boolean(value) || (Array.isArray(value) && value.length === 0));

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

    // Map the instrument windows from selected instruments to the returned data
    // This allows us to easily display the visibility windows for each instrument in the results section.
    $: instrumentWindows = selectedInstruments.reduce(
        (acc, instrument) => {
            const windows = visibilityWindowsData?.observatoryVisibilityWindows[instrument.id] || [];

            if (windows.length > 0) acc.push({ instrument, windows });

            return acc;
        },
        [] as { instrument: TelescopeInstrument; windows: VisibilityWindow[] }[]
    );

    // Populate inputs from URL parameters
    onMount(() => {
        // Populate instrument selection
        const instrumentIds = data.queryParams.instrument_ids;
        if (instrumentIds?.length) {
            selectedInstruments = instruments.filter((inst) => instrumentIds.includes(inst.id));

            // Auto-select parent telescopes and observatories
            const selectedTelescopeIds = new Set<string>();
            const selectedObservatoryIds = new Set<string>();

            selectedInstruments.forEach((inst) => {
                const telescope = telescopes.find((tel) => tel.instruments.some((i) => i.id === inst.id));
                if (telescope) {
                    selectedTelescopeIds.add(telescope.id);
                    selectedObservatoryIds.add(telescope.observatory.id);
                }
            });

            selectedTelescopes = telescopes.filter((tel) => selectedTelescopeIds.has(tel.id));
            selectedObservatories = observatories.filter((obs) => selectedObservatoryIds.has(obs.id));
        }
    });

    const calculateVisibility: SubmitFunction<VisibilityWindowsData> = async ({ formData }) => {
        isLoading = true;

        console.log('Form data entries:');
        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        const params = searchParams.serialize(formData);
        console.log(params.toString());
        const url = `${window.location.pathname}?${params.toString()}`;

        // Set the browser's URL with the new params without reloading the page
        goto(url, { noScroll: true, invalidateAll: false, replaceState: true });

        return async ({ result }) => {
            if (result.type === 'success') {
                if (result.data) {
                    visibilityWindowsData = result.data;
                }
            } else {
                visibilityWindowsData = {
                    jointVisibilityWindows: [],
                    visibilityWindowInstrumentIds: [],
                    observatoryVisibilityWindows: {},
                    error: 'An error occurred while calculating visibility windows. Please contact support if it continues.',
                };
            }

            isLoading = false;
        };
    };

    const resetFilters = () => {
        selectedObservatories = [];
        selectedTelescopes = [];
        selectedInstruments = [];
        ra = '';
        dec = '';
        dateRangeBegin = '';
        dateRangeEnd = '';
        hiRes = false;
        minVisibilityDuration = '';
    };

    const formatConstraintReason = (reason: string, observatoryId: string, observatoryShortNames: Record<string, string>): string => {
        const shortName = observatoryShortNames[observatoryId] || 'Observatory';
        return reason.replace(/Observatory/g, shortName);
    };
</script>

<Page title="Joint Visibility Calculator" icon="calendar">
    <Section>
        <div class="lg:w-5/6 xl:w-3/4 self-center">
            <form method="POST" use:enhance={calculateVisibility} action="?/calculateVisibilityWindows">
                <p class="text-sm mb-4 italic text-gray-600">
                    Calculate the visibility of celestial objects from selected instruments. Enter target coordinates and a date range to determine when and for
                    how long the object will be observable.
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
                        <DateRangeInput bind:dateRangeBegin bind:dateRangeEnd />
                    </div>

                    <div class="collapse collapse-arrow bg-base-100 mb-4">
                        <input type="checkbox" />
                        <div class="collapse-title text-lg font-semibold">Optional Parameters</div>
                        <div class="collapse-content">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                <div class="form-control">
                                    <label class="label cursor-pointer justify-start gap-4">
                                        <input id="hi_res-input" type="checkbox" bind:checked={hiRes} class="checkbox checkbox-primary" />
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
                                        bind:value={minVisibilityDuration}
                                        placeholder="e.g. 300"
                                        min="1"
                                        step="1"
                                        class="input input-bordered text-lg w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-end mt-4">
                        <button class="btn btn-info text-lg {isLoading ? 'cursor-wait' : ''}" type="submit" disabled={isLoading}> Calculate Visibility </button>
                    </div>
                </div>

                <input type="hidden" name="ra" value={ra} />
                <input type="hidden" name="dec" value={dec} />
                <input type="hidden" name="date_range_begin" value={dateRangeBegin} />
                <input type="hidden" name="date_range_end" value={dateRangeEnd} />
                <input type="hidden" name="hi_res" value={hiRes} />
                <input type="hidden" name="min_visibility_duration" value={minVisibilityDuration} />
                <input type="hidden" name="instrument_ids" value={selectedInstruments.map((inst) => inst.id).join(',')} />
            </form>
        </div>
    </Section>

    <Section title="Joint Visibility Windows" icon="globe">
        <div class="collapse collapse-arrow border border-base-300">
            <input type="checkbox" checked />
            {#if visibilityWindowsData}
                <div class="collapse-title text-lg font-semibold">Results ({visibilityWindowsData.jointVisibilityWindows.length})</div>
            {/if}
            <div class="collapse-content">
                <div class="overflow-x-auto overflow-y-scroll max-h-128">
                    <table class="table table-pin-rows table-zebra w-full">
                        <thead>
                            <tr class="bg-primary text-primary-content">
                                <th class="text-center">Window #</th>
                                <th>Start Reason</th>
                                <th>Begin (UT)</th>
                                <th>End (UT)</th>
                                <th>End Reason</th>
                                <th class="text-center">Max Visibility Duration (s)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#if isLoading}
                                <tr>
                                    <td colspan="6" class="text-center py-4">
                                        <span class="loading loading-spinner loading-lg"></span>
                                    </td>
                                </tr>
                            {:else if isQueryEmpty}
                                <!-- No query submitted yet -->
                                <tr>
                                    <td colspan="6" class="text-center text-lg py-4">Fill in parameters to calculate visibility windows</td>
                                </tr>
                            {:else if !visibilityWindowsData}
                                <!-- Initial state -->
                                <tr>
                                    <td colspan="6" class="text-center text-lg py-4">Submit parameters to calculate visibility windows</td>
                                </tr>
                            {:else if visibilityWindowsData.jointVisibilityWindows.length === 0}
                                <!-- Submitted, but no data with possible error -->
                                <tr>
                                    {#if visibilityWindowsData.error == ''}
                                        <td colspan="6" class="text-center text-lg py-4"> No joint visibility windows found for the given parameters </td>
                                    {:else}
                                        <td colspan="6" class="text-center text-error text-lg py-4">
                                            {visibilityWindowsData.error}
                                        </td>
                                    {/if}
                                </tr>
                            {:else}
                                {#each visibilityWindowsData.jointVisibilityWindows as window, index}
                                    <!-- display data -->
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
                                            {prettyUTC(window.window.begin.datetime)}
                                        </td>
                                        <td class="text-xs">
                                            {prettyUTC(window.window.end.datetime)}
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
                            {/if}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </Section>
    {#if instrumentWindows.length > 0}
        <Section title="Visibility Windows by Instrument" icon="telescope">
            <div class="space-y-4">
                {#if isLoading}
                    <div class="text-center py-4">
                        <span class="loading loading-spinner loading-lg"></span>
                    </div>
                {:else}
                    {#each instrumentWindows as { instrument, windows }}
                        {#if windows.length > 0}
                            <div class="collapse collapse-arrow border border-base-300">
                                <input type="checkbox" />
                                <div class="collapse-title text-xl font-medium">
                                    {instrument.name}
                                    <span class="badge badge-primary ml-2">{windows.length} windows</span>
                                </div>
                                <div class="collapse-content">
                                    <div class="overflow-x-auto overflow-y-scroll max-h-128">
                                        <table class="table table-pin-rows table-zebra w-full">
                                            <thead>
                                                <tr class="bg-primary text-primary-content">
                                                    <th class="text-center">Window #</th>
                                                    <th>Start Reason</th>
                                                    <th>Begin (UT)</th>
                                                    <th>End (UT)</th>
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
                                                            {prettyUTC(window.window.begin.datetime)}
                                                        </td>
                                                        <td class="text-xs">
                                                            {prettyUTC(window.window.end.datetime)}
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
                {/if}
            </div>
        </Section>
    {/if}
</Page>
