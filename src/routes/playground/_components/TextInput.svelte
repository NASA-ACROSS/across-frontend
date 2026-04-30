<script lang="ts">
    export let label: string;
    export let name: string;
    export let value: string = '';
    export let placeholder: string = '';
</script>

<label class="fieldset-label" for="{name}-input">{label}</label>
<label class="input input-bordered w-full" for="{name}-input">
    <input id="{name}-input" type="text" {placeholder} {name} bind:value class="w-full" />
</label>
