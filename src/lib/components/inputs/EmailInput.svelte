<script lang="ts">
    import type { KeyboardEventHandler } from 'svelte/elements';

    export let label = 'Email';
    export let name = 'email';
    export let value = '';
    export let disabled = false;
    export let autocomplete = true;
    export let required = true;
    export let onKeyUp: KeyboardEventHandler<HTMLInputElement> | undefined =
        undefined;
</script>

<div class="form-floating">
    <input
        class="form-control"
        {required}
        {value}
        {disabled}
        {name}
        on:keyup={onKeyUp}
        placeholder="email@example.com"
        autocomplete={autocomplete ? 'on' : 'off'}
        type="email"
    />
    <label for={label}>{label}</label>
</div>

<style>
    input:valid:not(:placeholder-shown) {
        border: 1px solid rgba(160, 160, 255, 1);
    }

    input:disabled {
        border: 1px solid rgb(34, 197, 94) !important;
    }

    input:invalid:not(:placeholder-shown) {
        border: 1px solid rgba(255, 0, 0, 1);
    }
</style>
