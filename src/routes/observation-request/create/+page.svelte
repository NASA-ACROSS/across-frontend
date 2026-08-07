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

    //Object Information state
    let ra: number;
    let dec: number;

    // Observation Window state
    let dateRangeBegin: string, dateRangeEnd: string;

    // Observatory/Telescope/Instrument selector state
    let selectedObservatories: TelescopeObservatory[] = [];
    let selectedTelescopes: Telescope[] = [];
    let selectedInstruments: TelescopeInstrument[] = [];

    // Proposal Information state
    let proposalCode: string;
    let proposalName: string;
    let proposalJustification: string;
    let anonymize: boolean;
</script>

<Page title="Target of Opportunity Observation Request" icon="crosshair">
    <Section>
        <Fieldset title="Object Information">
            <CoordinateSearch bind:ra bind:dec />
        </Fieldset>

        <Fieldset title="Observation Window">
            <DateRangeInput bind:dateRangeBegin bind:dateRangeEnd />
        </Fieldset>

        <Fieldset title="Instrument Selection">
            <div class="h-200 md:min-h-80 md:max-h-100">
                <ObservatoryTelescopeInstrumentSelector
                    {telescopes}
                    bind:selectedObservatories
                    bind:selectedTelescopes
                    bind:selectedInstruments
                />
            </div>
        </Fieldset>

        <Fieldset title="Proposal Information">
            <ProposalInfoInput bind:proposalCode bind:proposalName bind:proposalJustification bind:anonymize />
        </Fieldset>

        <form method="post" use:enhance action="?/submitCreate">
            <div class="flex justify-end gap-2 items-center mt-4">
                {#if form?.created_id}
                    <Alert soft={false} type="success">Created new TOO: {form.created_id}</Alert>
                {/if}
                <FormSubmitFeedback action="submitCreate" />
                <button type="submit" class="btn btn-primary justify-end">Submit Demo Payload</button>
            </div>
        </form>
    </Section>
</Page>
