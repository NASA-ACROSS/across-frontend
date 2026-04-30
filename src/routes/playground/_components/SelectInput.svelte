<script lang="ts">
    export let label: string;
    export let name: string;
    export let value: string = '';
    export let options: { label: string; value: string }[] = [];
    export let placeholder: string = 'Select an option';
</script>

<label class="fieldset-label" for="{name}-select">{label}</label>
<select id="{name}-select" class="select select-bordered w-full" bind:value>
    <option value="" disabled>{placeholder}</option>
    {#each options as opt}
        <option value={opt.value}>{opt.label}</option>
    {/each}
</select>
