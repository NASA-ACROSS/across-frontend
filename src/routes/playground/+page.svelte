<script lang="ts">
    import Section from '$lib/components/Section.svelte';
    import Page from '$lib/components/Page.svelte';
    import DateRangeInputExample from './_components/DateRangeInputExample.svelte';
    import Collapse from '$lib/components/Collapse.svelte';
    import ArrowButton from '$lib/components/ArrowButton.svelte';
    import { resolve } from '$app/paths';
    import MultiSelectExample from './_components/MultiSelectExample.svelte';
    import DialogExamples from './_components/DialogExamples.svelte';
</script>

<Page title="Component Playground" icon="component">
    <p class="text-lg text-gray-700">This page is only visible in local development mode.</p>

    <Section title="Arrow Button Link Component">
        <ArrowButton href={resolve('/playground/page')}>Playground Page Demo</ArrowButton>
    </Section>

    <Section title="MultiSelect Component">
        <MultiSelectExample />
    </Section>

    <Section title="DateRangeInput Component">
        <DateRangeInputExample />
    </Section>

    <Section title="Collapse Component">
        <Collapse open={false} arrow={true} backgroundColor="bg-carbon-10">
            <!-- Collapse title css class modification demo  -->
            <!-- "text-info" changes the title to blue       -->
            <!-- Alternately, use <Collapse title={myTitle}> -->
            <div slot="title" class="text-info">Collapse Title! Click me!</div>
            Lorem ipsum dolor sit amet....
        </Collapse>
    </Section>

    <Section title="Dialog Component">
        <DialogExamples />
    </Section>
</Page>
