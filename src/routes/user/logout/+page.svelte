<script>
    import { base } from '$app/paths';
    import ArrowButton from '$lib/components/ArrowButton.svelte';
    import Container from '$lib/components/Container.svelte';
    import Section from '$lib/components/Section.svelte';
</script>

<Section>
    <Container title="Logout" icon="log-out" center={true}>
        <h1>You have succesfully logged out!</h1>
        <ArrowButton href="{base}/user/login">Login</ArrowButton>
    </Container>
</Section>
