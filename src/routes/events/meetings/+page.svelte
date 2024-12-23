<script lang="ts">
    import * as luxon from 'luxon';
    import Section from '$lib/components/Section.svelte';
    import Container from '$lib/components/Container.svelte';

    import conferences from './conferences.data';
    import EventCard from '$lib/components/EventCard.svelte';

    const isPast = (date: luxon.DateTime) => luxon.DateTime.now() > date;

    const pastConferences = conferences.filter((c) =>
        isPast(c.dateRange.begin)
    );

    const upcomingConferences = conferences.filter(
        (c) => !isPast(c.dateRange.begin)
    );
</script>

<Section title="Events" icon="calendar">
    <Container title="Upcoming"></Container>

    <Container title="Past">
        {#each conferences as conference}
            <EventCard {conference} />
        {/each}
    </Container>
</Section>
