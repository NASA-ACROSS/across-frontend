<script lang="ts">
    interface Props {
        /** 2 way bind value to state variable outside this component */
        value: number | undefined;
        /**
         * 2 way bind `unit` to state variable outside this component when passing in `unitOptions`.
         * If only one value for `unitOptions` is provided this value will be set to that single option,
         * or you can simply set the value of the unit here and omit `unitOptions`
         * */
        unit: string | undefined;
        id: string;
        displayName: string;
        /**
         * Array of options to choose from for the unit dropdown selector.
         * If one option provided `unit` will default to the only option available.
         * If no options provided `unit` will need to be set when using this component.
         * */
        unitOptions?: string[];
        min?: number | undefined;
        max?: number | undefined;
        /**
         * use 'any' for arbitrary decimal step
         * for more info see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/step
         * */
        step?: number | string;
        required?: boolean;
        placeholder?: string;
        validationRejectionText?: string;
    }

    let {
        value = $bindable(),
        unit = $bindable(),
        id,
        displayName,
        unitOptions = [],
        min = undefined,
        max = undefined,
        step = 'any',
        required = false,
        placeholder = 'decimal',
        validationRejectionText = 'Must be a number',
    }: Props = $props();

    // Svelte 5 migration: the original interleaved these two statements *between* the
    // `export let` declarations, after `unitOptions`. `sv migrate` collected every prop
    // into the $props() block above but left these stranded at the TOP of the script --
    // above the declarations they depend on. `let` bindings are hoisted but uninitialised
    // (temporal dead zone), so reading `unitOptions` there threw a ReferenceError at
    // runtime every time this component rendered. It compiled cleanly; only svelte-check
    // caught it. They must live after $props().
    // `isOneOrNoOption` is $derived so it tracks `unitOptions` rather than freezing its
    // initial value; the `unit` default below stays a one-off init, as it was in Svelte 4.
    let isOneOrNoOption = $derived(unitOptions?.length == 1 || !unitOptions?.length);
    if (unitOptions?.length == 1) unit = unitOptions[0];
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
