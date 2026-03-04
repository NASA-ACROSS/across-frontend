<script lang="ts">
    import { DateTime } from 'luxon';

    export let date_range_begin: string = '';
    export let date_range_end: string = '';

    let dateBegin: string = '';
    let timeBegin: string = '';
    let dateEnd: string = '';
    let timeEnd: string = '';

    let lastEmittedBegin = '';
    let lastEmittedEnd = '';

    const splitDateTime = (value: string | undefined) => {
        if (!value) return { date: '', time: '' };

        const dt = DateTime.fromISO(value, { zone: 'utc' });
        if (!dt.isValid) return { date: '', time: '' };

        const hasTime = value.includes('T');
        return {
            date: dt.toISODate() ?? '',
            time: hasTime ? dt.toFormat('HH:mm:ss') : '',
        };
    };

    $: if (date_range_begin !== lastEmittedBegin) {
        const { date, time } = splitDateTime(date_range_begin);
        if (date !== dateBegin) dateBegin = date;
        if (time !== timeBegin) timeBegin = time;
    }

    $: if (date_range_end !== lastEmittedEnd) {
        const { date, time } = splitDateTime(date_range_end);
        if (date !== dateEnd) dateEnd = date;
        if (time !== timeEnd) timeEnd = time;
    }

    const emitBegin = () => {
        const nextValue = dateBegin
            ? DateTime.fromISO(`${dateBegin}T${timeBegin ? timeBegin : '00:00:00'}`, { zone: 'utc' }).toFormat("yyyy-MM-dd'T'HH:mm:ss")
            : '';

        lastEmittedBegin = nextValue;
        if (date_range_begin !== nextValue) date_range_begin = nextValue;
    };

    const emitEnd = () => {
        const nextValue = dateEnd ? DateTime.fromISO(`${dateEnd}T${timeEnd ? timeEnd : '00:00:00'}`, { zone: 'utc' }).toFormat("yyyy-MM-dd'T'HH:mm:ss") : '';

        lastEmittedEnd = nextValue;
        if (date_range_end !== nextValue) date_range_end = nextValue;
    };
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
    <div>
        <label class="label text-lg" for="date-begin-input">
            <span class="label-text">Begin Date/Time</span>
        </label>
        <div class="grid grid-cols-2 space-x-2">
            <input id="date-begin-input" type="date" bind:value={dateBegin} on:input={emitBegin} class="input w-full text-primary" />
            <input id="time-begin-input" type="time" bind:value={timeBegin} on:input={emitBegin} step="1" class="input w-full" />
        </div>
    </div>
    <div>
        <label class="label text-lg" for="date-end-input">
            <span class="label-text">End Date/Time</span>
        </label>
        <div class="grid grid-cols-2 space-x-2">
            <input id="date-end-input" type="date" bind:value={dateEnd} on:input={emitEnd} class="input w-full" />
            <input id="time-end-input" type="time" bind:value={timeEnd} on:input={emitEnd} step="1" class="input w-full" />
        </div>
    </div>
</div>

<style>
    #date-begin-input::-webkit-calendar-picker-indicator,
    #date-end-input::-webkit-calendar-picker-indicator,
    #time-begin-input::-webkit-calendar-picker-indicator,
    #time-end-input::-webkit-calendar-picker-indicator {
        filter: invert();
    }
</style>
