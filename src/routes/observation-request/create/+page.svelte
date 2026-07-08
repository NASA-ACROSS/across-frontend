<script lang="ts">
    import CoordinateSearch from '$lib/components/CoordinateSearch.svelte';
    import Fieldset from '$lib/components/Fieldset.svelte';
    import ObjectNameResolver from '$lib/components/ObjectNameResolver.svelte';
    import Page from '$lib/components/Page.svelte';
    import Section from '$lib/components/Section.svelte';
</script>

<Page title="Target of Opportunity Observation Request" icon="crosshair">
    <Section>
        <Fieldset title="Object Information">
            <CoordinateSearch></CoordinateSearch>
        </Fieldset>
    </Section>
</Page>
