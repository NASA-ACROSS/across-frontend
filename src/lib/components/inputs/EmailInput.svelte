<script lang="ts">
    import Button from '../Button.svelte';

    export let name = 'email';
    export let value = '';
    export let placeholder = 'Enter an email address';
    export let disabled = false;
    export let autocomplete = true;
    export let required = true;
    /**
     * Button to submit `<form>` action in current context.
     * Used for login and user invitation on group manage page.
     * Customize text with `btnText`
     */
    export let includeButton = false;
    export let btnTxt = 'Send Link';
    export let isLoading;
</script>

<div>
    <div class="join w-full mb-4">
        <label
            class="input validator join-item w-full bg-nasa-white disabled:bg-nasa-green"
        >
            <svg
                class="h-[1em] opacity-50 {disabled
                    ? 'text-secondary-content'
                    : ''}"
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
                class="form-control disabled:text-secondary-content w-full"
                type="email"
                {placeholder}
                autocomplete={autocomplete ? 'on' : 'off'}
                {required}
                {value}
                {disabled}
                {name}
            />
        </label>
        {#if includeButton}
            <Button classes="btn-primary join-item" {isLoading} {disabled}
                >{btnTxt}</Button
            >
        {/if}
        <div class="validator-hint hidden text-left absolute mt-13">
            Enter valid email address
        </div>
    </div>
    <slot></slot>
</div>
