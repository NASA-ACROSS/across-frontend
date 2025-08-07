<script>
    import { resolve } from '$app/paths';
    import ArrowButton from '$lib/components/ArrowButton.svelte';
    import Container from '$lib/components/Container.svelte';
    import Page from '$lib/components/Page.svelte';
</script>

<Page>
    <Container
        title="Logout"
        icon="log-out"
        center={true}
        containerClasses="min-w-xs"
    >
        <h1>You have successfully logged out!</h1>
        <ArrowButton href={resolve('/user/login')}>Login</ArrowButton>
    </Container>
</Page>
