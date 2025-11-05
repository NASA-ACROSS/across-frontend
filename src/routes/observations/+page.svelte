<script lang="ts">
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    import { page } from '$app/state';
    import { goto } from '$app/navigation';
    import Page from '$lib/components/Page.svelte';
    import Section from '$lib/components/Section.svelte';

    export let data;

    // Observation data and pagination
    $: observations = data.observations || [];
    $: currentPage = data.currentPage || 1;
    $: totalPages = data.totalPages || 1;
    $: telescopes = data.telescopes;

    // Query parameters
    let externalId = data.queryParams?.external_id || '';
    let scheduleId = '';
    let scheduleIds = (data.queryParams?.schedule_ids as string[]) || ([] as string[]);
    let observatoryIds = data.queryParams?.observatory_ids || [];
    let telescopeIds = data.queryParams?.telescope_ids || [];
    let instrumentIds = data.queryParams?.instrument_ids || [];
    let status = data.queryParams?.status || '';
    let proposal = data.queryParams?.proposal || '';
    let objectName = data.queryParams?.object_name || '';
    let dateBegin = data.queryParams?.date_range_begin?.split('T')[0];
    let timeBegin = data.queryParams?.date_range_begin?.split('T')[1];
    let dateEnd = data.queryParams?.date_range_end?.split('T')[0];
    let timeEnd = data.queryParams?.date_range_end?.split('T')[1];
    let bandpassMin = data.queryParams?.bandpass_min || '';
    let bandpassMax = data.queryParams?.bandpass_max || '';
    let bandpassType: string = data.queryParams?.bandpass_type || '';
    let bandpassUnit: string = data.queryParams?.bandpass_unit || '';
    let coneSearchRa = data.queryParams?.cone_search_ra || '';
    let coneSearchDec = data.queryParams?.cone_search_dec || '';
    let coneSearchRadius = data.queryParams?.cone_search_radius || '';
    let type = data.queryParams?.type || '';
    let depthValue = data.queryParams?.depth_value || '';
    let depthUnit = data.queryParams?.depth_unit || '';

    // Column customization
    $: availableColumns = [
        {
            id: 'telescope_instrument',
            label: 'Observatory/Telescope/Instrument',
            selected: true,
        },
        { id: 'date_begin', label: 'Date Begin', selected: true },
        { id: 'date_end', label: 'Date End', selected: true },
        { id: 'ra', label: 'RA', selected: true },
        { id: 'dec', label: 'DEC', selected: true },
        { id: 'target_id', label: 'Target Id', selected: true },
        { id: 'exposure_time', label: 'Exposure Time', selected: true },
        { id: 'bandpass_name', label: 'Bandpass Name', selected: true },
        { id: 'observation_type', label: 'Observation Type', selected: true },
        { id: 'object_name', label: 'Object Name', selected: false },
        { id: 'status', label: 'Status', selected: false },
        {
            id: 'proposal_reference',
            label: 'Proposal Reference',
            selected: false,
        },
        { id: 'description', label: 'Description', selected: false },
        { id: 'schedule_id', label: 'Schedule ID', selected: false },
    ];

    const DEFAULT_COLUMNS = ['telescope_instrument', 'date_begin', 'date_end', 'ra', 'dec', 'exposure_time', 'target_id', 'object_name', 'status'];

    $: selectedColumns = availableColumns.filter((col) => col.selected);
    let isCustomizeModalOpen = false;
    let sortColumn = '';
    let sortDirection = 'asc'; // 'asc', 'desc', or ''

    const COOKIE_NAME = 'observation_columns';

    // Status options
    const statusOptions = ['planned', 'scheduled', 'unscheduled', 'performed', 'aborted'];

    // Observation type options
    const typeOptions = ['imaging', 'timing', 'spectroscopy', 'slew'];

    // Bandpass type options
    const bandpassTypeOptions = ['ENERGY', 'FREQUENCY', 'WAVELENGTH'];
    const bandpasssUnitOptions: {
        [key: string]: string[];
    } = {
        ENERGY: ['eV', 'keV', 'MeV', 'GeV', 'TeV'],
        FREQUENCY: ['Hz', 'kHz', 'MHz', 'GHz', 'THz'],
        WAVELENGTH: ['nm', 'angstrom', 'um', 'mm'],
    };

    // Depth unit options
    const depthUnitOptions = ['ab_mag', 'vega_mag', 'flux_erg', 'flux_jy'];

    $: selectedFilter = '';

    onMount(() => {
        // If URL params for columns exist, use those instead of cookie values
        if (data.urlColumns && data.urlColumns.length > 0) {
            updateColumnsFromUrlParams(data.urlColumns);
        } else {
            loadColumnsFromCookie();
        }

        // Default to DEFAULT_COLUMNS if nothing is selected
        if (selectedColumns.length === 0) {
            selectedColumns = [...DEFAULT_COLUMNS];
            availableColumns = availableColumns.map((col) => {
                const isDefault = DEFAULT_COLUMNS.some((defCol) => defCol.id === col.id);
                return { ...col, selected: isDefault };
            });
        }
    });

    function updateColumnsFromUrlParams(columnIds) {
        availableColumns.forEach((col) => {
            col.selected = columnIds.includes(col.id);
        });
        selectedColumns = availableColumns.filter((col) => col.selected);
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
                availableColumns.forEach((col) => {
                    col.selected = savedColumns.includes(col.id);
                });
                selectedColumns = availableColumns.filter((col) => col.selected);
            } catch (e) {
                console.error('Error parsing column cookie', e);
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
        availableColumns.forEach((col) => {
            // Set default selections
            col.selected = ['telescope_instrument', 'date_ranges', 'ra_dec', 'target_id', 'exposure_time', 'bandpass_name', 'observation_type'].includes(
                col.id
            );
        });
        selectedColumns = availableColumns.filter((col) => col.selected);
    }

    async function handleSearch() {
        const params = new URLSearchParams();

        if (externalId) params.append('external_id', externalId);
        if (status) params.append('status', status);
        if (proposal) params.append('proposal', proposal);
        if (objectName) params.append('object_name', objectName);
        if (dateBegin) params.append('date_range_begin', `${dateBegin}T${timeBegin ? timeBegin : '00:00:00'}`);
        if (dateEnd) params.append('date_range_end', `${dateEnd}T${timeEnd ? timeEnd : '00:00:00'}`);
        if (bandpassMin) params.append('bandpass_min', bandpassMin);
        if (bandpassMax) params.append('bandpass_max', bandpassMax);
        if (bandpassType) params.append('bandpass_type', bandpassType);
        if (coneSearchRa) params.append('cone_search_ra', coneSearchRa);
        if (coneSearchDec) params.append('cone_search_dec', coneSearchDec);
        if (coneSearchRadius) params.append('cone_search_radius', coneSearchRadius);
        if (type) params.append('type', type);
        if (depthValue) params.append('depth_value', depthValue);
        if (depthUnit) params.append('depth_unit', depthUnit);
        if (scheduleIds.length) params.append('schedule_ids', scheduleIds.toString());

        // scheduleIds.forEach((id) => params.append('schedule_ids', id));
        observatoryIds.forEach((id) => params.append('observatory_ids', id));
        telescopeIds.forEach((id) => params.append('telescope_ids', id));
        instrumentIds.forEach((id) => params.append('instrument_ids', id));

        // Add columns parameter
        const columnParam = selectedColumns.map((col) => col.id).join(',');
        if (columnParam) params.append('columns', columnParam);

        // Add sort parameters if sorting is applied
        if (sortColumn && sortDirection) {
            params.append('sort', sortColumn);
            params.append('order', sortDirection);
        }

        // Add page parameter
        params.append('page', '1'); // Reset to first page on new search

        await goto(`?${params.toString()}`, { noScroll: true, invalidateAll: true });
    }

    function handlePageChange(newPage: number) {
        const params = new URLSearchParams(page.url.searchParams);
        params.set('page', newPage.toString());
        return `?${params.toString()}`;
    }

    function handleRemoveSchedule(removeScheduleId: string) {
        scheduleIds = scheduleIds.filter((scheduleId: string) => scheduleId != removeScheduleId);
    }

    function handleAddSchedule(addScheduleId: string) {
        // prevent empty or duplicate additions
        if (addScheduleId != '' && !scheduleIds.includes(addScheduleId)) {
            // can't use array.push here because svelte wont detect reactivity via pointer assignment
            // must reassign for reactivity
            scheduleIds = [...scheduleIds, addScheduleId.trim()];
            // reset schedule input field
            scheduleId = '';
        }
    }

    function handleAddScheduleEnterKey(event: KeyboardEvent, addScheduleId: string) {
        if (event.key === 'Enter') {
            handleAddSchedule(addScheduleId);
        }
    }

    async function toggleSort(column) {
        if (sortColumn === column) {
            if (sortDirection === 'asc') {
                sortDirection = 'desc';
            } else if (sortDirection === 'desc') {
                sortColumn = '';
                sortDirection = 'asc';
            }
        } else {
            sortColumn = column;
            sortDirection = 'asc';
        }

        // Apply the sort
        await handleSearch();
    }

    async function saveColumnSelection() {
        selectedColumns = availableColumns.filter((col) => col.selected);
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

    function createPagesArray(currentPage: number, totalPages: number, numButtons: number) {
        let pagesBefore = Math.floor(numButtons / 2);
        let pagesAfter = Math.ceil(numButtons / 2);

        let start = currentPage - pagesBefore;
        if (start < 1) {
            start = 1;
        }
        let end = currentPage + pagesAfter;
        if (end > totalPages) {
            end = totalPages;
            pagesAfter = end - currentPage;
        }

        const length = Math.min(totalPages, pagesBefore + 1 + pagesAfter);

        return Array.from({ length: length }, (_, i) => start + i);
    }

    function deselectAccordion(currentFilterName: string) {
        if (selectedFilter == currentFilterName) {
            selectedFilter = '';
        }
    }

    function resetFilters() {
        externalId = '';
        scheduleId = '';
        scheduleIds = [];
        observatoryIds = [];
        telescopeIds = [];
        instrumentIds = [];
        status = '';
        proposal = '';
        objectName = '';
        dateBegin = '';
        timeBegin = '';
        dateEnd = '';
        timeEnd = '';
        bandpassMin = '';
        bandpassMax = '';
        bandpassType = '';
        bandpassUnit = '';
        coneSearchRa = '';
        coneSearchDec = '';
        coneSearchRadius = '';
        type = '';
        depthValue = '';
        depthUnit = '';
    }
</script>

<Page center={true}>
    <Section title="Browse Observations" icon="data">
        <div class="bg-base-200 p-4 mb-6 w-full">
            <div class="flex justify-between">
                <div class="text-carbon-90 text-2xl pb-4 opacity-80" title="All selected filters apply during search">Query Filters</div>
                <button class="btn btn-sm btn-primary text-md h-9" on:click={resetFilters}
                    ><div class="bx bx-refresh"></div>
                    Reset Filters</button
                >
            </div>
            <!-- <h2 class="font-bold mb-2"></h2> -->

            <!-- <div class="grid grid-cols-1 md:grid-cols-1 gap-4"> -->
            <!-- Accordion Join -->
            <div class="join join-vertical bg-base-100 w-full">
                <!-- Observation section -->
                <div class="collapse collapse-arrow join-item border-base-300 border">
                    <input
                        type="radio"
                        name="my-accordion"
                        value="observation"
                        on:click={() => {
                            deselectAccordion('observation');
                        }}
                        bind:group={selectedFilter}
                        checked={false}
                    />
                    <div
                        class="collapse-title font-semibold
                        {objectName || dateBegin || timeBegin || dateEnd || timeEnd || status || type ? 'text-nasa-blue-shade' : ''}"
                    >
                        <h3 class="text-lg mb-2">Observation Name / Date / Type</h3>
                        {#if selectedFilter != 'observation'}
                            <div class="opacity-60">
                                {#if objectName}
                                    <span class="font-thin">Object Name: </span><span>{objectName} </span>
                                {/if}
                                {#if dateBegin || timeBegin}
                                    <span class="font-thin">Date Begin: </span><span>{dateBegin} {timeBegin}</span>
                                {/if}
                                {#if dateEnd || timeEnd}
                                    <span class="font-thin">Date End: </span><span>{dateEnd} {timeEnd}</span>
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
                                        placeholder="e.g. GRW+70D5824"
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

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                            <div>
                                <label class="label text-lg" for="date-begin-input">
                                    <span class="label-text">Begin Date/Time</span>
                                </label>
                                <div class="grid grid-cols-2 space-x-2">
                                    <input id="date-begin-input" type="date" bind:value={dateBegin} class="input w-full" />
                                    <input id="time-begin-input" type="time" bind:value={timeBegin} class="input w-full" />
                                </div>
                            </div>
                            <div>
                                <label class="label text-lg" for="date-end-input">
                                    <span class="label-text">End Date/Time</span>
                                </label>
                                <div class="grid grid-cols-2 space-x-2">
                                    <input id="date-end-input" type="date" bind:value={dateEnd} class="input w-full" />
                                    <input id="time-end-input" type="time" bind:value={timeEnd} class="input w-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Coordinate Cone Search -->
                <div class="collapse collapse-arrow join-item border-base-300 border">
                    <input
                        type="radio"
                        name="my-accordion"
                        value="coordinate-search"
                        on:click={() => {
                            deselectAccordion('coordinate-search');
                        }}
                        bind:group={selectedFilter}
                        checked={false}
                    />
                    <div class="collapse-title font-semibold {coneSearchRa || coneSearchDec || coneSearchRadius ? 'text-nasa-blue-shade' : ''}">
                        <h3 class="text-lg mb-2">Coordinate Cone Search</h3>
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
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
                            <label class="input text-lg pe-0 w-full" for="ra-input">
                                RA:
                                <input
                                    id="ra-input"
                                    class="input validator input-bordered text-lg w-full"
                                    type="number"
                                    bind:value={coneSearchRa}
                                    placeholder="Right Ascension"
                                    min="0"
                                    max="360"
                                />
                            </label>

                            <label class="input text-lg pe-0 w-full" for="dec-input">
                                DEC:
                                <input
                                    id="dec-input"
                                    type="number"
                                    bind:value={coneSearchDec}
                                    placeholder="Declination"
                                    class="input input-bordered text-lg w-full"
                                />
                            </label>

                            <label class="input text-lg pe-0 w-full" for="radius-input">
                                Radius:
                                <input
                                    id="radius-input"
                                    type="number"
                                    bind:value={coneSearchRadius}
                                    placeholder="Search radius"
                                    class="input input-bordered text-lg w-full"
                                />
                            </label>
                        </div>
                    </div>
                </div>

                <!-- Energy Regime / Bandpass -->
                <div class="collapse collapse-arrow join-item border-base-300 border">
                    <input
                        type="radio"
                        name="my-accordion"
                        value="energy-regime"
                        on:click={() => {
                            deselectAccordion('energy-regime');
                        }}
                        bind:group={selectedFilter}
                        checked={false}
                    />
                    <div class="collapse-title font-semibold {bandpassType || bandpassMin || bandpassMax ? 'text-nasa-blue-shade' : ''}">
                        <h3 class="text-lg mb-2">Energy Regime / Bandpass</h3>
                        {#if selectedFilter != 'energy-regime'}
                            <div class="opacity-60">
                                {#if bandpassType}
                                    <span class="font-thin">Bandpass: </span><span>{bandpassType}</span>
                                {/if}
                                {#if bandpassMin && bandpassMax}
                                    <span>{bandpassMin} - {bandpassMax}</span>
                                {:else if bandpassMax}
                                    <span>{'< ' + bandpassMax}</span>
                                {:else if bandpassMin}
                                    <span>{'> ' + bandpassMin}</span>
                                {/if}

                                {#if bandpassUnit}
                                    <span>{bandpassUnit}</span>
                                {/if}
                            </div>
                        {/if}
                    </div>
                    <div class="collapse-content">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label class="label text-lg" for="bandpass-type-input">
                                    <span class="label-text">Bandpass Type</span>
                                </label>
                                <select id="bandpass-type-input" bind:value={bandpassType} class="select select-bordered text-lg w-full">
                                    <option value="">Select type</option>
                                    {#each bandpassTypeOptions as option}
                                        <option value={option}>{option}</option>
                                    {/each}
                                </select>
                            </div>

                            <div>
                                <label class="label text-lg" for="bandpass-type-input">
                                    <span class="label-text">{bandpassType ? bandpassType : 'Bandpass'} Unit</span>
                                </label>
                                <select
                                    id="bandpass-type-input"
                                    bind:value={bandpassUnit}
                                    class="select select-bordered text-lg {bandpassType ? '' : 'opacity-50'} w-full"
                                >
                                    <option class="opacity-50" value="">{bandpassType ? `Select ${bandpassType} unit` : '← Select Bandpass Type'}</option>
                                    {#if bandpassType}
                                        {#each bandpasssUnitOptions[bandpassType] as option}
                                            <option value={option}>{option}</option>
                                        {/each}
                                    {/if}
                                </select>
                            </div>

                            <label class="input text-lg w-full" for="badpass-min-input">
                                Min:
                                <input
                                    id="badpass-min-input"
                                    type="number"
                                    bind:value={bandpassMin}
                                    placeholder="Bandpass min"
                                    class="input input-bordered text-lg w-full"
                                    min="0"
                                />
                                {#if bandpassUnit}
                                    <span class="label">{bandpassUnit}</span>
                                {/if}
                            </label>

                            <label class="input text-lg w-full" for="bandpass-max-input">
                                Max:
                                <input
                                    id="bandpass-max-input"
                                    type="number"
                                    bind:value={bandpassMax}
                                    placeholder="Bandpass max"
                                    class="input input-bordered text-lg w-full"
                                    min="0"
                                />
                                {#if bandpassUnit}
                                    <span class="label">{bandpassUnit}</span>
                                {/if}
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
                        on:click={() => {
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
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                            <div class="form-control">
                                <label class="label text-lg" for="depth-unit-input">
                                    <span class="label-text">Depth Unit</span>
                                </label>
                                <select id="depth-unit-input" bind:value={depthUnit} class="select select-bordered text-lg w-full">
                                    <option value="">Select type</option>
                                    {#each depthUnitOptions as option}
                                        <option value={option}>{option}</option>
                                    {/each}
                                </select>
                            </div>

                            <div class="self-end">
                                <label class="input text-lg w-full">
                                    Depth Value:
                                    <input type="number" bind:value={depthValue} placeholder="Depth Value" class="input input-bordered text-lg w-full" />
                                    {#if depthUnit}
                                        <span class="label">{depthUnit}</span>
                                    {/if}
                                </label>
                                <div class="flex items-center"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Filter by Schedule -->
                <div class="collapse collapse-arrow join-item border-base-300 border">
                    <input
                        type="radio"
                        name="my-accordion"
                        value="filter-schedule"
                        on:click={() => {
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
                                    <span>{scheduleIds.length} </span><span class="font-thin">Schedule ID{scheduleIds.length > 1 ? 's' : ''} selected</span>
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
                                    on:keydown={(event) => handleAddScheduleEnterKey(event, scheduleId)}
                                    class="input validator input-bordered text-lg w-full"
                                    type="text"
                                    placeholder="UUID"
                                />
                                <button id="schedule-add" on:click={() => handleAddSchedule(scheduleId)} class="btn btn-info text-lg">Add Schedule ID</button>
                            </label>
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
                                                    <tr class="flex w-full">
                                                        <span class="w-full self-center">{id}</span>
                                                        <button class="btn btn-sm text-sm align-end" on:click={() => handleRemoveSchedule(id)}>Remove</button>
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
                <button class="btn btn-info text-lg" on:click={async () => await handleSearch()}>Search</button>
            </div>
        </div>
    </Section>
    <Section title="Observations" icon="globe" parentContainerClasses="lg:w-full lg:px-5">
        <!-- Pagination -->
        <div slot="buttons" class="flex space-x-2">
            <a data-sveltekit-preload-data="off" type="link" class="btn btn-sm" href={handlePageChange(1)}> &lt;&lt; </a>
            <a
                data-sveltekit-noscroll
                data-sveltekit-preload-data="off"
                type="link"
                class="btn btn-sm {currentPage == 1 ? 'disabled-link' : ''}"
                href={handlePageChange(currentPage - 1)}
            >
                &lt;
            </a>

            {#each createPagesArray(currentPage, totalPages, 4) as pageNumber}
                {#if pageNumber === currentPage}
                    <span class="btn btn-sm btn-active">
                        {currentPage}
                    </span>
                {:else}
                    <a data-sveltekit-noscroll data-sveltekit-preload-data="off" type="button" class="btn btn-sm" href={handlePageChange(pageNumber)}>
                        {pageNumber}
                    </a>
                {/if}
            {/each}

            <a
                data-sveltekit-noscroll
                data-sveltekit-preload-data="off"
                type="button"
                class="btn btn-sm {totalPages > currentPage ? '' : 'disabled-link'}"
                href={handlePageChange(currentPage + 1)}
            >
                &gt;
            </a>

            <a data-sveltekit-noscroll data-sveltekit-preload-data="off" type="button" class="btn btn-sm" href={handlePageChange(totalPages)}> &gt;&gt; </a>

            <button class="btn btn-sm btn-outline" on:click={() => (isCustomizeModalOpen = true)}>
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

        <!-- Column Customization Modal -->
        {#if isCustomizeModalOpen}
            <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div class="bg-base-100 p-6 w-full max-w-md">
                    <h3 class="text-lg font-bold mb-4">Customize Columns</h3>

                    <div class="max-h-60 overflow-y-auto mb-4">
                        {#each availableColumns as column}
                            <div class="form-control odd:bg-base-200">
                                <label class="label cursor-pointer flex justify-between">
                                    <span class="label-text ps-3">{column.label}</span>
                                    <input type="checkbox" bind:checked={column.selected} class="checkbox me-3" />
                                </label>
                            </div>
                        {/each}
                    </div>

                    <div class="flex justify-between">
                        <div>
                            <button class="btn btn-sm btn-outline mr-2" on:click={resetToDefaultColumns}> Default Columns </button>
                            <button class="btn btn-sm btn-outline" on:click={loadColumnsFromCookie}> Load My Columns </button>
                        </div>
                        <div>
                            <button class="btn btn-sm btn-ghost mr-2" on:click={() => (isCustomizeModalOpen = false)}> Cancel </button>
                            <button class="btn btn-sm btn-primary" on:click={saveColumnSelection}> Apply </button>
                        </div>
                    </div>
                </div>
            </div>
        {/if}

        <!-- Data Table -->
        <div id="data-table" class="overflow-x-auto overflow-y-scroll max-h-256 pe-0 pb-0">
            <table class="table table-pin-rows table-zebra w-full">
                <thead>
                    <tr class="bg-primary text-primary-content">
                        {#each selectedColumns as column}
                            <th class="max-w-70 cursor-pointer hover:bg-nasa-blue" on:click={() => toggleSort(column.id)}>
                                {column.label}
                                {#if sortColumn === column.id}
                                    {sortDirection === 'asc' ? '↑' : '↓'}
                                {/if}
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
                                                {obs.pointing_position?.ra}°
                                            </p>
                                        {:else if column.id === 'dec'}
                                            <p class="text-xs">
                                                {obs.pointing_position?.dec}°
                                            </p>
                                        {:else if column.id === 'target_id'}
                                            {obs.external_observation_id || '-'}
                                        {:else if column.id === 'exposure_time'}
                                            {obs.exposure_time?.toFixed(2) || '-'} s
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
    </Section>
</Page>

<style>
    .disabled-link {
        pointer-events: none;
        cursor: not-allowed;
    }

    /* remove ugly up/down arrows */
    input[type='number']::-webkit-inner-spin-button,
    input[type='number']::-webkit-outer-spin-button,
    input[type='number'] {
        appearance: textfield;
        -moz-appearance: textfield;
        -webkit-appearance: none;
    }

    #data-table {
        scrollbar-gutter: stable both-edges;
    }
</style>
