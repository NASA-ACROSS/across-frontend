<script lang="ts">
    import Section from '$lib/components/Section.svelte';
    import Page from '$lib/components/Page.svelte';
    import DateRangeInputExample from './_components/DateRangeInputExample.svelte';
    import Collapse from '$lib/components/Collapse.svelte';
    import ArrowButton from '$lib/components/ArrowButton.svelte';
    import { resolve } from '$app/paths';
    import MultiSelectExample from './_components/MultiSelectExample.svelte';
    import DialogExamples from './_components/DialogExamples.svelte';
    import FormSubmitFeedback from '$lib/components/FormSubmitFeedback.svelte';
    import logger from '$lib/logger';
    import { enhance } from '$app/forms';
    import type { ActionData } from './$types';
    import ErrorHandling from './_components/ErrorHandling.svelte';

    interface Props {
        form: ActionData;
    }

    let { form }: Props = $props();

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
            <!-- Collapse title css class modification demo -->
            <!-- "text-info" changes the title to blue      -->
            <!-- For a plain title, use {#snippet title()}My Title{/snippet} -->
            {#snippet title()}
                <div class="text-info">Collapse Title! Click me!</div>
            {/snippet}
            Lorem ipsum dolor sit amet....
        </Collapse>
    </Section>

    <Section title="Dialog Component">
        <DialogExamples />
    </Section>

    <Section title="Logging">
        <p class="text-lg text-gray-700">Check the respective console for logs.</p>
        <div class="flex gap-2 items-center">
            <button class="btn btn-info btn-med text-white px-4 py-2" onclick={logToBrowserConsole}> Log Browser Messages </button>
            <form method="post" use:enhance action="?/logTest">
                <button type="submit" class="btn btn-info btn-med text-white px-4 py-2"> Log Server Messages </button>
            </form>
            <FormSubmitFeedback action="logTest" />
        </div>
    </Section>

    <Section title="FormSubmitFeedback Component">
        <p class="text-lg text-gray-700 mb-4">Select a feedback type and submit to see FormSubmitFeedback render the response.</p>
        <form method="post" use:enhance action="?/mockFormSubmitFeedback">
            <div class="flex gap-4 mb-4 w-fit font-bold">
                <label class="flex items-center gap-2 cursor-pointer">
                    <input class="radio radio-info" type="radio" name="feedbackType" value="success" checked />
                    <span class="text-info">Success</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                    <input class="radio radio-warning" type="radio" name="feedbackType" value="warning" />
                    <span class="text-warning">Warning</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                    <input class="radio radio-error" type="radio" name="feedbackType" value="error" />
                    <span class="text-error">Error</span>
                </label>
            </div>
            <div class="flex gap-2 items-center">
                <button type="submit" class="btn btn-info btn-med text-white px-4 py-2"> Submit </button>
                <FormSubmitFeedback action="mockFormSubmitFeedback" />
            </div>
        </form>
    </Section>

    <Section title="Error Handling">
        <ErrorHandling {form} />
    </Section>
</Page>
