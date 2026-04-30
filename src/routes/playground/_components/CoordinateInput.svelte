<script lang="ts">
    export let label: string = 'Coordinates';
    export let name: string;
    export let value: { ra: number | string; dec: number | string } = { ra: '', dec: '' };
</script>

<fieldset class="fieldset">
    <legend class="fieldset-legend">{label}</legend>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
        <label class="input text-lg pe-0 w-full" for="{name}-ra-input">
            RA:
            <input
                id="{name}-ra-input"
                class="input validator input-bordered text-lg w-full"
                type="number"
                inputmode="decimal"
                step="any"
                bind:value={value.ra}
                placeholder="decimal° (0-359.999)"
                min="0"
                max="359.99999999"
            />
            <p class="hidden validator-hint mt-18" style="position: absolute;">Must be a number (0 to 359.99999999)</p>
        </label>

        <label class="input text-lg pe-0 w-full" for="{name}-dec-input">
            DEC:
            <input
                id="{name}-dec-input"
                type="number"
                inputmode="decimal"
                step="any"
                bind:value={value.dec}
                placeholder="decimal° (-90 to 90)"
                min="-90"
                max="90"
                class="input validator input-bordered text-lg w-full"
            />
            <p class="hidden validator-hint mt-18" style="position: absolute;">Must be a number (-90 to 90)</p>
        </label>
    </div>
</fieldset>
