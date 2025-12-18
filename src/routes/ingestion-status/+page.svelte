<script lang="ts">
    import Page from '$lib/components/Page.svelte';
    import Section from '$lib/components/Section.svelte';
    import type { Observatory } from '$lib/types/across/Observatory';
    import type { TelescopeDict } from '$lib/types/across/Telescope';
    import { DateTime } from 'luxon';
    import type { PageData } from './$types';
    import { CronExpressionParser } from 'cron-parser';
    import cronstrue from 'cronstrue';
    import ScheduleStatusBadge from '$lib/components/ScheduleStatusBadge.svelte';

    export let data: PageData;
    $: telescopesDict = data.telescopesDict as TelescopeDict;
    $: observatories = data.observatories as Observatory[];

    $: utcNowFormatted = DateTime.utc().toString().replace('T', ' ').replace('Z', '').slice(0, -4);

    function getStatus(cron: string, latest_data_date?: string) {
        if (!latest_data_date || !cron) return 'offline';
        const previous_date = previousCronInterval(cron);
        if (previous_date && latest_data_date && latest_data_date < previous_date) return 'lagging';
        return 'active';
    }

    const statusColors = {
        active: 'badge-success',
        lagging: 'badge-warning',
        offline: 'badge-primary',
    };

    const nextCronInterval = (cron: string): string => {
        if (!cron) return '';
        const interval = CronExpressionParser.parse(cron);
        const next = interval.next().toISOString();

        return next || '';
    };

    const previousCronInterval = (cron: string): string => {
        if (!cron) return '';
        const interval = CronExpressionParser.parse(cron);
        const prev = interval.prev().toISOString();

        return prev || '';
    };

    const timeDifferenceNow = (time: string): string => {
        if (!time) return '';
        const luxonDate = DateTime.fromISO(time);
        const timeString = luxonDate
            .diffNow(['years', 'months', 'days', 'hours', 'minutes', 'seconds'], { conversionAccuracy: 'casual' })
            // @ts-ignore (showZeros is a valid argument but luxon is missing this type)
            .toHuman({ showZeros: false, maximumFractionDigits: 0 });
        return 'in ' + timeString;
    };

    const prettyUTC = (time: string | undefined) => {
        if (!time) return 'none';
        return time?.replace('T', ' ').replace('Z', '').slice(0, -4);
    };
</script>

<Page center={true}>
    <Section title="Observatory Data Ingestion Status" containerClasses={'w-full'} icon="globe">
        <div slot="buttons" class="text-xl">
            UTC: {utcNowFormatted}
        </div>
        <div class="flex flex-row gap-2 items-center mb-2">
            <div class={'badge badge-active h-10 w-30 p-4 text-nowrap text-xl ' + statusColors['active']}>active</div>
            <p>Newest schedule ends after last ingestion cycle</p>
        </div>
        <div class="flex flex-row gap-2 items-center mb-2">
            <div class={'badge badge-active h-10 w-30 p-4 text-nowrap text-xl ' + statusColors['lagging']}>lagging</div>
            <p>Data is present, newest schedule end date before last ingestion cycle</p>
        </div>
        <div class="flex flex-row gap-2 items-center mb-5">
            <div class={'badge badge-active h-10 w-30 p-4  text-nowrap text-xl ' + statusColors['offline']}>offline</div>
            <p>No schedule cadence configured or no data</p>
        </div>

        <div class="grid grid-cols-1 gap-6">
            {#each observatories as observatory}
                <div class="card bg-base-200">
                    <div class="card-body">
                        <h2 class="card-title">
                            <a href={observatory.reference_url}>{observatory.name}</a>
                            <span class="text-sm opacity-70 font-normal">({observatory.short_name})</span>
                        </h2>
                        <div class="divider my-1"></div>
                        <div class="text-xl mb-2">Telescopes</div>
                        <ul>
                            {#each observatory.telescopes as telescope}
                                <div class="flex flex-row justify-between mb-2">
                                    <div class="w-full">
                                        <li class="flex justify-between items-center bg-carbon-20 text-primary">
                                            <div class="w-full m-2">
                                                <div class="font-semibold">
                                                    {telescope.short_name}
                                                </div>
                                                <div class="text-xs opacity-70">
                                                    {telescope.name}
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            {#each telescopesDict[telescope.id].schedule_cadences as cadence}
                                                <div class="flex flex-row justify-between">
                                                    <div class="bg-base-100 p-2 mt-0 w-full">
                                                        <div class="mb-2">
                                                            <ScheduleStatusBadge status={cadence.schedule_status}></ScheduleStatusBadge>
                                                        </div>
                                                        <div class="text-xs opacity-70">
                                                            <pre>Schedule Cadence:    {cadence.cron || 'none'} ({cronstrue.toString(cadence.cron)})</pre>
                                                        </div>
                                                        <div class="text-xs opacity-70">
                                                            <pre class="font-bold">Next Ingestion at:   {prettyUTC(nextCronInterval(cadence.cron)) ||
                                                                    'none'} {timeDifferenceNow(nextCronInterval(cadence.cron))}</pre>
                                                        </div>
                                                        <div class="text-xs opacity-70">
                                                            <pre>Last Ingestion at:   {prettyUTC(previousCronInterval(cadence.cron)) || 'none'}</pre>
                                                        </div>
                                                        <div class="text-xs opacity-70">
                                                            <pre>Newest Schedule end: {prettyUTC(telescopesDict[telescope.id].latest_data_date)}</pre>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div
                                                            class={'badge badge-active h-full w-30 p-4 text-nowrap text-xl ' +
                                                                statusColors[getStatus(cadence.cron, telescopesDict[telescope.id].latest_data_date)]}
                                                        >
                                                            {getStatus(cadence.cron, telescopesDict[telescope.id].latest_data_date)}
                                                        </div>
                                                    </div>
                                                </div>
                                            {:else}
                                                <div class="flex flex-row justify-between">
                                                    <div class="bg-base-100 p-2 mt-0 w-full">
                                                        <pre class="font-sm">No schedule ingestion cadence configured, or source is disabled.</pre>
                                                    </div>
                                                    <div>
                                                        <div class={'badge badge-active h-full w-30 p-4 text-nowrap text-xl mb-2 ' + statusColors['offline']}>
                                                            offline
                                                        </div>
                                                    </div>
                                                </div>
                                            {/each}
                                        </li>
                                    </div>
                                </div>
                            {/each}
                        </ul>
                    </div>
                </div>
            {/each}
        </div>
    </Section>
</Page>
