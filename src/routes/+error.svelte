<script>
    import { page } from '$app/stores';
    import Section from '$lib/components/Section.svelte';
    import Page from '$lib/components/Page.svelte';
</script>

<Page>
    <Section>
        <article class="prose">
            <div class="flex flex-col gap-2">
                <h1>{$page.status}</h1>
                <h1>{$page.error?.message}</h1>
            </div>

            <h3>{$page.url}</h3>
            {#if $page.error}
                <span>Error ID: </span><code>{$page.error.errorId}</code>
                <span>Error Code: </span><code>{$page.error.code}</code>
            {/if}
        </article>
    </Section>
</Page>
