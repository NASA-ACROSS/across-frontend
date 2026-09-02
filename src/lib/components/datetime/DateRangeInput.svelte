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

<div class="grid grid-cols-1 md:grid-cols-2 gap-2">
    <div class="w-full justify-self-start">
        <DatetimeInput bind:datetimeInput={dateRangeBegin} required={requiredBegin} label="Begin Date/Time" />
    </div>

    <div class="w-full justify-self-end">
        <DatetimeInput bind:datetimeInput={dateRangeEnd} required={requiredEnd} label="End Date/Time" />
    </div>
</div>
