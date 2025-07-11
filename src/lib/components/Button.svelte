<script lang="ts">
    export let name: string = '';
    export let disabled = false;
    export let isLoading: boolean;
    export let classes = '';
</script>

<button class="btn {classes}" {disabled}>
    {#if isLoading}
        <span class="loading loading-spinner"></span>
    {:else if name}
        {name}
    {:else}
        <slot></slot>
    {/if}
</button>
