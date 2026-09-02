<script lang="ts">
    import { resolve } from '$app/paths';
    import { PUBLIC_CONFIG } from '$config/config.public';
    import Alert from '$lib/components/Alert.svelte';
    import ArrowButton from '$lib/components/ArrowButton.svelte';
    import Collapse from '$lib/components/Collapse.svelte';
    import Page from '$lib/components/Page.svelte';
    import Section from '$lib/components/Section.svelte';

    let { data } = $props();

    const EXCLUDED_FILTER_PROPERTIES = ['reference_url'];

    let observatory = $state(data.observatory);
    let telescopes = data.telescopes;

    // sort the ephemeris_types for display in order of priority
    observatory.ephemeris_types = observatory.ephemeris_types.sort((a, b) => a.priority - b.priority);
</script>

<Page title="Observatory Metadata" icon="database">
    {#snippet alert()}
        <Alert>
            ACROSS supports a layered approach to metadata. Observatories have Telescopes which have Instruments.
            <a href={PUBLIC_CONFIG.DOCUMENTATION_URL} class="link font-normal">See documentation for more details.</a>
        </Alert>
    {/snippet}

    {#snippet buttons()}
        <div class="">
            <a data-sveltekit-preload-data="false" href={resolve('/observatories/')} class="btn btn-info text-xl">
                <i class="bx bx-arrow-out-left-square-half opacity-70 me-2"></i>Back to Index
            </a>
        </div>
    {/snippet}

    <Section icon={'satellite-dish'} title={`[${observatory.short_name}] ${observatory.name}`}>
        <pre class="text-lg text-carbon-50">{observatory.id}</pre>
        <pre class="text-lg">observatory type: {observatory.type}</pre>
        <pre class="text-lg">url: <a class="hover:underline decoration-dashed underline-offset-4" href={observatory.reference_url}
                >{observatory.reference_url}</a
            ></pre>

        <Collapse border={true}>
            {#snippet title()}Observatory Ephemeris Types{/snippet}
            <div class="flex flex-row gap-8">
                {#each observatory.ephemeris_types as ephemerisType}
                    <pre>{JSON.stringify(ephemerisType, null, 2)}</pre>
                {/each}
            </div>
        </Collapse>

        <Collapse backgroundColor="bg-carbon-10">
            {#snippet title()}
                <div class="text-2xl">
                    Telescopes ({telescopes.length})
                </div>
            {/snippet}
            <div class="bg-carbon-10">
                {#each telescopes as telescope}
                    <Collapse>
                        {#snippet title()}
                            <div>
                                <h1 class="text-2xl">{`[${telescope.short_name}] ${telescope.name}`}</h1>
                                <pre class="text-lg font-normal text-carbon-50">{telescope.id}</pre>
                            </div>
                        {/snippet}
                        <Collapse backgroundColor="bg-carbon-10">
                            {#snippet title()}
                                <div class="text-2xl">
                                    Instruments ({telescope.instruments.length})
                                </div>
                            {/snippet}
                            {#each telescope.instruments as instrument}
                                <Collapse>
                                    {#snippet title()}
                                        <div>
                                            <h1 class="text-2xl">{`[${instrument.short_name}] ${instrument.name}`}</h1>
                                            <pre class="text-lg font-normal text-carbon-50">{instrument.id}</pre>
                                        </div>
                                    {/snippet}
                                    <Collapse open={false} backgroundColor="bg-carbon-10">
                                        {#snippet title()}
                                            <div class="text-2xl">
                                                Filters ({instrument.filters.length})
                                            </div>
                                        {/snippet}
                                        <div class="overflow-y-scroll max-h-100 bg-carbon-10">
                                            {#each instrument.filters as filter}
                                                <!-- Filter Title -->
                                                <div class="text-lg bg-carbon-20 p-4">
                                                    {#if filter.reference_url}
                                                        <ArrowButton href={filter.reference_url} openInNewTab={true}
                                                            >{filter.name}</ArrowButton
                                                        >
                                                    {:else}
                                                        <div class="text-lg">{filter.name}</div>
                                                    {/if}
                                                </div>
                                                <!-- Filter Contents -->
                                                <div class="p-4 bg-secondary">
                                                    {#each Object.entries(filter) as filterProperty}
                                                        {#if !EXCLUDED_FILTER_PROPERTIES.includes(filterProperty[0])}
                                                            {@const isWavelength =
                                                                filterProperty[0].includes('wavelength') && filterProperty[1] != null}
                                                            <pre
                                                                class={filterProperty[1] == null
                                                                    ? 'text-carbon-30'
                                                                    : ''}>{filterProperty[0]}: {filterProperty[1]} {isWavelength
                                                                    ? 'Å'
                                                                    : ''}</pre>
                                                        {/if}
                                                    {/each}
                                                </div>
                                                {#if instrument.filters[instrument.filters.length - 1] !== filter}
                                                    <div class="divider"></div>
                                                {/if}
                                            {/each}
                                        </div>
                                    </Collapse>

                                    {#if instrument?.footprints.length}
                                        <Collapse open={false} backgroundColor="bg-carbon-10">
                                            {#snippet title()}
                                                <div class="text-2xl">Footprint</div>
                                            {/snippet}
                                            <div class="overflow-y-scroll max-h-100">
                                                <div class="p-4 bg-secondary">
                                                    <pre>{JSON.stringify(instrument.footprints, null, 2)}</pre>
                                                </div>
                                            </div>
                                        </Collapse>
                                    {/if}

                                    {#if instrument?.constraints?.length}
                                        <Collapse open={false} backgroundColor="bg-carbon-10">
                                            {#snippet title()}
                                                <div class="text-2xl">
                                                    Constraints ({instrument?.constraints?.length})
                                                </div>
                                            {/snippet}
                                            {#each instrument?.constraints as constraint}
                                                <div class="p-4 bg-secondary">
                                                    <pre>{JSON.stringify(constraint, null, 2)}</pre>
                                                </div>
                                            {/each}
                                        </Collapse>
                                    {/if}
                                </Collapse>
                            {/each}
                        </Collapse>
                    </Collapse>
                {/each}
            </div>
        </Collapse>
    </Section>
</Page>
