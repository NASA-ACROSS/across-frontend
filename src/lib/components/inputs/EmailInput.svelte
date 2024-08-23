<script lang="ts">
    import { emailRegex } from '$lib/utils/regex/emailRegex';
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
        bind:value
        {disabled}
        {name}
        on:keyup={onKeyUp}
        placeholder="email@example.com"
        autocomplete={autocomplete ? 'on' : 'off'}
        type="email"
    />
    <label for={label}>{label}</label>
</div>
