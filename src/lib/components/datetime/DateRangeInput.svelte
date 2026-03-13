<script lang="ts">
    import DatetimeInput from './DatetimeInput.svelte';

    export let dateRangeBegin: string = '';
    export let dateRangeEnd: string = '';
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-2">
    <div class="w-full justify-self-start">
        <DatetimeInput bind:datetimeInput={dateRangeBegin} label="Begin Date/Time" />
    </div>

    <div class="w-full justify-self-end">
        <DatetimeInput bind:datetimeInput={dateRangeEnd} label="End Date/Time" />
    </div>
</div>
