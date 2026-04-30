<script lang="ts">
    import { registry } from '../_components/ComponentRegistry';
    import Page from '$lib/components/Page.svelte';

    export let data;
    export let formData = {};

    function handleSubmit() {
        console.log('formData', formData);
    }
    console.log('registry', data);
</script>

<Page title="TOO Toolkit" icon="calendar">
    {#if data}
        <h1>{data.title}</h1>

        <form on:submit|preventDefault={handleSubmit}>
            {#each data.components as comp}
                {#if registry[comp.type]}
                    <svelte:component this={registry[comp.type]} {...comp} bind:value={formData[comp.name]} />
                {/if}
            {/each}
        </form>
    {/if}
</Page>
