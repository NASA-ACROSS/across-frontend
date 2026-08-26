<script lang="ts">
    import DatetimeInput from './DatetimeInput.svelte';

    export let dateRangeBegin: string = '';
    export let dateRangeEnd: string = '';
    export let requiredBegin: boolean = false;
    export let requiredEnd: boolean = false;
</script>

<div data-testid="DateRangeInput" class="grid grid-cols-1 md:grid-cols-2 gap-2">
    <div data-testid="date-range-begin" class="w-full justify-self-start">
        <DatetimeInput bind:datetimeInput={dateRangeBegin} id="begin" required={requiredBegin} label="Begin Date/Time" />
    </div>

    <div data-testid="date-range-end" class="w-full justify-self-end">
        <DatetimeInput bind:datetimeInput={dateRangeEnd} id="end" required={requiredEnd} label="End Date/Time" />
    </div>
</div>
