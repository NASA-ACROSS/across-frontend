<script lang="ts">
    import Spinner from './Spinner.svelte';
    import type { Snippet } from 'svelte';

    interface Props {
        name?: string;
        disabled?: boolean;
        isLoading: boolean;
        classes?: string;
        children?: Snippet;
    }

    let { name = '', disabled = false, isLoading, classes = '', children }: Props = $props();
</script>

<button class="btn {classes}" {disabled}>
    {#if isLoading}
        <Spinner />
    {:else if name}
        {name}
    {:else}
        {@render children?.()}
    {/if}
</button>
