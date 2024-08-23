<script lang="ts">
    export let name: string;
    export let disabled = false;
    export let isLoading: boolean;
</script>

<button class="btn btn-lg btn-primary" {disabled}>
    {#if isLoading}
        <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
        ></span>
    {:else}
        {name}
    {/if}
</button>
