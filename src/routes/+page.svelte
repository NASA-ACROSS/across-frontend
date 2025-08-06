<script lang="ts">
    import type { PageData } from './$types';

    import Hero from '$lib/components/Hero.svelte';

    export let data: PageData;
</script>

<Hero API_URL={data.API_URL}></Hero>
