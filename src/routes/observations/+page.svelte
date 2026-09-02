<script lang="ts">
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    import { page } from '$app/state';
    import { goto } from '$app/navigation';
    import Page from '$lib/components/Page.svelte';
    import Section from '$lib/components/Section.svelte';
    import CoordinateSearch from '$lib/components/CoordinateSearch.svelte';
    import ObservatoryTelescopeInstrumentSelector from '$lib/components/ObservatoryTelescopeInstrumentSelector.svelte';
    import DateRangeInput from '$lib/components/datetime/DateRangeInput.svelte';
    import Pagination from '$lib/components/Pagination.svelte';
    import type { TelescopeObservatory } from '$lib/types/across/TelescopeObservatory';
    import type { Telescope } from '$lib/types/across/Telescope';
    import type { TelescopeInstrument } from '$lib/types/across/TelescopeInstrument';
    import logger from '$lib/logger';
    import type { PageData } from './$types';
    import UnitValueInput from '$lib/components/inputs/UnitValueInput.svelte';

    // Svelte 5 migration (B7): `sv migrate` refused this file outright (see B1), so it was
    // still entirely Svelte 4 -- `export let`, 16 `$:` statements and 19 `on:` directives.
    // It is now fully converted to runes.
    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();

    let error = $derived(data.error);
    let scheduleIdError: string = $state('');

    const DEFAULT_COLUMNS = [
        'object_name',
        'telescope_instrument',
        'date_begin',
        'date_end',
        'ra',
        'dec',
        'exposure_time',
        'bandpass_name',
        'status',
    ];
    const COOKIE_NAME = 'observation_columns';
    const PAGINATION_BUTTONS = 4;

    // Observation data and pagination.
    // These were `$:` statements reading `data`, i.e. genuine derivations -- so $derived,
    // not $state. They resync correctly when `load` re-runs on client-side navigation.
    let observations = $derived(data.observations || []);
    let currentPage = $derived(Number(data.currentPage) || 1);
    let totalPages = $derived(data.totalPages || 1);
    let telescopes = $derived(data.telescopes || []);
    let totalCount = $derived(data.totalCount || 0);
    // reassigned by handleSearch(); $derived is reassignable as of Svelte 5.25
    let currentSearchParams = $derived(new URLSearchParams(page.url.searchParams));

    // Observatory/Telescope/Instrument selector state
    let selectedObservatories: TelescopeObservatory[] = $state([]);
    let selectedTelescopes: Telescope[] = $state([]);
    let selectedInstruments: TelescopeInstrument[] = $state([]);

    // Query parameters -- form fields seeded once from the URL, then owned by the user as
    // they type, so these are $state and not $derived. Reading `data` in a $state
    // initialiser makes svelte-check emit `state_referenced_locally`; that is expected
    // here and not a regression. A top-level `let` in Svelte 4 was also evaluated exactly
    // once, so these never resynced on client-side navigation before either -- and
    // resyncing would be wrong, since it would overwrite a field mid-edit.
    let externalId = $state(data.queryParams?.external_id || '');
    let scheduleId = $state('');
    let scheduleIds = $state((data.queryParams?.schedule_ids as string[]) || ([] as string[]));
    let status = $state(data.queryParams?.status || '');
    let proposal = $state(data.queryParams?.proposal || '');
    let objectName = $state(data.queryParams?.object_name || '');
    let dateRangeBegin = $state(data.queryParams?.date_range_begin || '');
    let dateRangeEnd = $state(data.queryParams?.date_range_end || '');
    let bandpassMin = $state(data.queryParams?.bandpass_min || '');
    let bandpassMax = $state(data.queryParams?.bandpass_max || '');
    let bandpassRegime: string = $state(data.queryParams?.bandpass_regime || '');
    let bandpassType: string = $state(data.queryParams?.bandpass_type || '');
    let coneSearchRa = $state(data.queryParams?.cone_search_ra || '');
    let coneSearchDec = $state(data.queryParams?.cone_search_dec || '');
    let coneSearchRadius = $state(data.queryParams?.cone_search_radius || '');
    let type = $state(data.queryParams?.type || '');
    let depthValue = $state(Number(data.queryParams?.depth_value) || undefined);
    let depthUnit = $state(data.queryParams?.depth_unit || '');

    // Column customization.
    // This was `$: availableColumns = [...]`, but the expression has no reactive
    // dependencies, so in Svelte 4 it ran exactly once. It is also mutated in place
    // (`col.selected = ...`, plus `bind:checked` in the modal) and reassigned wholesale,
    // which makes it local state -- $state, deliberately not $derived.
    let availableColumns = $state([
        { id: 'object_name', label: 'Object Name', selected: true },
        { id: 'telescope_instrument', label: 'Observatory/Telescope/Instrument', selected: true },
        { id: 'date_begin', label: 'Date Begin', selected: true },
        { id: 'date_end', label: 'Date End', selected: true },
        { id: 'ra', label: 'RA°', selected: true },
        { id: 'dec', label: 'DEC°', selected: true },
        { id: 'target_id', label: 'Target Id', selected: false },
        { id: 'exposure_time', label: 'Exposure Time', selected: true },
        { id: 'bandpass_name', label: 'Bandpass Name', selected: true },
        { id: 'observation_type', label: 'Observation Type', selected: false },
        { id: 'status', label: 'Status', selected: true },
        { id: 'proposal_reference', label: 'Proposal Reference', selected: false },
        { id: 'description', label: 'Description', selected: false },
        { id: 'schedule_id', label: 'Schedule ID', selected: false },
    ]);

    // Derived from availableColumns, so the three manual `selectedColumns = ...`
    // recomputations that used to follow every column mutation have been removed --
    // $derived recomputes on its own, including for in-place `col.selected` mutations.
    let selectedColumns = $derived(availableColumns.filter((col) => col.selected));

    let isCustomizeModalOpen = $state(false);

    // TODO: add sorting
    // let sortColumn = '';
    // let sortDirection = 'asc'; // 'asc', 'desc', or ''

    // Status options
    const statusOptions = ['planned', 'scheduled', 'unscheduled', 'performed', 'aborted'];

    // Observation type options
    const typeOptions = ['imaging', 'timing', 'spectroscopy', 'slew'];

    // Bandpass type options
    const bandpassTypeOptions = ['ENERGY', 'FREQUENCY', 'WAVELENGTH'];
    const bandpassUnitOptions: {
        [key: string]: string[];
    } = {
        ENERGY: ['eV', 'keV', 'MeV', 'GeV', 'TeV'],
        FREQUENCY: ['Hz', 'kHz', 'MHz', 'GHz', 'THz'],
        WAVELENGTH: ['nm', 'angstrom', 'um', 'mm'],
    };

    // Depth unit options
    const depthUnitOptions = ['ab_mag', 'vega_mag', 'flux_erg', 'flux_jy'];

    let selectedFilter = $state('');

    onMount(() => {
        // If URL params for columns exist, use those instead of cookie values
        if (data.urlColumns && data.urlColumns.length > 0) {
            updateColumnsFromUrlParams(data.urlColumns);
        } else {
            loadColumnsFromCookie();
        }

        // Default to DEFAULT_COLUMNS if nothing is selected
        if (selectedColumns.length === 0) {
            availableColumns = availableColumns.map((col) => {
                const isDefault = DEFAULT_COLUMNS.some((defCol) => defCol === col.id);
                return { ...col, selected: isDefault };
            });
        }
    });

    function updateColumnsFromUrlParams(columnIds: string[]) {
        availableColumns.forEach((col) => {
            col.selected = columnIds.includes(col.id);
        });
    }

    function loadColumnsFromCookie() {
        if (!browser) return;

        const cookieValue = document.cookie
            .split('; ')
            .find((row) => row.startsWith(`${COOKIE_NAME}=`))
            ?.split('=')[1];

        if (cookieValue) {
            try {
                const savedColumns = JSON.parse(decodeURIComponent(cookieValue));
                availableColumns = availableColumns.map((col) => {
                    col.selected = savedColumns.includes(col.id);
                    return col;
                });
            } catch (err) {
                logger.error({ msg: 'Failed to parse column cookie', err });
            }
        }
    }

    function saveColumnsToCookie() {
        if (!browser) return;

        const selectedColumnIds = availableColumns.filter((col) => col.selected).map((col) => col.id);

        const value = encodeURIComponent(JSON.stringify(selectedColumnIds));
        document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=31536000`; // 1 year expiry
    }

    function resetToDefaultColumns() {
        // toggle selected
        availableColumns = availableColumns.map((col) => {
            col.selected = DEFAULT_COLUMNS.includes(col.id);
            return col;
        });
    }

    let dateBeginDisplay = $derived(dateRangeBegin ? dateRangeBegin.split('T')[0] : '');
    let timeBeginDisplay = $derived(dateRangeBegin ? (dateRangeBegin.split('T')[1] ?? '') : '');
    let dateEndDisplay = $derived(dateRangeEnd ? dateRangeEnd.split('T')[0] : '');
    let timeEndDisplay = $derived(dateRangeEnd ? (dateRangeEnd.split('T')[1] ?? '') : '');

    async function handleSearch() {
        const params = new URLSearchParams();

        if (externalId) params.append('external_id', externalId);
        if (status) params.append('status', status);
        if (proposal) params.append('proposal', proposal);
        if (objectName) params.append('object_name', objectName);
        if (dateRangeBegin) params.append('date_range_begin', dateRangeBegin);
        if (dateRangeEnd) params.append('date_range_end', dateRangeEnd);
        if (bandpassMin?.toString()) params.append('bandpass_min', bandpassMin.toString());
        if (bandpassMax?.toString()) params.append('bandpass_max', bandpassMax.toString());
        if (bandpassType) params.append('bandpass_type', bandpassType);
        if (bandpassRegime) params.append('bandpass_regime', bandpassRegime);
        if (coneSearchRa?.toString()) params.append('cone_search_ra', coneSearchRa.toString());
        if (coneSearchDec?.toString()) params.append('cone_search_dec', coneSearchDec.toString());
        if (coneSearchRadius?.toString()) params.append('cone_search_radius', coneSearchRadius.toString());
        if (type) params.append('type', type);
        if (depthValue?.toString()) params.append('depth_value', depthValue.toString());
        if (depthUnit) params.append('depth_unit', depthUnit);
        if (scheduleIds.length) params.append('schedule_ids', scheduleIds.toString());

        // Add observatory/telescope/instrument filters
        if (selectedObservatories.length) params.append('observatory_ids', selectedObservatories.map((obs) => obs.id).join(','));
        if (selectedTelescopes.length) params.append('telescope_ids', selectedTelescopes.map((tel) => tel.id).join(','));
        if (selectedInstruments.length) params.append('instrument_ids', selectedInstruments.map((inst) => inst.id).join(','));

        // Add columns parameter
        const columnParam = selectedColumns.map((col) => col.id).join(',');
        if (columnParam) params.append('columns', columnParam);

        // TODO: add sorting
        // Add sort parameters if sorting is applied
        // if (sortColumn && sortDirection) {
        //     params.append('sort', sortColumn);
        //     params.append('order', sortDirection);
        // }

        currentSearchParams = params;
        await goto(`?${params.toString()}`, { noScroll: true, invalidateAll: true });
    }

    function isValidUUID(uuidString: string) {
        const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        return regex.test(uuidString);
    }

    function handleRemoveSchedule(removeScheduleId: string) {
        scheduleIds = scheduleIds.filter((scheduleId: string) => scheduleId != removeScheduleId);
    }

    function handleAddSchedule(addScheduleId: string) {
        // reset error text
        scheduleIdError = '';
        // early return and display known errors
        if (!isValidUUID(addScheduleId)) {
            scheduleIdError = 'Must be a valid UUID like AAAAAAAA-BBBB-CCCC-DDDD-EEEEEEEEEEEE';
            return;
        }
        if (scheduleIds.includes(addScheduleId)) {
            scheduleIdError = 'Duplicate ID detected, ignoring.';
            return;
        }

        // prevent empty
        if (addScheduleId != '') {
            // can't use array.push here because svelte wont detect reactivity via pointer assignment
            // must reassign for reactivity
            scheduleIds = [...scheduleIds, addScheduleId.trim()];
            // reset schedule id input field
            scheduleId = '';
        }
    }

    function handleAddScheduleEnterKey(event: KeyboardEvent, addScheduleId: string) {
        if (event.key === 'Enter') {
            handleAddSchedule(addScheduleId);
        }
    }

    // TODO: add sort to table headings with onclick={() => toggleSort(column.id)}
    // async function toggleSort(column) {
    //     if (sortColumn === column) {
    //         if (sortDirection === 'asc') {
    //             sortDirection = 'desc';
    //         } else if (sortDirection === 'desc') {
    //             sortColumn = '';
    //             sortDirection = 'asc';
    //         }
    //     } else {
    //         sortColumn = column;
    //         sortDirection = 'asc';
    //     }

    //     // Apply the sort
    //     await handleSearch();
    // }

    async function saveColumnSelection() {
        saveColumnsToCookie();
        isCustomizeModalOpen = false;

        // Update URL with new column selection
        await handleSearch();
    }

    type ObservatoryTelescopeInstrumentName = {
        observatoryName: string;
        telescopeName: string;
        instrumentName: string;
    };

    const getTelescopeInstrument = (instrument_uuid: string | undefined): ObservatoryTelescopeInstrumentName[] => {
        if (!instrument_uuid)
            return [
                {
                    observatoryName: 'unknown observatory',
                    telescopeName: 'unknown telescope',
                    instrumentName: 'unknown instrument',
                },
            ];

        return telescopes?.reduce(
            (telescopeInstrument, currentTelescope) => {
                const foundInstrumentName = currentTelescope?.instruments?.find((inst) => inst.id === instrument_uuid)?.name;
                if (foundInstrumentName) {
                    return [
                        {
                            observatoryName: currentTelescope.observatory.name,
                            telescopeName: currentTelescope.name,
                            instrumentName: foundInstrumentName,
                        },
                    ];
                } else return telescopeInstrument;
            },
            [
                {
                    observatoryName: 'unknown observatory',
                    telescopeName: 'unknown telescope',
                    instrumentName: 'unknown instrument',
                },
            ] as ObservatoryTelescopeInstrumentName[]
        )!;
    };

    function deselectAccordion(currentFilterName: string) {
        if (selectedFilter == currentFilterName) {
            selectedFilter = '';
        }
    }

    async function resetFilters() {
        externalId = '';
        scheduleId = '';
        scheduleIds = [];
        status = '';
        proposal = '';
        objectName = '';
        dateRangeBegin = '';
        dateRangeEnd = '';
        bandpassMin = '';
        bandpassMax = '';
        bandpassRegime = '';
        bandpassType = '';
        coneSearchRa = '';
        coneSearchDec = '';
        coneSearchRadius = '';
        type = '';
        depthValue = undefined;
        depthUnit = '';
        scheduleIdError = '';
        selectedObservatories = [];
        selectedTelescopes = [];
        selectedInstruments = [];

        await handleSearch();
    }
</script>

<Page title="Browse Observations" icon="images">
    <Section>
        <div class="lg:w-5/6 xl:w-3/4 self-center">
            <div class="bg-base-200 p-4 mb-6 w-full">
                <div class="flex justify-between">
                    <div class="text-carbon-90 text-2xl pb-4 opacity-80" title="All selected filters apply during search">
                        Query Filters
                    </div>
                    <button class="btn btn-sm btn-primary text-md h-9" onclick={resetFilters}
                        ><div class="bx bx-refresh"></div>
                        Reset Filters</button
                    >
                </div>
                <!-- Accordion Join -->
                <div class="join join-vertical bg-base-100 w-full">
                    <!-- Observatory/Telescope/Instrument Filter -->
                    <div class="collapse collapse-arrow join-item border-base-300 border">
                        <input
                            type="radio"
                            name="my-accordion"
                            value="observatory-telescope-instrument"
                            onclick={() => {
                                deselectAccordion('observatory-telescope-instrument');
                            }}
                            bind:group={selectedFilter}
                            checked={false}
                        />
                        <div
                            class="collapse-title font-semibold {selectedObservatories.length ||
                            selectedTelescopes.length ||
                            selectedInstruments.length
                                ? 'text-nasa-blue-shade'
                                : ''}"
                        >
                            <h3 class="text-lg mb-2">Observatory / Telescope / Instrument</h3>
                            {#if selectedFilter != 'observatory-telescope-instrument'}
                                <div class="opacity-60">
                                    {#if selectedObservatories.length}
                                        <span class="font-thin">Observatories: </span><span>{selectedObservatories.length} </span>
                                    {/if}
                                    {#if selectedTelescopes.length}
                                        <span class="font-thin">Telescopes: </span><span>{selectedTelescopes.length} </span>
                                    {/if}
                                    {#if selectedInstruments.length}
                                        <span class="font-thin">Instruments: </span><span>{selectedInstruments.length} </span>
                                    {/if}
                                </div>
                            {/if}
                        </div>
                        <div class="collapse-content">
                            <div class="py-4 h-200 md:min-h-80 md:max-h-100">
                                <ObservatoryTelescopeInstrumentSelector
                                    {telescopes}
                                    bind:selectedObservatories
                                    bind:selectedTelescopes
                                    bind:selectedInstruments
                                />
                            </div>
                        </div>
                    </div>

                    <!-- Observation section -->
                    <div class="collapse collapse-arrow join-item border-base-300 border">
                        <input
                            type="radio"
                            name="my-accordion"
                            value="observation"
                            onclick={() => {
                                deselectAccordion('observation');
                            }}
                            bind:group={selectedFilter}
                            checked={false}
                        />
                        <div
                            class="collapse-title font-semibold
                            {objectName || dateRangeBegin || dateRangeEnd || status || type ? 'text-nasa-blue-shade' : ''}"
                        >
                            <h3 class="text-lg mb-2">Observation Name / Date / Type</h3>
                            {#if selectedFilter != 'observation'}
                                <div class="opacity-60">
                                    {#if objectName}
                                        <span class="font-thin">Object Name: </span><span>{objectName} </span>
                                    {/if}
                                    {#if dateBeginDisplay || timeBeginDisplay}
                                        <span class="font-thin">Date Begin: </span><span>{dateBeginDisplay} {timeBeginDisplay}</span>
                                    {/if}
                                    {#if dateEndDisplay || timeEndDisplay}
                                        <span class="font-thin">Date End: </span><span>{dateEndDisplay} {timeEndDisplay}</span>
                                    {/if}
                                    {#if status}
                                        <span class="font-thin">Status: </span><span>{status}</span>
                                    {/if}
                                    {#if type}
                                        <span class="font-thin">Type: </span><span>{type}</span>
                                    {/if}
                                </div>
                            {/if}
                        </div>
                        <div class="collapse-content">
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
                                <div class="form-control">
                                    <label class="label text-lg" for="object-name-input">
                                        <span class="label-text">Object Name</span>
                                    </label>
                                    <div class="flex items-center">
                                        <input
                                            id="object-name-input"
                                            type="text"
                                            bind:value={objectName}
                                            placeholder="e.g. CRAB PULSAR"
                                            class="input input-bordered text-lg w-full"
                                        />
                                    </div>
                                </div>

                                <div class="form-control">
                                    <label class="label text-lg" for="observation-status-input">
                                        <span class="label-text">Status</span>
                                    </label>
                                    <select id="observation-status-input" bind:value={status} class="select select-bordered text-lg w-full">
                                        <option value="">Select status</option>
                                        {#each statusOptions as option}
                                            <option value={option}>{option}</option>
                                        {/each}
                                    </select>
                                </div>

                                <div class="form-control">
                                    <label class="label text-lg" for="observation-type-input">
                                        <span class="label-text">Type</span>
                                    </label>
                                    <select id="observation-type-input" bind:value={type} class="select select-bordered text-lg w-full">
                                        <option value="">Select Type</option>
                                        {#each typeOptions as option}
                                            <option value={option}>{option}</option>
                                        {/each}
                                    </select>
                                </div>
                            </div>

                            <DateRangeInput bind:dateRangeBegin bind:dateRangeEnd />
                        </div>
                    </div>

                    <!-- Coordinate Cone Search -->
                    <div class="collapse collapse-arrow join-item border-base-300 border">
                        <input
                            type="radio"
                            name="my-accordion"
                            value="coordinate-search"
                            onclick={() => {
                                deselectAccordion('coordinate-search');
                            }}
                            bind:group={selectedFilter}
                            checked={false}
                        />
                        <div
                            class="collapse-title font-semibold {coneSearchRa || coneSearchDec || coneSearchRadius
                                ? 'text-nasa-blue-shade'
                                : ''}"
                        >
                            <h3 class="text-lg mb-2">Coordinate Cone Search (J2000)</h3>
                            {#if selectedFilter != 'coordinate-search'}
                                <div class="opacity-60">
                                    {#if coneSearchRa}
                                        <span class="font-thin">RA: </span><span>{coneSearchRa} </span>
                                    {/if}
                                    {#if coneSearchDec}
                                        <span class="font-thin">DEC: </span><span>{coneSearchDec} </span>
                                    {/if}
                                    {#if coneSearchRadius}
                                        <span class="font-thin">Radius: </span><span>{coneSearchRadius} </span>
                                    {/if}
                                </div>
                            {/if}
                        </div>
                        <div class="collapse-content bg-carbon-05">
                            <!-- Coordinate Search Component -->
                            <CoordinateSearch
                                bind:ra={coneSearchRa}
                                bind:dec={coneSearchDec}
                                bind:radius={coneSearchRadius}
                                includeRadius={true}
                            />
                        </div>
                    </div>

                    <!-- Energy Regime / Bandpass -->
                    <div class="collapse collapse-arrow join-item border-base-300 border">
                        <input
                            type="radio"
                            name="my-accordion"
                            value="energy-regime"
                            onclick={() => {
                                deselectAccordion('energy-regime');
                            }}
                            bind:group={selectedFilter}
                            checked={false}
                        />
                        <div
                            class="collapse-title font-semibold {bandpassRegime || bandpassMin || bandpassMax
                                ? 'text-nasa-blue-shade'
                                : ''}"
                        >
                            <h3 class="text-lg mb-2">Energy Regime / Bandpass</h3>
                            {#if selectedFilter != 'energy-regime'}
                                <div class="opacity-60">
                                    {#if bandpassRegime}
                                        <span class="font-thin">Bandpass: </span><span>{bandpassRegime}</span>
                                    {/if}
                                    {#if bandpassMin && bandpassMax}
                                        <span>{bandpassMin} - {bandpassMax}</span>
                                    {:else if bandpassMax}
                                        <span>{'< ' + bandpassMax}</span>
                                    {:else if bandpassMin}
                                        <span>{'> ' + bandpassMin}</span>
                                    {/if}

                                    {#if bandpassType}
                                        <span>{bandpassType}</span>
                                    {/if}
                                </div>
                            {/if}
                        </div>
                        <div class="collapse-content">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label class="label text-lg" for="bandpass-type-input">
                                        <span class="label-text">Bandpass Regime</span>
                                    </label>
                                    <select
                                        id="bandpass-type-input"
                                        bind:value={bandpassRegime}
                                        onchange={() => (bandpassType = '')}
                                        class="select select-bordered text-lg w-full"
                                    >
                                        <option value="">Select Regime</option>
                                        {#each bandpassTypeOptions as option}
                                            <option value={option}>{option}</option>
                                        {/each}
                                    </select>
                                </div>

                                <div>
                                    <label class="label text-lg" for="bandpass-type-input">
                                        <span class="label-text">{bandpassRegime ? bandpassRegime : 'Bandpass'} Type</span>
                                    </label>
                                    <select
                                        id="bandpass-type-input"
                                        bind:value={bandpassType}
                                        class="select select-bordered text-lg {bandpassRegime ? '' : 'opacity-50'} w-full"
                                    >
                                        <option class="opacity-50" value=""
                                            >{bandpassRegime ? `Select ${bandpassRegime} unit` : '← Select Bandpass Type'}</option
                                        >
                                        {#if bandpassRegime}
                                            {#key bandpassRegime}
                                                {#each bandpassUnitOptions[bandpassRegime] as option}
                                                    <option value={option}>{option}</option>
                                                {/each}
                                            {/key}
                                        {/if}
                                    </select>
                                </div>

                                <label class="input text-lg w-full" for="badpass-min-input">
                                    Min:
                                    <input
                                        id="badpass-min-input"
                                        type="number"
                                        inputmode="numeric"
                                        bind:value={bandpassMin}
                                        placeholder="Bandpass min"
                                        class="input validator input-bordered text-lg w-full"
                                        min="0"
                                    />
                                    {#if bandpassType}
                                        <span class="label">{bandpassType}</span>
                                    {/if}
                                    <p class="hidden validator-hint mt-18" style="position: absolute;">Must be decimal greater than 0</p>
                                </label>

                                <label class="input text-lg w-full" for="bandpass-max-input">
                                    Max:
                                    <input
                                        id="bandpass-max-input"
                                        type="number"
                                        inputmode="numeric"
                                        bind:value={bandpassMax}
                                        placeholder="Bandpass max"
                                        class="input validator input-bordered text-lg w-full"
                                        min="0"
                                    />
                                    {#if bandpassType}
                                        <span class="label">{bandpassType}</span>
                                    {/if}
                                    <p class="hidden validator-hint mt-18" style="position: absolute;">Must be decimal greater than 0</p>
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- Depth -->
                    <div class="collapse collapse-arrow join-item border-base-300 border">
                        <input
                            type="radio"
                            name="my-accordion"
                            value="depth"
                            onclick={() => {
                                deselectAccordion('depth');
                            }}
                            bind:group={selectedFilter}
                            checked={false}
                        />
                        <div class="collapse-title font-semibold {depthUnit || depthValue ? 'text-nasa-blue-shade' : ''}">
                            <h3 class="text-lg mb-2">Depth</h3>
                            {#if selectedFilter != 'depth'}
                                <div class="opacity-60">
                                    {#if depthValue}
                                        <span>{depthValue}</span>
                                    {/if}
                                    {#if depthUnit}
                                        <span>{depthUnit}</span>
                                    {/if}
                                </div>
                            {/if}
                        </div>
                        <div class="collapse-content">
                            <UnitValueInput
                                id="depth"
                                displayName="Depth"
                                bind:value={depthValue}
                                bind:unit={depthUnit}
                                unitOptions={depthUnitOptions}
                            />
                        </div>
                    </div>

                    <!-- Filter by Schedule -->
                    <div class="collapse collapse-arrow join-item border-base-300 border">
                        <input
                            type="radio"
                            name="my-accordion"
                            value="filter-schedule"
                            onclick={() => {
                                deselectAccordion('filter-schedule');
                            }}
                            bind:group={selectedFilter}
                            checked={false}
                        />
                        <div class="collapse-title font-semibold {scheduleIds.length ? 'text-nasa-blue-shade' : ''}">
                            <h3 class="text-lg mb-2">Filter By Schedule IDs</h3>
                            {#if selectedFilter != 'filter-schedule'}
                                <div class="opacity-60">
                                    {#if scheduleIds.length}
                                        <span>{scheduleIds.length} </span><span class="font-thin"
                                            >Schedule ID{scheduleIds.length > 1 ? 's' : ''} selected</span
                                        >
                                    {/if}
                                </div>
                            {/if}
                        </div>
                        <div class="collapse-content bg-carbon-05">
                            <div class="grid grid-cols-1 gap-2 mb-4">
                                <label class="input text-lg pe-0 w-full" for="schedule-input">
                                    Schedule ID:
                                    <input
                                        id="schedule-input"
                                        bind:value={scheduleId}
                                        onkeydown={(event) => handleAddScheduleEnterKey(event, scheduleId)}
                                        class="input validator input-bordered text-lg w-full"
                                        type="text"
                                        placeholder="UUID"
                                    />
                                    <button id="schedule-add" onclick={() => handleAddSchedule(scheduleId)} class="btn btn-info text-lg"
                                        >Add Schedule ID</button
                                    >
                                </label>
                                <p class="self-center pe-3 text-error {scheduleIdError ? '' : 'hidden'}">{scheduleIdError}</p>
                                {#key scheduleIds.length}
                                    {#if scheduleIds.length}
                                        <div class="overflow-x-auto overflow-y-auto min-h-20 max-h-38">
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th>{scheduleIds.length} Schedule ID{scheduleIds.length > 1 ? 's' : ''}</th>
                                                    </tr>
                                                </thead>
                                                <tbody class="mx-4">
                                                    {#each scheduleIds as id}
                                                        <tr>
                                                            <!--
                                                                Svelte 5 migration (B1): the <span> and <button> below
                                                                were direct children of <tr>, which is a hard compile
                                                                error in Svelte 5 -- <tr> permits only <th>, <td>,
                                                                <style>, <script> and <template>. This was the error
                                                                that broke `npm run build`. The row was laid out with
                                                                `flex` rather than as a real table row, so the flex
                                                                container moves onto a single spanning <td>.
                                                            -->
                                                            <td class="flex w-full">
                                                                <span class="w-full self-center">{id}</span>
                                                                <button
                                                                    class="btn btn-sm text-sm align-end"
                                                                    onclick={() => handleRemoveSchedule(id)}>Remove</button
                                                                >
                                                            </td>
                                                        </tr>
                                                    {/each}
                                                </tbody>
                                            </table>
                                        </div>
                                    {/if}
                                {/key}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex justify-end mt-4">
                    <p class="self-center pe-3 text-error {error ? '' : 'hidden'}">{error}</p>
                    <button class="btn btn-info text-lg" onclick={async () => await handleSearch()}>Search</button>
                </div>
            </div>
        </div>
    </Section>
    <Section title="Observations (Total: {totalCount})" icon="globe">
        <!-- Pagination -->
        <!--
            Svelte 5 migration (G2): this was `<div slot="buttons">`. Section/Page declare
            `buttons` as a Snippet, and a legacy named slot passed to a runes component
            renders *nothing at all* -- silently, with no error. Page gates its whole header
            row on `{#if icon || title || buttons}`, so the pagination and Customize button
            disappeared. This is the `$$slot_def is of type 'unknown'` svelte-check error.
        -->
        {#snippet buttons()}
            <div class="flex space-x-2">
                {#key currentPage}
                    <Pagination {currentPage} {totalPages} searchParams={currentSearchParams} numButtons={PAGINATION_BUTTONS} />
                {/key}
                <button class="btn btn-sm btn-outline" onclick={() => (isCustomizeModalOpen = true)}>
                    Customize
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            fill-rule="evenodd"
                            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </button>
            </div>
        {/snippet}

        <!-- Column Customization Modal -->
        {#if isCustomizeModalOpen}
            <div class="fixed inset-0 bg-transparent flex items-center justify-center z-50">
                <div class="bg-base-100 p-6 w-full max-w-md shadow-2xl">
                    <div class="text-lg font-bold mb-4 flex flex-row justify-between">
                        <h3 class="flex">Customize Columns</h3>
                        <button
                            class="justify-end btn btn-sm btn-primary max-h-8"
                            title="Close without saving selections to cookie"
                            onclick={() => (isCustomizeModalOpen = false)}>X</button
                        >
                    </div>
                    <p class="italic">Changes apply on selection</p>
                    <div class="max-h-80 overflow-y-auto mb-4">
                        {#each availableColumns as column}
                            {#key column.id && column.selected}
                                <div class="form-control odd:bg-base-200">
                                    <label class="label cursor-pointer flex justify-between">
                                        <span class="label-text ps-3">{column.label}</span>
                                        <input type="checkbox" bind:checked={column.selected} class="checkbox me-3" />
                                    </label>
                                </div>
                            {/key}
                        {/each}
                    </div>

                    <div class="flex justify-between">
                        <div>
                            <button class="btn btn-sm btn-outline mr-2" onclick={resetToDefaultColumns}> Default Columns </button>
                            <button class="btn btn-sm btn-outline" onclick={loadColumnsFromCookie}> Load My Columns </button>
                        </div>
                        <div>
                            <button
                                class="btn btn-sm btn-primary"
                                onclick={saveColumnSelection}
                                title="Save column selections to cookie to be loaded next visit and close this modal"
                            >
                                Save & Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        {/if}

        <!-- Data Table -->
        <div id="data-table" class="overflow-x-auto overflow-y-scroll max-h-256 ps-0 pe-0 pb-0">
            <table class="table table-pin-rows table-zebra w-full">
                <thead>
                    <tr class="bg-primary text-primary-content">
                        {#each selectedColumns as column}
                            <th class="max-w-70 cursor-pointer hover:bg-nasa-blue">
                                {column.label}
                                <!-- {#if sortColumn === column.id}
                                    {sortDirection === 'asc' ? '↑' : '↓'}
                                {/if} -->
                            </th>
                        {/each}
                    </tr>
                </thead>
                <tbody>
                    {#if observations.length === 0}
                        <tr>
                            <td colspan={selectedColumns.length} class="text-center py-4">
                                No observations found. Adjust your search criteria and try again.
                            </td>
                        </tr>
                    {:else}
                        {#each observations as obs}
                            <tr>
                                {#each selectedColumns as column}
                                    <td class="">
                                        {#if column.id === 'telescope_instrument'}
                                            {#each getTelescopeInstrument(obs?.instrument_id) as telescope_instrument}
                                                <p class="font-bold max-w-70 text-wrap">
                                                    {telescope_instrument?.observatoryName}
                                                </p>

                                                <p class="text-xs max-w-70 text-wrap">
                                                    {telescope_instrument?.telescopeName}
                                                </p>

                                                <p class="text-xs max-w-70 text-wrap">
                                                    {telescope_instrument?.instrumentName}
                                                </p>
                                            {/each}
                                        {:else if column.id === 'date_begin'}
                                            <p class="text-xs w-max">
                                                {new Date(obs.date_range?.begin + 'Z').toISOString().slice(0, -5).replace('T', ' ')}
                                            </p>
                                        {:else if column.id === 'date_end'}
                                            <p class="text-xs w-max">
                                                {new Date(obs.date_range?.end + 'Z').toISOString().slice(0, -5).replace('T', ' ')}
                                            </p>
                                        {:else if column.id === 'ra'}
                                            <p class="text-xs">
                                                {obs.pointing_position?.ra}
                                            </p>
                                        {:else if column.id === 'dec'}
                                            <p class="text-xs">
                                                {obs.pointing_position?.dec}
                                            </p>
                                        {:else if column.id === 'target_id'}
                                            {obs.external_observation_id || '-'}
                                        {:else if column.id === 'exposure_time'}
                                            {obs?.exposure_time?.toFixed(2) ? `${obs?.exposure_time?.toFixed(2)} s` : '-'}
                                        {:else if column.id === 'bandpass_name'}
                                            {obs.bandpass?.filter_name || '-'}
                                        {:else if column.id === 'observation_type'}
                                            {obs.type || '-'}
                                        {:else if column.id === 'object_name'}
                                            {obs.object_name || '-'}
                                        {:else if column.id === 'status'}
                                            {obs.status || '-'}
                                        {:else if column.id === 'proposal_reference'}
                                            {obs.proposal_reference || '-'}
                                        {:else if column.id === 'description'}
                                            {obs.description || '-'}
                                        {:else if column.id === 'schedule_id'}
                                            {obs.schedule_id || '-'}
                                        {:else}
                                            -
                                        {/if}
                                    </td>
                                {/each}
                            </tr>
                        {/each}
                    {/if}
                </tbody>
            </table>
        </div>
        <div class="flex ml-auto w-fit space-x-2 pt-4">
            <Pagination {currentPage} {totalPages} searchParams={currentSearchParams} numButtons={PAGINATION_BUTTONS} />

            <button class="btn btn-sm btn-outline" onclick={() => (isCustomizeModalOpen = true)}>
                Customize
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        fill-rule="evenodd"
                        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                        clip-rule="evenodd"
                    />
                </svg>
            </button>
        </div>
    </Section>
</Page>

<style>
    /* remove ugly up/down arrows */
    input[type='number']::-webkit-inner-spin-button,
    input[type='number']::-webkit-outer-spin-button,
    input[type='number'] {
        appearance: textfield;
        -moz-appearance: textfield;
        -webkit-appearance: none;
    }

    #data-table {
        scrollbar-gutter: stable;
    }
</style>
