<script lang="ts">
    import Page from '$lib/components/Page.svelte';
    import Section from '$lib/components/Section.svelte';
    import ObjectNameResolver from '$lib/components/ObjectNameResolver.svelte';
    import ObservatoryTelescopeInstrumentSelector from '$lib/components/ObservatoryTelescopeInstrumentSelector.svelte';
    import type { TelescopeObservatory } from '$lib/types/across/TelescopeObservatory';
    import type { Telescope } from '$lib/types/across/Telescope';
    import type { TelescopeInstrument } from '$lib/types/across/TelescopeInstrument';

    export let data;

    $: telescopes = data.telescopes || [];

    // Observatory/Telescope/Instrument selector state
    $: observatories = telescopes
        .map((telescope) => telescope.observatory)
        .filter((value, index, self) => self.findIndex((obs) => obs.id === value.id) === index);
    $: instruments = telescopes
        .flatMap((telescope) => telescope.instruments || [])
        .filter((value, index, self) => self.findIndex((inst) => inst.id === value.id) === index);

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
    let hires = false;
    let min_visibility_duration = '';

    function calculateVisibility() {
        // TODO: Implement visibility calculation logic
        console.log('Calculate Visibility:', {
            observatories: selectedObservatories,
            telescopes: selectedTelescopes,
            instruments: selectedInstruments,
            ra,
            dec,
            dateBegin,
            timeBegin,
            dateEnd,
            timeEnd,
            hires,
            min_visibility_duration,
        });
    }

    function resetFilters() {
        selectedObservatories = [];
        selectedTelescopes = [];
        selectedInstruments = [];
        ra = '';
        dec = '';
        dateBegin = '';
        timeBegin = '';
        dateEnd = '';
        timeEnd = '';
        hires = false;
        minvis_duration = '';
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
                <ObjectNameResolver bind:ra bind:dec />

                <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                    <label class="input text-lg pe-0 w-full" for="ra-input">
                        RA:
                        <input
                            id="ra-input"
                            class="input validator input-bordered text-lg w-full"
                            type="number"
                            inputmode="decimal"
                            step="any"
                            bind:value={ra}
                            placeholder="decimal° (0-359.999)"
                            min="0"
                            max="359.99999999"
                        />
                        <p class="hidden validator-hint mt-18" style="position: absolute;">Must be a number (0 to 359.99999999)</p>
                    </label>

                    <label class="input text-lg pe-0 w-full" for="dec-input">
                        DEC:
                        <input
                            id="dec-input"
                            type="number"
                            inputmode="decimal"
                            step="any"
                            bind:value={dec}
                            placeholder="decimal° (-90 to 90)"
                            min="-90"
                            max="90"
                            class="input validator input-bordered text-lg w-full"
                        />
                        <p class="hidden validator-hint mt-18" style="position: absolute;">Must be a number (-90 to 90)</p>
                    </label>
                </div>
            </div>

            <div class="bg-base-100 p-4 mb-4">
                <h3 class="text-lg font-semibold mb-4">Date Range</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                    <div>
                        <label class="label text-lg" for="date-begin-input">
                            <span class="label-text">Begin Date/Time</span>
                        </label>
                        <div class="grid grid-cols-2 space-x-2">
                            <input id="date-begin-input" type="date" bind:value={dateBegin} class="input w-full text-primary" />
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

            <div class="bg-base-100 p-4 mb-4">
                <h3 class="text-lg font-semibold mb-4">Optional Parameters</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="form-control">
                        <label class="label cursor-pointer justify-start gap-4">
                            <input id="hires-input" type="checkbox" bind:checked={hires} class="checkbox checkbox-primary" />
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
                <button class="btn btn-primary text-lg" on:click={calculateVisibility}>Calculate Visibility</button>
            </div>
        </div>
    </Section>
</Page>

<style>
    #date-begin-input::-webkit-calendar-picker-indicator,
    #date-end-input::-webkit-calendar-picker-indicator,
    #time-begin-input::-webkit-calendar-picker-indicator,
    #time-end-input::-webkit-calendar-picker-indicator {
        filter: invert();
    }
</style>
