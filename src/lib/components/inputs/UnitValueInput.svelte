<script lang="ts">
    // for id and display
    export let name: string;

    // bind unit and value to state variables outside this component
    export let value: number | undefined;
    export let unit: string | undefined;

    // options to choose from for the unit dropdown
    export let unitOptions: string[];

    export let min: number | undefined = undefined;
    export let max: number | undefined = undefined;

    // use 'any' for arbitrary decimal step
    export let step: number | string = 'any';

    export let required: boolean = false;
    export let placeholder: string = 'decimal';

    // capitalize first letter
    $: displayName = `${name[0].toUpperCase()}${name.toLowerCase().slice(1)}`;
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
    <div>
        <label class="label text-lg" for="{name}-value-input">
            <span class="label-text">{displayName}</span>
        </label>
        <label class="input text-lg w-full">
            {displayName} Value:
            <input
                {required}
                id="{name}-value-input"
                type="number"
                {min}
                {max}
                {step}
                bind:value
                {placeholder}
                class="input validator input-bordered text-lg w-full"
            />
            {#if unit}
                <span class="label">{unit}</span>
            {/if}
            <p class="hidden validator-hint mt-18" style="position: absolute;">Must be a number</p>
        </label>
    </div>
    <div class="self-end">
        <select {required} id="{name}-unit-input" bind:value={unit} class="select select-bordered text-lg w-full">
            <option value="">Select Unit</option>
            {#each unitOptions as option}
                <option value={option}>{option}</option>
            {/each}
        </select>
    </div>
</div>
