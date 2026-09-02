<script lang="ts">
    import type { PageData } from './$types';

    import Hero from '$lib/components/Hero.svelte';

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();
</script>

<Hero apiDocsUrl={data.apiDocsUrl}></Hero>
