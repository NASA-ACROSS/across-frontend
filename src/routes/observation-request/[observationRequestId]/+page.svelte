<script lang="ts">
    import DataItem from '$lib/components/DataItem.svelte';
    import Fieldset from '$lib/components/Fieldset.svelte';
    import Page from '$lib/components/Page.svelte';
    import Section from '$lib/components/Section.svelte';
    import type { ObservationRequest, Version } from '$lib/types/across/ObservationRequest';
    import type { Telescope } from '$lib/types/across/Telescope';
    import type { PageData } from './$types';
    import { page } from '$app/state';
    import { prettyUTC } from '$lib/utils/datetime/prettyUTC';

    export let data: PageData;

    const obsReq: ObservationRequest = data.observationRequest.items[0];
    const versions = data.observationRequest.items[0].versions;

    const instrumentId: string = obsReq.instrument_id;

    // remove instruments that were not selected from GET telescope response found by instrument_id
    const [selectedTelescope] = data.telescopes.reduce((telescopes: Telescope[], currentTelescope: Telescope) => {
        currentTelescope.instruments = currentTelescope.instruments.filter((instrument) => instrument.id == instrumentId);
        telescopes.push(currentTelescope);

        return telescopes;
    }, [] as Telescope[]);

    const versionsById = versions?.reduce((versions, currentVersion) => {
        // the upcoming change to server will send version objects in this shape, using python snake case to reduce changes downstream later
        const simpleVersion = { id: currentVersion.id, created_on: currentVersion.created_on };
        versions.push(simpleVersion);
        return versions;
    }, [] as Version[]);

    console.log('versions', versionsById);

    versionsById?.push({ id: obsReq.id, created_on: obsReq.created_on });

    console.log('versionsById', versionsById);

    // sort by created_on desc
    versionsById?.sort((a, b) => (a.created_on > b.created_on ? -1 : 1));

    console.log('sortedVersions', versionsById);

    const numberedVersions = versionsById?.map((version, index) => {
        version.number = versionsById.length - index;
        return version;
    });
    console.log(numberedVersions);
</script>

<Page title="Observation Request View" icon="crosshair">
    <Section>
        <Fieldset title="Object Information">
            <div>
                <DataItem name="Object Name" value={obsReq.object_name} />
                <div class="flex flex-row w-full">
                    <DataItem name="RA" value={obsReq.object_coordinates.ra} />
                    <DataItem name="DEC" value={obsReq.object_coordinates.dec} />
                </div>
                {#if obsReq.object_position_error}
                    <DataItem name="Position Offset Degrees" value={obsReq.object_position_error} />
                {/if}
                <div class="flex flex-row w-full">
                    <DataItem name="Brightness" value={obsReq.object_brightness.value} />
                    <DataItem name="Brightness Unit" value={obsReq.object_brightness.unit} />
                </div>
            </div>
        </Fieldset>

        <Fieldset title="Observation Window">
            <div class="flex flex-row w-full">
                <DataItem name="Date Range Begin" value={prettyUTC(obsReq.observation_window.begin)} />
                {#if obsReq.observation_window.end}
                    <DataItem name="Date Range End" value={prettyUTC(obsReq.observation_window.end)} />
                {/if}
            </div>
        </Fieldset>

        <Fieldset title="Instrument Selection">
            <div>
                <DataItem name="Observatory" value={selectedTelescope.observatory.name} />
                <DataItem name="Telescope" value={selectedTelescope.name} />
                <DataItem name="Instrument" value={selectedTelescope.instruments[0].name} />
            </div>
        </Fieldset>

        <Fieldset title="Instrument Configuration">
            <DataItem name="Exposure Time" value={obsReq.exposure_time} />
        </Fieldset>

        <Fieldset title="Proposal Information">
            <div>
                {#if obsReq.proposal}
                    <DataItem name="Proposal Code" value={obsReq.proposal?.code} />
                    <DataItem name="Proposal Name" value={obsReq.proposal?.name} />
                {/if}

                <DataItem name="Science Justification" value={obsReq.science_justification} />

                {#if obsReq.anonymize}
                    <DataItem name="Anonymized" value={obsReq.anonymize} />
                {/if}
            </div>
        </Fieldset>
    </Section>
</Page>
