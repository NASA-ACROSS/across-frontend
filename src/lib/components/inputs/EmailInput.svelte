<script lang="ts">
    import type { KeyboardEventHandler } from 'svelte/elements';
    import Button from '../Button.svelte';

    export let label = 'Email';
    export let name = 'email';
    export let value = '';
    export let disabled = false;
    export let autocomplete = true;
    export let required = true;
    export let includeButton = false;
    export let isLoading;
    export let onKeyUp: KeyboardEventHandler<HTMLInputElement> | undefined =
        undefined;
</script>

<div class="join w-100">
    <label class="input validator join-item">
        <svg
            class="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <g
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="2.5"
                fill="none"
                stroke="currentColor"
            >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </g>
        </svg>
        <input
            class="form-control"
            type="email"
            placeholder="email@example.com"
            autocomplete={autocomplete ? 'on' : 'off'}
            {required}
            {value}
            {disabled}
            {name}
        />
    </label>
    <div class="validator-hint hidden">Enter valid email address</div>
    {#if includeButton}
        <Button classes="btn-neutral join-item" {isLoading} {disabled}
            >Send Link</Button
        >
    {/if}
</div>
