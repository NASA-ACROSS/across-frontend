<script lang="ts">
    import { DateTime } from 'luxon';

    interface Props {
        datetimeInput?: string;
        label?: string;
        required?: boolean;
    }

    let { datetimeInput = $bindable(''), label = 'Date/Time', required = false }: Props = $props();

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

    // Svelte 5 migration: was a `run()` shim from 'svelte/legacy'.
    // $derived rather than $effect: this must also run during SSR so the inputs render
    // populated on the server. $effect would leave them empty until hydration.
    let parts = $derived(splitDateTime(datetimeInput));
    let date = $derived(parts.date);
    let time = $derived(parts.time);

    // Push edits back up through the bindable prop; `date`/`time` stay derived from it.
    const select = (nextDate: string, nextTime: string) => (datetimeInput = joinDateTime(nextDate, nextTime));
</script>

<label class="label text-lg" for="date-input">
    <span class="label-text">{label}</span>
</label>
<div class="grid grid-cols-2 gap-2 w-full">
    <input
        {required}
        type="date"
        value={date}
        oninput={(event) => select(event.currentTarget.value, time)}
        class="input text-primary w-full"
    />
    <input {required} type="time" value={time} oninput={(event) => select(date, event.currentTarget.value)} step="1" class="input w-full" />
</div>

<style>
    .input::-webkit-calendar-picker-indicator {
        filter: invert();
        max-width: 100%;
    }
</style>
