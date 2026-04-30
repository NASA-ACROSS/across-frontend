<script lang="ts">
    export let label: string;
    export let name: string;
    export let value: number | string = '';
    export let placeholder: string = '';
    export let min: number | undefined = undefined;
    export let max: number | undefined = undefined;
    export let step: number | string = 'any';
</script>

<label class="fieldset-label" for="{name}-input">{label}</label>
<label class="input input-bordered w-full" for="{name}-input">
    <input id="{name}-input" type="number" inputmode="decimal" {step} {placeholder} {min} {max} {name} bind:value class="w-full" />
</label>
