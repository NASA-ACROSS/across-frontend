<script lang="ts">
    import ObjectNameResolver from './ObjectNameResolver.svelte';

    interface Props {
        ra?: string | number;
        dec?: string | number;
        radius?: string | number;
        objectName?: string;
        includeRadius?: boolean;
        required?: boolean;
    }

    let {
        ra = $bindable(''),
        dec = $bindable(''),
        radius = $bindable(''),
        objectName = $bindable(''),
        includeRadius = false,
        required = false,
    }: Props = $props();
</script>

<ObjectNameResolver bind:ra bind:dec bind:objectName {required} />

<div class="grid grid-cols-1 {includeRadius ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-2 mb-4">
    <label class="input text-lg pe-0 w-full" for="ra-input">
        RA:
        <input
            id="ra-input"
            {required}
            class="input validator input-bordered text-lg w-full"
            type="number"
            inputmode="decimal"
            step="any"
            bind:value={ra}
            placeholder="decimal° (0-359.999)"
            min="0"
            max="359.99999999"
        />
        <p class="hidden validator-hint mt-18" style="position: absolute;">Must be a number (0 to 359.99999999)</p>
    </label>

    <label class="input text-lg pe-0 w-full" for="dec-input">
        DEC:
        <input
            id="dec-input"
            {required}
            type="number"
            inputmode="decimal"
            step="any"
            bind:value={dec}
            placeholder="decimal° (-90 to 90)"
            min="-90"
            max="90"
            class="input validator input-bordered text-lg w-full"
        />
        <p class="hidden validator-hint mt-18" style="position: absolute;">Must be a number (-90 to 90)</p>
    </label>

    {#if includeRadius}
        <label class="input text-lg pe-0 w-full" for="radius-input">
            Radius:
            <input
                id="radius-input"
                {required}
                type="number"
                inputmode="decimal"
                step="any"
                bind:value={radius}
                placeholder="decimal° (> 0)"
                class="input validator input-bordered text-lg w-full"
                min="0"
            />
            <p class="hidden validator-hint mt-18" style="position: absolute;">Must be decimal greater than 0</p>
        </label>
    {/if}
</div>
