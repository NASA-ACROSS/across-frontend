<script lang="ts">
    import { resolve } from '$app/paths';
    import { PUBLIC_CONFIG } from '$config/config.public';
    import Alert from '$lib/components/Alert.svelte';
    import ArrowButton from '$lib/components/ArrowButton.svelte';
    import Collapse from '$lib/components/Collapse.svelte';
    import Page from '$lib/components/Page.svelte';
    import Section from '$lib/components/Section.svelte';

    export let data;

    const EXCLUDED_FILTER_PROPERTIES = ['reference_url'];

    let observatory = data.observatory;
    let telescopes = data.telescopes;
    // sort the ephemeris_types for display in order of priority
    observatory.ephemeris_types = observatory.ephemeris_types.sort((a, b) => a.priority - b.priority);
</script>

<Page center={true}>
    <Alert>
        ACROSS supports a layered approach to metadata: Observatories have Telescopes which have Instruments. <a
            href={PUBLIC_CONFIG.DOCUMENTATION_URL}
            class="link font-normal">See documentation for more details.</a
        >
    </Alert>

    <Section icon={'satellite-dish'} title={`[${observatory.short_name}] ${observatory.name}`} parentContainerClasses="mb-10">
        <div slot="buttons" class="">
            <a data-sveltekit-preload-data="false" href={resolve('/observatories/')} class="btn btn-info text-xl">
                <i class="bx bx-arrow-out-left-square-half opacity-70 me-2"></i>Back to Index
            </a>
        </div>

        <pre class="text-lg text-carbon-50">{observatory.id}</pre>
        <pre class="text-lg">observatory type: {observatory.type}</pre>
        <pre class="text-lg">url: <a class="hover:underline decoration-dashed underline-offset-4" href={observatory.reference_url}
                >{observatory.reference_url}</a
            ></pre>

        <Collapse title="Observatory Ephemeris Types" contentClasses="flex flex-row gap-8">
            {#each observatory.ephemeris_types as ephemerisType}
                <pre>{JSON.stringify(ephemerisType, null, 2)}</pre>
            {/each}
        </Collapse>

        <Collapse title="Telescopes ({telescopes.length})" titleClasses="text-2xl bg-carbon-10" contentClasses="bg-carbon-10">
            {#each telescopes as telescope}
                <Collapse>
                    <div slot="title">
                        <h1 class="text-2xl">{`[${telescope.short_name}] ${telescope.name}`}</h1>
                        <pre class="text-lg font-normal text-carbon-50">{telescope.id}</pre>
                    </div>
                    <Collapse title="Instruments ({telescope.instruments.length})" titleClasses="text-2xl bg-carbon-10" contentClasses="bg-carbon-10">
                        {#each telescope.instruments as instrument}
                            <Collapse>
                                <div slot="title">
                                    <h1 class="text-2xl">{`[${instrument.short_name}] ${instrument.name}`}</h1>
                                    <pre class="text-lg font-normal text-carbon-50">{instrument.id}</pre>
                                </div>
                                <Collapse
                                    open={false}
                                    title="Filters ({instrument.filters.length})"
                                    titleClasses="text-2xl bg-carbon-10"
                                    contentClasses="bg-carbon-10"
                                >
                                    <div class="overflow-y-scroll max-h-100 border border-carbon-20 bg-carbon-10">
                                        {#each instrument.filters as filter}
                                            <!-- Filter Title -->
                                            <div class="text-lg bg-carbon-20 p-4">
                                                {#if filter.reference_url}
                                                    <ArrowButton href={filter.reference_url}>{filter.name}</ArrowButton>
                                                {:else}
                                                    <div class="text-lg">{filter.name}</div>
                                                {/if}
                                            </div>
                                            <!-- Filter Contents -->
                                            <div class="p-4 bg-secondary">
                                                {#each Object.entries(filter) as filterProperty}
                                                    {#if !EXCLUDED_FILTER_PROPERTIES.includes(filterProperty[0])}
                                                        <pre
                                                            class={filterProperty[1] == null
                                                                ? 'text-carbon-30'
                                                                : ''}>{filterProperty[0]}: {filterProperty[1]}</pre>
                                                    {/if}
                                                {/each}
                                            </div>
                                            {#if instrument.filters[instrument.filters.length - 1] !== filter}
                                                <div class="divider"></div>
                                            {/if}
                                        {/each}
                                    </div>
                                </Collapse>

                                <Collapse
                                    title="Footprints ({instrument.footprints.length})"
                                    open={false}
                                    titleClasses="text-2xl bg-carbon-10"
                                    contentClasses="bg-carbon-10"
                                >
                                    <div class="overflow-y-scroll max-h-100 border border-carbon-20">
                                        {#each instrument.footprints as footprint}
                                            <div class="p-4 bg-secondary">
                                                <pre>{JSON.stringify(footprint, null, 2)}</pre>
                                            </div>
                                            {#if instrument.footprints[instrument.footprints.length - 1] !== footprint}
                                                <div class="divider"></div>
                                            {/if}
                                        {/each}
                                    </div>
                                </Collapse>

                                {#if instrument?.constraints}
                                    <Collapse
                                        title="Constraints ({instrument?.constraints})"
                                        open={false}
                                        titleClasses="text-2xl bg-carbon-10"
                                        contentClasses="bg-carbon-10"
                                    >
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
        </Collapse>
    </Section>
</Page>
