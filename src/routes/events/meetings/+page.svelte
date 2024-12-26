<script lang="ts">
    import { DateTime } from 'luxon';
    import Section from '$lib/components/Section.svelte';
    import Container from '$lib/components/Container.svelte';

    import conferences from './conferences.data';
    import Card from '$lib/components/card/Card.svelte';
    import Badge from '$lib/components/badge/Badge.svelte';
    import type { CardData } from '$lib/types/Card';
    import type { Conference } from '$lib/types';
    import { BadgeType } from '$lib/types/BadgeType';

    const isPast = (date?: DateTime) => Boolean(date && DateTime.now() > date);

    const formatDate = (date?: DateTime) => date?.toFormat('LLL dd, yyyy');

    const toCardData = (
        conference: Omit<
            Conference,
            'registrationDeadline' | 'abstractDeadline'
        >
    ): CardData => {
        const dateStr = conference.dateRange
            ? [conference.dateRange.begin, conference.dateRange.end]
                  .map((d) => formatDate(d))
                  .join(' - ')
            : 'TBD';

        return {
            title: conference.name,
            subtitle: conference.description,
            url: conference.url,
            date: dateStr,
            tag: conference.location,
        };
    };

    const hydrateDeadline = (deadline?: DateTime) => ({
        date: formatDate(deadline) || 'TBD',
        badge: deadline && getBadgeType(deadline),
    });

    const getBadgeType = (date?: DateTime) => {
        if (!date) return BadgeType.INFO;

        const now = DateTime.now();

        const isWithinTwoWeeks = date.diff(now, 'days').days <= 14;
        const isWithin30Days = date.diff(now, 'days').days <= 30;

        if (isWithinTwoWeeks) return BadgeType.ALERT;
        if (isWithin30Days) return BadgeType.WARN;

        return BadgeType.INFO;
    };

    const pastConferences = conferences.filter((c) =>
        isPast(c.dateRange?.begin)
    );

    const upcomingConferences = conferences
        .filter((c) => !isPast(c.dateRange?.begin))
        .map((c) => ({
            ...c,
            registrationDeadline: hydrateDeadline(c.registrationDeadline),
            abstractDeadline: hydrateDeadline(c.abstractDeadline),
        }));
</script>

<Section title="Meetings">
    <Container title="Upcoming">
        {#if upcomingConferences.length === 0}
            <p>No upcoming conferences</p>
        {:else}
            {#each upcomingConferences as conference (conference.name)}
                <Card data={toCardData(conference)}>
                    <div slot="footer">
                        {#if conference.registrationDeadline.date}
                            <Badge type={conference.registrationDeadline.badge}>
                                <span class="fw-bold">Registration:</span>
                                {conference.registrationDeadline.date}
                            </Badge>
                        {/if}
                        {#if conference.abstractDeadline.date}
                            <Badge type={conference.abstractDeadline.badge}>
                                <span class="fw-bold">Abstract:</span>
                                {conference.abstractDeadline.date}
                            </Badge>
                        {/if}
                    </div>
                </Card>
            {/each}
        {/if}
    </Container>

    <Container title="Past">
        {#if pastConferences.length === 0}
            <p>No past conferences</p>
        {:else}
            {#each pastConferences as conference (conference.name)}
                <Card data={toCardData(conference)} />
            {/each}
        {/if}
    </Container>
</Section>
