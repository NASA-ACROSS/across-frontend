<script lang="ts">
    import LabeledValue from '$lib/components/LabeledValue.svelte';
    import Fieldset from '$lib/components/Fieldset.svelte';
    import Page from '$lib/components/Page.svelte';
    import Section from '$lib/components/Section.svelte';
    import type { Version } from '$lib/types/across/ObservationRequest';
    import type { Telescope } from '$lib/types/across/Telescope';
    import type { PageData } from './$types';
    import { prettyUTC } from '$lib/utils/datetime/prettyUTC';
    import { goto } from '$app/navigation';
    import { resolve } from '$app/paths';
    import Alert from '$lib/components/Alert.svelte';

    export let data: PageData;

    $: obsReq = data.observationRequest.items[0];
    $: versions = data.observationRequest.items[0].versions;

    $: instrumentId = obsReq.instrument_id;

    // remove instruments that were not selected from GET telescope response found by instrument_id
    $: [selectedTelescope] = data.telescopes.reduce((telescopes: Telescope[], currentTelescope: Telescope) => {
        currentTelescope.instruments = currentTelescope.instruments.filter((instrument) => instrument.id == instrumentId);
        telescopes.push(currentTelescope);

        return telescopes;
    }, [] as Telescope[]);

    let versionsById: Version[] | undefined;

    $: {
        versionsById = versions?.reduce((versions, currentVersion) => {
            // upcoming change to server will send version objects in this shape, using python snake case to reduce changes downstream later
            const simpleVersion = { id: currentVersion.id, created_on: currentVersion.created_on };
            versions.push(simpleVersion);
            return versions;
        }, [] as Version[]);

        // add the current version, can be removed when server sends current in versions list
        versionsById?.push({ id: obsReq.id, created_on: obsReq.created_on });

        // sort by created_on desc, can be removed when server sends versions in descending order
        versionsById?.sort((a, b) => (a.created_on > b.created_on ? -1 : 1));
    }

    // fallback for rendering the option list
    $: currentVersion = { id: obsReq.id, number: 1, created_on: obsReq.created_on };

    $: numberedVersions = versionsById?.map((version, index) => {
        version.number = versionsById!.length - index;
        return version;
    }) || [currentVersion];

    // set selected option to the current version
    $: selectedRevision = numberedVersions?.find((rev) => obsReq.id == rev.id) || currentVersion;

    $: newestRevision = numberedVersions[0];

    $: isOutdatedRevision = obsReq.id !== newestRevision.id;

    const navigateRevision = async (event: Event & { currentTarget: HTMLSelectElement }) => {
        console.log(event);
        if (selectedRevision) {
            goto(
                resolve('/observation-request/[observationRequestId]', {
                    observationRequestId: event.currentTarget.value,
                }),
                {
                    replaceState: true,
                    noScroll: true,
                }
            );
        }
    };
</script>

<Page title="Observation Request View" icon="crosshair">
    <div slot="buttons" class="flex flex-row gap-4">
        <a data-sveltekit-reload href={resolve('/observation-request/[observationRequestId]/edit', { observationRequestId: obsReq?.id })}>
            <button class="btn btn-{isOutdatedRevision ? 'warning' : 'info'} text-xl">
                <div class="bx bx-edit opacity-80" />
                Edit
            </button>
        </a>
        <select
            id="versions-option-input"
            value={selectedRevision.id}
            on:change={navigateRevision}
            class="select select-bordered text-lg w-full"
        >
            <option value="">Select Revision</option>
            {#each numberedVersions as option}
                <option value={option.id}>
                    {`Rev ${option.number} - ${prettyUTC(option.created_on)}`}
                </option>
            {/each}
        </select>
    </div>
    {#if isOutdatedRevision}
        <Alert type="warning">This is an older revision, select an updated revision in the drop down on the right.</Alert>
    {/if}
    <Section>
        <Fieldset title="Status">
            <div>
                <LabeledValue name="Status" value={obsReq?.status} />
                {#if obsReq?.status_reason}
                    <LabeledValue name="Status Reason" value={obsReq?.status_reason} />
                {/if}
            </div>
        </Fieldset>
        <Fieldset title="Object Information">
            <div>
                <LabeledValue name="Object Name" value={obsReq?.object_name} />
                <div class="flex flex-row w-full">
                    <LabeledValue name="RA" value={obsReq.object_coordinates.ra} />
                    <LabeledValue name="DEC" value={obsReq.object_coordinates.dec} />
                </div>
                {#if obsReq.object_position_error}
                    <LabeledValue name="Position Offset Degrees" value={obsReq.object_position_error} />
                {/if}
                <div class="flex flex-row w-full">
                    <LabeledValue name="Brightness" value={obsReq.object_brightness.value} />
                    <LabeledValue name="Brightness Unit" value={obsReq.object_brightness.unit} />
                </div>
            </div>
        </Fieldset>

        <Fieldset title="Observation Window">
            <div class="flex flex-row w-full">
                <LabeledValue name="Date Range Begin" value={prettyUTC(obsReq.observation_window.begin)} />
                {#if obsReq.observation_window.end}
                    <LabeledValue name="Date Range End" value={prettyUTC(obsReq.observation_window.end)} />
                {/if}
            </div>
        </Fieldset>

        <Fieldset title="Instrument Selection">
            <div>
                <LabeledValue name="Observatory" value={selectedTelescope.observatory.name} />
                <LabeledValue name="Telescope" value={selectedTelescope.name} />
                <LabeledValue name="Instrument" value={selectedTelescope.instruments[0].name} />
            </div>
        </Fieldset>

        <Fieldset title="Instrument Configuration">
            <LabeledValue name="Exposure Time Seconds" value={obsReq.exposure_time} />
        </Fieldset>

        {#if obsReq.proposal && obsReq.science_justification}
            <Fieldset title="Proposal Information">
                <div>
                    <LabeledValue name="Proposal Code" value={obsReq.proposal?.code} />
                    <LabeledValue name="Proposal Name" value={obsReq.proposal?.name} />

                    <LabeledValue name="Science Justification" value={obsReq.science_justification} />

                    <LabeledValue name="Anonymized" value={obsReq.anonymize} />
                </div>
            </Fieldset>

            <Fieldset title="Submission Information">
                <div>
                    <LabeledValue name="Submitted by" value={obsReq.created_by_id} />
                    <LabeledValue name="Submitted at" value={prettyUTC(obsReq.created_on)} />
                </div>
            </Fieldset>
        {/if}
    </Section>
</Page>
