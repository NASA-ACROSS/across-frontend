<script lang="ts">
    /** 2 way bind value to state variable outside this component */
    export let value: number | undefined;
    /**
     * 2 way bind `unit` to state variable outside this component when passing in `unitOptions`.
     * If only one value for `unitOptions` is provided this value will be set to that single option,
     * or you can simply set the value of the unit here and omit `unitOptions`
     * */
    export let unit: string | undefined;

    export let id: string;
    export let displayName: string;

    /**
     * Array of options to choose from for the unit dropdown selector.
     * If one option provided `unit` will default to the only option available.
     * If no options provided `unit` will need to be set when using this component.
     * */
    export let unitOptions: string[] = [];
    let isOneOrNoOption = unitOptions?.length == 1 || !unitOptions?.length;
    if (unitOptions?.length == 1) unit = unitOptions[0];

    export let min: number | undefined = undefined;
    export let max: number | undefined = undefined;

    // use 'any' for arbitrary decimal step
    // for more info see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/step
    export let step: number | string = 'any';

    export let required: boolean = false;
    export let placeholder: string = 'decimal';

    export let validationRejectionText = 'Must be a number';
</script>

<div data-testid={`UnitValueInput:${id}`} class="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
    <div>
        <label class="label text-lg" for="{id}-value-input">
            <span class="label-text">{displayName}</span>
        </label>
        <label class="input text-lg w-full">
            {displayName} Value:
            <input
                {required}
                id="{id}-value-input"
                type="number"
                {min}
                {max}
                {step}
                bind:value
                {placeholder}
                class="input validator input-bordered text-lg w-full"
            />
            {#if unit && isOneOrNoOption}
                <span class="label">{unit}</span>
            {/if}
            <p class="hidden validator-hint mt-18" style="position: absolute;">{validationRejectionText}</p>
        </label>
    </div>
    {#if unitOptions?.length > 1}
        <div class="self-end">
            <select {required} id="{id}-unit-input" bind:value={unit} class="select select-bordered text-lg w-full">
                <option value="">Select Unit</option>
                {#each unitOptions as option}
                    <option value={option}>{option}</option>
                {/each}
            </select>
        </div>
    {/if}
</div>
