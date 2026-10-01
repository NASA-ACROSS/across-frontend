<script lang="ts">
    export let label: string | undefined = undefined;
    export let name: string;
    export let value: string | number | boolean | Date = 'none';
</script>

<div class="bg-secondary pt-3 pb-3 ps-4 w-full">
    <label class="text-lg pe-0 w-full mb-4" for="data-item-name">
        {#if label}
            {label}
        {/if}
        <div class="flex flex-row gap-4">
            <div class="font-bold" id="data-item-name">{name}:</div>
            <div class="w-fit">{value}</div>
        </div>
    </label>
</div>
