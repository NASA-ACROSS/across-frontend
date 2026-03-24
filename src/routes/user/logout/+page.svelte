<script>
    import { resolve } from '$app/paths';
    import ArrowButton from '$lib/components/ArrowButton.svelte';
    import Section from '$lib/components/Section.svelte';
    import Page from '$lib/components/Page.svelte';
</script>

<Page title="Logout" icon="door-open-alt">
    <div class="w-xs">
        <h1 class="text-xl">You have successfully logged out!</h1>
        <div class="flex flex-row gap-4">
            <ArrowButton href={resolve('/user/login')}>Login</ArrowButton>
            <ArrowButton href={resolve('/')}>Home</ArrowButton>
        </div>
    </div>
</Page>
