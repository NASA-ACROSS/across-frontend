<script>
    import { page } from '$app/stores';
    import Container from '$lib/components/Container.svelte';
    import Section from '$lib/components/Section.svelte';
</script>

<Section center={true}>
    <Container>
        <article class="prose">
            <div class="flex gap-5">
                <h1>{$page.status}</h1>
                <h1>{$page.error.message}</h1>
            </div>

            <h3>{$page.url}</h3>
            {#if $page.error.errorId}
                <p>{$page.error.errorId}</p>
            {/if}
        </article>
    </Container>
</Section>
