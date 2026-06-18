<script lang="ts">
    import Spinner from './Spinner.svelte';

    export let name: string = '';
    export let disabled = false;
    export let isLoading: boolean;
    export let classes = '';
</script>

<button class="btn {classes}" {disabled}>
    {#if isLoading}
        <Spinner />
    {:else if name}
        {name}
    {:else}
        <slot></slot>
    {/if}
</button>
