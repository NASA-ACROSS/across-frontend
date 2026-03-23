<script lang="ts">
    import { resolve } from '$app/paths';
    import ArrowButton from '$lib/components/ArrowButton.svelte';
    import Page from '$lib/components/Page.svelte';
    import Section from '$lib/components/Section.svelte';

    export let data;

    let observatories = data.observatories;
</script>

<Page showInfo={true} showMenu={true} title="Observatories" icon="satellite-dish">
    <Section>
        <div class="flex flex-col ps-4 pe-4">
            {#each observatories as observatory}
                <ArrowButton href={resolve('/observatories/[observatoryShortName]', { observatoryShortName: observatory.short_name })}>
                    <div class="grid grid-cols-3 gap-4 text-left w-xl lg:w-3xl">
                        <div class="font-bold col-start-1 col-end-1">{observatory.short_name}</div>
                        <div class="col-start-2 col-span-2">{observatory.name}</div>
                    </div>
                </ArrowButton>
            {/each}
        </div>
    </Section>
</Page>
