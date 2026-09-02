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
    import UnitValueInput from '$lib/components/inputs/UnitValueInput.svelte';

    interface Props {
        form: ActionData;
        data: PageData;
    }

    let { form, data }: Props = $props();

    let telescopes = $derived(data.telescopes || []);

    let disableSubmit = $derived(!telescopes || telescopes.length == 0);

    const brightnessUnitOptions = ['ab_mag', 'vega_mag', 'flux_erg', 'flux_jy'];

    // Svelte 5 migration (B9): these were all declared as `let x: T = $state()` -- a
    // non-optional type with no initialiser, which svelte-check 4 rejects because
    // `$state()` is `undefined` until assigned. Each is widened to match the prop type of
    // the child component it binds into (CoordinateSearch, DateRangeInput and
    // UnitValueInput all accept undefined), and the template already guarded with
    // `objectName?.trim()`.
    //Object Information state
    let objectName: string | undefined = $state();
    let ra: number | undefined = $state();
    let dec: number | undefined = $state();
    let positionOffset: number | undefined = $state();
    let brightness: number | undefined = $state();
    let brightnessUnit: string | undefined = $state();

    // Observation Window state
    let dateRangeBegin: string | undefined = $state();
    let dateRangeEnd: string | undefined = $state();

    // Observatory/Telescope/Instrument selector state
    // Only the first instrument in the list of selectedInstruments is sent to the server
    let selectedObservatories: TelescopeObservatory[] = $state([]);
    let selectedTelescopes: Telescope[] = $state([]);
    let selectedInstruments: TelescopeInstrument[] = $state([]);

    // Instrument Configuration state
    let exposureTimeSeconds: number | undefined = $state();

    // Proposal Information state
    // ProposalInfoInput declares these props as non-optional, so seed them
    // rather than widening to `| undefined`.
    let proposalCode = $state('');
    let proposalName = $state('');
    let justification = $state('');
    let anonymize = $state(false);
</script>

<Page title="Target of Opportunity Observation Request" icon="crosshair">
    <form method="post" use:enhance action="?/submitCreate">
        <Section>
            <Fieldset title="Object Information">
                <CoordinateSearch bind:ra bind:dec bind:objectName required={true} />
                <label class="input text-lg pe-0 w-full mb-4" for="offset-input">
                    Position offset:
                    <input
                        id="offset-input"
                        class="input validator input-bordered text-lg w-full"
                        type="number"
                        step="any"
                        placeholder="decimal° (-90 to 90)"
                        min="-90"
                        max="90"
                        bind:value={positionOffset}
                    />
                    <p class="hidden validator-hint mt-18" style="position: absolute;">Must be a number (-90 to 90)</p>
                </label>
                <UnitValueInput
                    id="brightness"
                    displayName="Brightness"
                    required={true}
                    bind:unit={brightnessUnit}
                    bind:value={brightness}
                    unitOptions={brightnessUnitOptions}
                />
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

            <Fieldset title="Instrument Configuration">
                <UnitValueInput
                    required={true}
                    id="exposure-time-value-input"
                    displayName="Exposure Time"
                    bind:value={exposureTimeSeconds}
                    unit="seconds"
                    placeholder="decimal"
                    min={0.00000001}
                    validationRejectionText="Must be a number greater than zero"
                />
            </Fieldset>

            <Fieldset title="Proposal Information">
                <ProposalInfoInput bind:proposalCode bind:proposalName bind:justification bind:anonymize />
            </Fieldset>

            <div class="flex justify-end gap-2 items-center mt-4">
                {#if form?.createdId}
                    <Alert soft={false} type="success">Created new Observation Request: {form.createdId}</Alert>
                {/if}
                <FormSubmitFeedback action="submitCreate" />

                <input type="hidden" name="objectName" value={objectName?.trim()} />
                <input type="hidden" name="ra" value={ra} />
                <input type="hidden" name="dec" value={dec} />
                <input type="hidden" name="positionOffset" value={positionOffset} />
                <input type="hidden" name="brightness" value={brightness} />
                <input type="hidden" name="exposureTimeSeconds" value={exposureTimeSeconds} />
                <input type="hidden" name="brightnessUnit" value={brightnessUnit?.trim()} />
                <input type="hidden" name="dateRangeBegin" value={dateRangeBegin} />
                <input type="hidden" name="dateRangeEnd" value={dateRangeEnd} />
                <input type="hidden" name="instrumentId" value={selectedInstruments[0]?.id} />
                <input type="hidden" name="proposalCode" value={proposalCode?.trim()} />
                <input type="hidden" name="proposalName" value={proposalName?.trim()} />
                <input type="hidden" name="justification" value={justification?.trim()} />
                <input type="hidden" name="anonymize" value={anonymize} />

                <button type="submit" disabled={disableSubmit} class="btn btn-lg btn-info justify-end">Submit Observation Request</button>
            </div>
        </Section>
    </form>
</Page>
