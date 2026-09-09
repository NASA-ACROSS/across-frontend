<script lang="ts">
    import DatetimeInput from './DatetimeInput.svelte';

    interface Props {
        dateRangeBegin?: string;
        dateRangeEnd?: string;
        requiredBegin?: boolean;
        requiredEnd?: boolean;
    }

    let { dateRangeBegin = $bindable(''), dateRangeEnd = $bindable(''), requiredBegin = false, requiredEnd = false }: Props = $props();
</script>

<div data-testid="DateRangeInput" class="grid grid-cols-1 md:grid-cols-2 gap-2">
    <div data-testid="date-range-begin" class="w-full justify-self-start">
        <DatetimeInput bind:datetimeInput={dateRangeBegin} id="begin" required={requiredBegin} label="Begin Date/Time" />
    </div>

    <div data-testid="date-range-end" class="w-full justify-self-end">
        <DatetimeInput bind:datetimeInput={dateRangeEnd} id="end" required={requiredEnd} label="End Date/Time" />
    </div>
</div>
