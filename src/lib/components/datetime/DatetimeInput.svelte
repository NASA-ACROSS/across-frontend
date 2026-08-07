<script lang="ts">
    import { DateTime } from 'luxon';

    export let datetimeInput: string = '';
    export let label = 'Date/Time';

    const splitDateTime = (dateStr: string = '') => {
        const dt = DateTime.fromISO(dateStr, { zone: 'utc' });
        if (!dt.isValid) return { date: '', time: '' };

        return {
            date: dt.toISODate() ?? '',
            time: dt.toISOTime({ includeOffset: false, suppressMilliseconds: true }) ?? '',
        };
    };

    const joinDateTime = (date: string, time: string) => {
        if (!date) return '';
        const timePart = time || '00:00:00';
        return DateTime.fromISO(`${date}T${timePart}`, { zone: 'utc' }).toISO({ includeOffset: false }) ?? '';
    };

    let date = '';
    let time = '';

    $: ({ date, time } = splitDateTime(datetimeInput));

    const select = () => (datetimeInput = joinDateTime(date, time));
</script>

<label class="label text-lg" for="date-input">
    <span class="label-text">{label}</span>
</label>
<div class="grid grid-cols-2 gap-2 w-full">
    <input type="date" bind:value={date} on:input={select} class="input text-primary w-full" />
    <input type="time" bind:value={time} on:input={select} step="1" class="input w-full" />
</div>

<style>
    .input::-webkit-calendar-picker-indicator {
        filter: invert();
        max-width: 100%;
    }
</style>
