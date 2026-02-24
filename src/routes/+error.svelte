<script>
    import { page } from '$app/stores';
    import Section from '$lib/components/Section.svelte';
    import Page from '$lib/components/Page.svelte';
</script>

<Page center={true}>
    <Section>
        <article class="prose">
            <div class="flex gap-5">
                <h1>{$page.status}</h1>
                <h1>{$page.error?.message}</h1>
            </div>

            <h3>{$page.url}</h3>
            {#if $page.error}
                <p>{$page.error.errorId}</p>
            {/if}
        </article>
    </Section>
</Page>
