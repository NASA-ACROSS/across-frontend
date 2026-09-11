<script lang="ts">
    import { DateTime } from 'luxon';

    export let id: string | undefined = undefined;
    export let datetimeInput: string = '';
    export let label = 'Date/Time';
    export let required: boolean = false;

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

    let date = '';
    let time = '';

    $: ({ date, time } = splitDateTime(datetimeInput));

    const select = () => (datetimeInput = joinDateTime(date, time));
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
                on:input={select}
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
                on:input={select}
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
