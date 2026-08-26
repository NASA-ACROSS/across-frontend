<script lang="ts">
    import { DateTime } from 'luxon';

    interface Props {
        id?: string;
        datetimeInput?: string;
        label?: string;
        required?: boolean;
    }

    let { id, datetimeInput = $bindable(''), label = 'Date/Time', required = false }: Props = $props();

    const dateInputId = id ? `DatetimeInput:date-${id}` : 'DatetimeInput:date';
    const timeInputId = id ? `DatetimeInput:time-${id}` : 'DatetimeInput:time';

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

<fieldset class="fieldset">
    <legend class="fieldset-legend text-lg font-normal">{label}</legend>
    <div class="grid grid-cols-2 gap-1">
        <div class="flex flex-col gap-2 w-full">
            <label class="label text-lg" for={dateInputId} hidden>
                <span class="label-text">Date</span>
            </label>
            <input
                data-testid={dateInputId}
                id={dateInputId}
                {required}
                type="date"
                bind:value={date}
                oninput={select}
                class="input text-primary"
            />
        </div>
        <div class="flex flex-col gap-2">
            <label class="label text-lg" for={timeInputId} hidden>
                <span class="label-text">Time</span>
            </label>
            <input
                data-testid={timeInputId}
                id={timeInputId}
                {required}
                type="time"
                bind:value={time}
                oninput={select}
                step="1"
                class="input"
            />
        </div>
    </div>
</fieldset>

<style>
    .input::-webkit-calendar-picker-indicator {
        filter: invert();
        max-width: 100%;
    }
</style>
