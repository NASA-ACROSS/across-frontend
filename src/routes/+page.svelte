<script lang="ts">
    import type { PageData } from './$types';

    import Hero from '$lib/components/Hero.svelte';

    export let data: PageData;
</script>

<Hero apiDocsUrl={data.apiDocsUrl}></Hero>
