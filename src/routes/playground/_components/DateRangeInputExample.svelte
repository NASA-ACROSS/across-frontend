<script lang="ts">
    import DateRangeInput from '$lib/components/datetime/DateRangeInput.svelte';

    let dateRangeBegin = $state('');
    let dateRangeEnd = $state('');
</script>

<DateRangeInput bind:dateRangeBegin bind:dateRangeEnd></DateRangeInput>
<p class="mt-4">
    <strong>Selected Begin:</strong>
    {dateRangeBegin || 'None'}
</p>
<p>
    <strong>Selected End:</strong>
    {dateRangeEnd || 'None'}
</p>
