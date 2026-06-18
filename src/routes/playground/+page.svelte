<script lang="ts">
    import Section from '$lib/components/Section.svelte';
    import Page from '$lib/components/Page.svelte';
    import DateRangeInputExample from './_components/DateRangeInputExample.svelte';
    import Collapse from '$lib/components/Collapse.svelte';
    import ArrowButton from '$lib/components/ArrowButton.svelte';
    import { resolve } from '$app/paths';
    import MultiSelectExample from './_components/MultiSelectExample.svelte';
    import DialogExamples from './_components/DialogExamples.svelte';
    import logger from '$lib/logger';
    import { enhance } from '$app/forms';

    const logToBrowserConsole = () => {
        logger.info('Simple info message.');
        logger.warn('Simple warning message.');
        logger.error('Simple error message.');

        logger.info({ msg: 'Info log from client', foo: 'bar' });
        logger.warn({ msg: 'Warning log from client', foo: 'bar' });
        logger.error({ err: new Error('Test Error'), data: 'foo' });
    };
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

    <Section title="Logging">
        <p class="text-lg text-gray-700">Check the respective console for logs.</p>
        <div class="flex gap-2">
            <button class="btn btn-info btn-med text-white px-4 py-2" on:click={logToBrowserConsole}> Log Browser Messages </button>
            <form method="post" use:enhance action="?/logTest">
                <button type="submit" class="btn btn-info btn-med text-white px-4 py-2"> Log Server Messages </button>
            </form>
        </div>
    </Section>
</Page>
