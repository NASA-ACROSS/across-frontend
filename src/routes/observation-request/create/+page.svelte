<script lang="ts">
    import CoordinateSearch from '$lib/components/CoordinateSearch.svelte';
    import Fieldset from '$lib/components/Fieldset.svelte';
    import Page from '$lib/components/Page.svelte';
    import Section from '$lib/components/Section.svelte';
    import FormSubmitFeedback from '$lib/components/FormSubmitFeedback.svelte';
    import { enhance } from '$app/forms';
    import type { ActionData, PageData } from './$types';
    import Alert from '$lib/components/Alert.svelte';
    import ObservatoryTelescopeInstrumentSelector from '$lib/components/ObservatoryTelescopeInstrumentSelector.svelte';
    import type { TelescopeObservatory } from '$lib/types/across/TelescopeObservatory';
    import type { TelescopeInstrument } from '$lib/types/across/TelescopeInstrument';
    import type { Telescope } from '$lib/types/across/Telescope';
    import DateRangeInput from '$lib/components/datetime/DateRangeInput.svelte';
    import ProposalInfoInput from '../_components/ProposalInfoInput.svelte';

    export let form: ActionData;
    export let data: PageData;

    $: telescopes = data.telescopes || [];

    const brightnessUnitOptions = ['ab_mag', 'vega_mag', 'flux_erg', 'flux_jy'];

    //Object Information state
    let objectName: string;
    let ra: number;
    let dec: number;
    let positionOffset: number;
    let brightness: number;
    let brightnessUnit: string;

    // Observation Window state
    let dateRangeBegin: string, dateRangeEnd: string;

    // Observatory/Telescope/Instrument selector state
    // Only the first instrument in the list of selectedInstruments is sent to the server
    let selectedObservatories: TelescopeObservatory[] = [];
    let selectedTelescopes: Telescope[] = [];
    let selectedInstruments: TelescopeInstrument[] = [];

    // Proposal Information state
    let proposalCode: string;
    let proposalName: string;
    let justification: string;
    let anonymize: boolean;
</script>

<Page title="Target of Opportunity Observation Request" icon="crosshair">
    <form method="post" use:enhance action="?/submitCreate">
        <Section>
            <Fieldset title="Object Information">
                <CoordinateSearch bind:ra bind:dec bind:objectName required={true} />
                <label class="input text-lg pe-0 w-full" for="proposal-code-input">
                    Position offset:
                    <input
                        id="offset-input"
                        class="input validator input-bordered text-lg w-full"
                        type="number"
                        inputmode="decimal"
                        placeholder="decimal° (-90 to 90)"
                        min="-90"
                        max="90"
                        pattern="\d*"
                        bind:value={positionOffset}
                    />
                    <p class="hidden validator-hint mt-18" style="position: absolute;">Must be a number (-90 to 90)</p>
                </label>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 mb-4">
                    <div class="form-control">
                        <label class="label text-lg" for="brightness-unit-input">
                            <span class="label-text">Brightness</span>
                        </label>
                        <select
                            required
                            id="brightness-unit-input"
                            bind:value={brightnessUnit}
                            class="select select-bordered text-lg w-full"
                        >
                            <option value="">Select type</option>
                            {#each brightnessUnitOptions as option}
                                <option value={option}>{option}</option>
                            {/each}
                        </select>
                    </div>

                    <div class="self-end">
                        <label class="input text-lg w-full">
                            Brightness Value:
                            <input
                                required
                                id="brightness-value-input"
                                type="number"
                                inputmode="numeric"
                                pattern="\d*"
                                bind:value={brightness}
                                placeholder="decimal"
                                class="input validator input-bordered text-lg w-full"
                            />
                            {#if brightnessUnit}
                                <span class="label">{brightnessUnit}</span>
                            {/if}
                            <p class="hidden validator-hint mt-18" style="position: absolute;">Must be a number</p>
                        </label>
                        <div class="flex items-center"></div>
                    </div>
                </div>
            </Fieldset>

            <Fieldset title="Observation Window">
                <DateRangeInput bind:dateRangeBegin bind:dateRangeEnd requiredBegin={true} />
            </Fieldset>

            <Fieldset title="Instrument Selection">
                <div class="h-fit gap-1 max-h-200 md:max-h-100">
                    {#if !telescopes?.length}
                        <Alert type="error">No instruments are currently accepting requests at this time.</Alert>
                    {:else}
                        {#if selectedInstruments.length != 1}
                            <Alert type={selectedInstruments.length < 1 ? 'info' : 'error'}>Please select a single instrument.</Alert>
                        {/if}
                        <ObservatoryTelescopeInstrumentSelector
                            {telescopes}
                            bind:selectedObservatories
                            bind:selectedTelescopes
                            bind:selectedInstruments
                        />
                    {/if}
                </div>
            </Fieldset>

            <Fieldset title="Proposal Information">
                <ProposalInfoInput bind:proposalCode bind:proposalName bind:justification bind:anonymize />
            </Fieldset>

            <div class="flex justify-end gap-2 items-center mt-4">
                {#if form?.created_id}
                    <Alert soft={false} type="success">Created new TOO: {form.created_id}</Alert>
                {/if}
                <FormSubmitFeedback action="submitCreate" />

                <input type="hidden" name="objectName" value={objectName?.trim()} />
                <input type="hidden" name="ra" value={ra} />
                <input type="hidden" name="dec" value={dec} />
                <input type="hidden" name="positionOffset" value={positionOffset} />
                <input type="hidden" name="brightness" value={brightness} />
                <input type="hidden" name="brightnessUnit" value={brightnessUnit?.trim()} />
                <input type="hidden" name="positionOffset" value={positionOffset} />
                <input type="hidden" name="dateRangeBegin" value={dateRangeBegin} />
                <input type="hidden" name="dateRangeEnd" value={dateRangeEnd} />
                <input type="hidden" name="instrumentId" value={selectedInstruments[0]?.id} />
                <input type="hidden" name="proposalCode" value={proposalCode?.trim()} />
                <input type="hidden" name="proposalName" value={proposalName?.trim()} />
                <input type="hidden" name="justification" value={justification?.trim()} />
                <input type="hidden" name="anonymize" value={anonymize} />

                <button type="submit" class="btn btn-primary justify-end">Submit Observation Request</button>
            </div>
        </Section>
    </form>
</Page>
