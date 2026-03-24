<script>
    import { resolve } from '$app/paths';
    import Alert from '$lib/components/Alert.svelte';
    import ArrowButton from '$lib/components/ArrowButton.svelte';
    import Page from '$lib/components/Page.svelte';
    import Section from '$lib/components/Section.svelte';

    let showMenu = false;
    let showInfo = false;
</script>

<Page icon="server" title="Page Title" {showMenu} {showInfo}>
    <!-- Toggle buttons for demonstration purposes only -->
    <div slot="buttons" class="flex gap-2 items-center">
        <button
            class="btn {showMenu ? 'btn-accent' : ''}"
            on:click={() => {
                showMenu = !showMenu;
            }}
        >
            Toggle Menu Sidebar
        </button>
        <button
            class="btn {showInfo ? 'btn-info' : ''}"
            on:click={() => {
                showInfo = !showInfo;
            }}
        >
            Toggle Info Sidebar
        </button>
    </div>

    <div slot="menu" class="text-xl">
        Menu slot
        <div class="text-sm">
            Use this slot to display a menu on the left side of the screen to enable user navigation. This slot has the ability to extend the page down as much
            as it needs to fit all the slotted content.
        </div>
    </div>

    <div slot="info" class="text-xl">
        Info Slot
        <div class="text-sm">Use this slot to display some info text on the right side of the screen, provide any supporting graphics or links.</div>
    </div>

    <Alert slot="alert">Some Alert Text</Alert>

    <Section icon="user" title="Column Section Title">
        <ArrowButton slot="buttons" href={resolve('/playground')}>Playground</ArrowButton>
        {#each Array(10) as _, i}
            <div>Section Content {i + 1}</div>
        {/each}
    </Section>

    <Section icon="globe" type="row" title="Row Section Title">
        {#each Array(10) as _, i}
            <div>Section Content {i + 1}</div>
        {/each}
    </Section>

    <Section icon="globe" type="row" wrap={true} title="Row Section With Wrap">
        {#each Array(10) as _, i}
            <div>Section Content {i + 1}</div>
        {/each}
    </Section>

    <Section>
        {#each Array(5) as _, i}
            <div>Untitled Column Section Content {i + 1}</div>
        {/each}
    </Section>

    <Section type="row">
        {#each Array(5) as _, i}
            <div>Untitled Row Section Content {i + 1}</div>
        {/each}
    </Section>
</Page>
