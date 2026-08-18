<script lang="ts">
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    import { page } from '$app/state';
    import { afterNavigate, beforeNavigate, goto } from '$app/navigation';
    import Page from '$lib/components/Page.svelte';
    import Section from '$lib/components/Section.svelte';
    import ObservatoryTelescopeSelector from '$lib/components/ObservatoryTelescopeSelector.svelte';
    import DateRangeInput from '$lib/components/datetime/DateRangeInput.svelte';
    import Pagination from '$lib/components/Pagination.svelte';
    import ArrowButton from '$lib/components/ArrowButton.svelte';
    import type { TelescopeObservatory } from '$lib/types/across/TelescopeObservatory';
    import type { Telescope } from '$lib/types/across/Telescope';
    import logger from '$lib/logger';

    export let data;

    $: error = data.error;

    const DEFAULT_COLUMNS = ['observatory_telescope', 'name', 'date_begin', 'date_end', 'status', 'fidelity', 'number_of_observations'];
    const COOKIE_NAME = 'schedule_columns';
    const PAGINATION_BUTTONS = 4;

    // Schedule data and pagination
    $: schedules = data.schedules || [];
    $: currentPage = Number(data.currentPage) || 1;
    $: totalPages = data.totalPages || 1;
    $: telescopes = data.telescopes || [];
    $: totalCount = data.totalCount || 0;
    $: currentSearchParams = new URLSearchParams(page.url.searchParams);

    // Observatory/Telescope selector state
    $: observatories = telescopes
        .map((telescope) => telescope.observatory)
        .filter((value, index, self) => self.findIndex((obs) => obs.id === value.id) === index);

    let selectedObservatories: TelescopeObservatory[] = [];
    let selectedTelescopes: Telescope[] = [];

    // Query parameters
    let name = data.queryParams?.name || '';
    let status = data.queryParams?.status || '';
    let dateRangeBegin = data.queryParams?.date_range_begin || '';
    let dateRangeEnd = data.queryParams?.date_range_end || '';
    let fidelity = data.queryParams?.fidelity || '';
    let externalId = data.queryParams?.external_id || '';

    // Column customization
    $: availableColumns = [
        { id: 'observatory_telescope', label: 'Observatory/Telescope', selected: true },
        { id: 'name', label: 'Name', selected: true },
        { id: 'date_begin', label: 'Date Begin', selected: true },
        { id: 'date_end', label: 'Date End', selected: true },
        { id: 'status', label: 'Status', selected: true },
        { id: 'fidelity', label: 'Fidelity', selected: true },
        { id: 'number_of_observations', label: '# Observations', selected: true },
        { id: 'external_id', label: 'External ID', selected: false },
    ];

    $: selectedColumns = availableColumns.filter((col) => col.selected);

    let isCustomizeModalOpen = false;

    // Status options
    const statusOptions = ['planned', 'scheduled', 'unscheduled', 'performed', 'aborted'];
    const fidelityOptions = ['low', 'high'];

    $: selectedFilter = '';

    onMount(() => {
        if (data.urlColumns && data.urlColumns.length > 0) {
            updateColumnsFromUrlParams(data.urlColumns);
        } else {
            loadColumnsFromCookie();
        }

        if (selectedColumns.length === 0) {
            availableColumns = availableColumns.map((col) => {
                const isDefault = DEFAULT_COLUMNS.some((defCol) => defCol === col.id);
                return { ...col, selected: isDefault };
            });
        }

        // Populate observatory/telescope/instrument selection
        const telescopeIds = (data.queryParams?.telescope_ids as string[]) || ([] as string[]);
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

    function updateColumnsFromUrlParams(columnIds: string[]) {
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
                availableColumns = availableColumns.map((col) => {
                    col.selected = savedColumns.includes(col.id);
                    return col;
                });
                selectedColumns = availableColumns.filter((col) => col.selected);
            } catch (err) {
                logger.error({ msg: 'Failed to parse column cookie', err });
            }
        }
    }

    function saveColumnsToCookie() {
        if (!browser) return;

        const selectedColumnIds = availableColumns.filter((col) => col.selected).map((col) => col.id);

        const value = encodeURIComponent(JSON.stringify(selectedColumnIds));
        document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=31536000`;
    }

    function resetToDefaultColumns() {
        availableColumns = availableColumns.map((col) => {
            col.selected = DEFAULT_COLUMNS.includes(col.id);
            return col;
        });

        selectedColumns = availableColumns.filter((col) => col.selected);
    }

    $: dateBeginDisplay = dateRangeBegin ? dateRangeBegin.split('T')[0] : '';
    $: timeBeginDisplay = dateRangeBegin ? (dateRangeBegin.split('T')[1] ?? '') : '';
    $: dateEndDisplay = dateRangeEnd ? dateRangeEnd.split('T')[0] : '';
    $: timeEndDisplay = dateRangeEnd ? (dateRangeEnd.split('T')[1] ?? '') : '';

    async function handleSearch() {
        const params = new URLSearchParams();

        if (name) params.append('name', name);
        if (status) params.append('status', status);
        if (fidelity) params.append('fidelity', fidelity);
        if (externalId) params.append('external_id', externalId);
        if (dateRangeBegin) params.append('date_range_begin', dateRangeBegin);
        if (dateRangeEnd) params.append('date_range_end', dateRangeEnd);

        // Add observatory/telescope filters
        if (selectedObservatories.length) params.append('observatory_ids', selectedObservatories.map((obs) => obs.id).join(','));
        if (selectedTelescopes.length) params.append('telescope_ids', selectedTelescopes.map((tel) => tel.id).join(','));

        // Add columns parameter
        const columnParam = selectedColumns.map((col) => col.id).join(',');
        if (columnParam) params.append('columns', columnParam);

        // Reset to first page on new search
        params.append('page', '1');
        currentSearchParams = params;
        await goto(`?${params.toString()}`, { noScroll: true, invalidateAll: true });
    }

    async function saveColumnSelection() {
        saveColumnsToCookie();
        isCustomizeModalOpen = false;

        await handleSearch();
    }

    type ObservatoryTelescopeName = {
        observatoryName: string;
        telescopeName: string;
    };

    const getTelescope = (telescope_id: string | undefined): ObservatoryTelescopeName[] => {
        if (!telescope_id)
            return [
                {
                    observatoryName: 'unknown observatory',
                    telescopeName: 'unknown telescope',
                },
            ];

        const telescope = telescopes?.find((tel) => tel.id === telescope_id);

        if (telescope) {
            return [
                {
                    observatoryName: telescope.observatory.name,
                    telescopeName: telescope.name,
                },
            ];
        }

        return [
            {
                observatoryName: 'unknown observatory',
                telescopeName: 'unknown telescope',
            },
        ];
    };

    function deselectAccordion(currentFilterName: string) {
        if (selectedFilter == currentFilterName) {
            selectedFilter = '';
        }
    }

    async function resetFilters() {
        name = '';
        status = '';
        fidelity = '';
        externalId = '';
        dateRangeBegin = '';
        dateRangeEnd = '';
        selectedObservatories = [];
        selectedTelescopes = [];

        await handleSearch();
    }

    let isLoading = false;

    beforeNavigate(() => {
        isLoading = true;
    });

    afterNavigate(() => {
        isLoading = false;
    });
</script>

<Page title="Browse Schedules" icon="calendar">
    <Section>
        <div class="lg:w-5/6 xl:w-3/4 self-center">
            <p class="text-sm text-gray-500 mb-4 italic">
                Note: These results show the most up-to-date versions of schedules. To view all schedule history, visit the <a
                    href="/schedules/history"
                    class="link link-primary">/schedules/history</a
                > page (work in progress).
            </p>
            <div class="bg-base-200 p-4 mb-6 w-full">
                <div class="flex justify-between">
                    <div class="text-carbon-90 text-2xl pb-4 opacity-80" title="All selected filters apply during search">
                        Query Filters
                    </div>
                    <button class="btn btn-sm btn-primary text-md h-9" on:click={resetFilters}>
                        <div class="bx bx-refresh"></div>
                        Reset Filters
                    </button>
                </div>

                <div class="join join-vertical bg-base-100 w-full">
                    <!-- Observatory/Telescope Filter -->
                    <div class="collapse collapse-arrow join-item border-base-300 border">
                        <input
                            type="radio"
                            name="my-accordion"
                            value="observatory-telescope"
                            on:click={() => {
                                deselectAccordion('observatory-telescope');
                            }}
                            bind:group={selectedFilter}
                            checked={false}
                        />
                        <div
                            class="collapse-title font-semibold {selectedObservatories.length || selectedTelescopes.length
                                ? 'text-nasa-blue-shade'
                                : ''}"
                        >
                            <h3 class="text-lg mb-2">Observatory / Telescope</h3>
                            {#if selectedFilter != 'observatory-telescope'}
                                <div class="opacity-60">
                                    {#if selectedObservatories.length}
                                        <span class="font-thin">Observatories: </span><span>{selectedObservatories.length} </span>
                                    {/if}
                                    {#if selectedTelescopes.length}
                                        <span class="font-thin">Telescopes: </span><span>{selectedTelescopes.length} </span>
                                    {/if}
                                </div>
                            {/if}
                        </div>
                        <div class="collapse-content">
                            <div class="py-4 h-200 md:min-h-80 md:max-h-100">
                                <ObservatoryTelescopeSelector
                                    {observatories}
                                    {telescopes}
                                    bind:selectedObservatories
                                    bind:selectedTelescopes
                                />
                            </div>
                        </div>
                    </div>

                    <!-- Schedule section -->
                    <div class="collapse collapse-arrow join-item border-base-300 border">
                        <input
                            type="radio"
                            name="my-accordion"
                            value="schedule"
                            on:click={() => {
                                deselectAccordion('schedule');
                            }}
                            bind:group={selectedFilter}
                            checked={false}
                        />
                        <div
                            class="collapse-title font-semibold
                            {name || dateRangeBegin || dateRangeEnd || status || fidelity || externalId ? 'text-nasa-blue-shade' : ''}"
                        >
                            <h3 class="text-lg mb-2">Schedule Name / Date / Status / Fidelity / External ID</h3>
                            {#if selectedFilter != 'schedule'}
                                <div class="opacity-60">
                                    {#if name}
                                        <span class="font-thin">Name: </span><span>{name} </span>
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
                                    {#if fidelity}
                                        <span class="font-thin">Fidelity: </span><span>{fidelity}</span>
                                    {/if}
                                    {#if externalId}
                                        <span class="font-thin">External ID: </span><span>{externalId}</span>
                                    {/if}
                                </div>
                            {/if}
                        </div>
                        <div class="collapse-content">
                            <div class="grid grid-cols-1 md:grid-cols-4 gap-2 mb-4">
                                <div class="form-control">
                                    <label class="label text-lg" for="name-input">
                                        <span class="label-text">Schedule Name</span>
                                    </label>
                                    <div class="flex items-center">
                                        <input
                                            id="name-input"
                                            type="text"
                                            bind:value={name}
                                            placeholder="e.g. My Schedule"
                                            class="input input-bordered text-lg w-full"
                                        />
                                    </div>
                                </div>

                                <div class="form-control">
                                    <label class="label text-lg" for="schedule-status-input">
                                        <span class="label-text">Status</span>
                                    </label>
                                    <select id="schedule-status-input" bind:value={status} class="select select-bordered text-lg w-full">
                                        <option value="">Select status</option>
                                        {#each statusOptions as option}
                                            <option value={option}>{option}</option>
                                        {/each}
                                    </select>
                                </div>

                                <div class="form-control">
                                    <label class="label text-lg" for="fidelity-input">
                                        <span class="label-text">Fidelity</span>
                                    </label>
                                    <select id="fidelity-input" bind:value={fidelity} class="select select-bordered text-lg w-full">
                                        <option value="">Select fidelity</option>
                                        {#each fidelityOptions as option}
                                            <option value={option}>{option}</option>
                                        {/each}
                                    </select>
                                </div>

                                <div class="form-control">
                                    <label class="label text-lg" for="external-id-input">
                                        <span class="label-text">External ID</span>
                                    </label>
                                    <input
                                        id="external-id-input"
                                        type="text"
                                        bind:value={externalId}
                                        placeholder="e.g. EXT123"
                                        class="input input-bordered text-lg w-full"
                                    />
                                </div>
                            </div>

                            <DateRangeInput bind:dateRangeBegin bind:dateRangeEnd />
                        </div>
                    </div>
                </div>

                <div class="flex justify-end mt-4">
                    <p class="self-center pe-3 text-error {error ? '' : 'hidden'}">{error}</p>
                    <button class="btn btn-info text-lg" on:click={async () => await handleSearch()}>Search</button>
                </div>
            </div>
        </div>
    </Section>

    <Section id="schedules" title="Schedules (Total: {totalCount})" icon="calendar">
        <!-- Pagination -->
        <div slot="buttons" class="flex space-x-2">
            {#key currentPage}
                <Pagination {currentPage} {totalPages} searchParams={currentSearchParams} numButtons={PAGINATION_BUTTONS} />
            {/key}
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
            <div class="fixed inset-0 bg-transparent flex items-center justify-center z-50">
                <div class="bg-base-100 p-6 w-full max-w-md shadow-2xl">
                    <div class="text-lg font-bold mb-4 flex flex-row justify-between">
                        <h3 class="flex">Customize Columns</h3>
                        <button
                            class="justify-end btn btn-sm btn-primary max-h-8"
                            title="Close without saving selections to cookie"
                            on:click={() => (isCustomizeModalOpen = false)}>X</button
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
                            <button class="btn btn-sm btn-outline mr-2" on:click={resetToDefaultColumns}> Default Columns </button>
                            <button class="btn btn-sm btn-outline" on:click={loadColumnsFromCookie}> Load My Columns </button>
                        </div>
                        <div>
                            <button
                                class="btn btn-sm btn-primary"
                                on:click={saveColumnSelection}
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
                            </th>
                        {/each}
                        <th class="max-w-70 cursor-pointer hover:bg-nasa-blue">Observations</th>
                    </tr>
                </thead>
                <tbody>
                    {#if schedules.length === 0}
                        <tr data-testid="no-schedules-row">
                            <td colspan={selectedColumns.length + 1} class="text-center py-4">
                                No schedules found. Adjust your search criteria and try again.
                            </td>
                        </tr>
                    {:else}
                        {#each schedules as schedule}
                            <tr data-testid="schedule-row:{schedule.id}" class="hover:bg-base-200">
                                {#each selectedColumns as column}
                                    <td class="">
                                        {#if column.id === 'observatory_telescope'}
                                            {#each getTelescope(schedule?.telescope_id) as telescope_info}
                                                <p class="font-bold max-w-70 text-wrap">
                                                    {telescope_info?.observatoryName}
                                                </p>
                                                <p class="text-xs max-w-70 text-wrap">
                                                    {telescope_info?.telescopeName}
                                                </p>
                                            {/each}
                                        {:else if column.id === 'date_begin'}
                                            <p class="text-xs w-max">
                                                {new Date(schedule.date_range?.begin + 'Z').toISOString().slice(0, -5).replace('T', ' ')}
                                            </p>
                                        {:else if column.id === 'date_end'}
                                            <p class="text-xs w-max">
                                                {new Date(schedule.date_range?.end + 'Z').toISOString().slice(0, -5).replace('T', ' ')}
                                            </p>
                                        {:else if column.id === 'name'}
                                            {schedule.name || '-'}
                                        {:else if column.id === 'status'}
                                            {schedule.status || '-'}
                                        {:else if column.id === 'fidelity'}
                                            {schedule.fidelity || '-'}
                                        {:else if column.id === 'number_of_observations'}
                                            {schedule.observation_count || '-'}
                                        {:else if column.id === 'external_id'}
                                            {schedule.external_id || '-'}
                                        {:else}
                                            -
                                        {/if}
                                    </td>
                                {/each}
                                <td>
                                    <ArrowButton href="/observations?schedule_ids={schedule.id}" />
                                </td>
                            </tr>
                        {/each}
                    {/if}
                </tbody>
            </table>
        </div>
        <div class="flex ml-auto w-fit space-x-2 pt-4">
            <Pagination {currentPage} {totalPages} searchParams={currentSearchParams} numButtons={PAGINATION_BUTTONS} />

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
    </Section>
</Page>

<style>
    #data-table {
        scrollbar-gutter: stable;
    }
</style>
