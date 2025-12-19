<script lang="ts">
    import Section from '$lib/components/Section.svelte';
    import Page from '$lib/components/Page.svelte';
    import type { PageData } from './$types';
    import type { Telescope } from '$lib/types/across/Telescope';

    export let data: PageData;
    $: telescopes = data.telescopes as Telescope[];

    let selectedTelescopeName: string = 'Select a telescope';

    $: selectedTelescope = telescopes?.find((telescope) => telescope.name === selectedTelescopeName) as Telescope;
</script>

<Page>
    <Section title="Schedules" icon="calendar">
        <fieldset class="fieldset">
            <legend class="fieldset-legend">Telescopes</legend>
            <select class="select" bind:value={selectedTelescopeName}>
                <option disabled selected>Select a telescope</option>
                {#each telescopes as telescope}
                    <option>{telescope.name}</option>
                {/each}
            </select>
        </fieldset>
        {#if selectedTelescope}
            <h1 class="text-2xl">
                {JSON.stringify(selectedTelescope, null, 2)}
            </h1>
        {/if}
    </Section>
</Page>
