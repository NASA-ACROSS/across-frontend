<script>
    import { resolve } from '$app/paths';
    import ArrowButton from '$lib/components/ArrowButton.svelte';
    import Section from '$lib/components/Section.svelte';
    import Page from '$lib/components/Page.svelte';
</script>

<Page center={true}>
    <Section title="Logout" icon="log-out" containerClasses="w-xs">
        <h1>You have successfully logged out!</h1>
        <ArrowButton href={resolve('/user/login')}>Login</ArrowButton>
    </Section>
</Page>
