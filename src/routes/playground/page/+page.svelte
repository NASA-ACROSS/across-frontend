<script>
    import { resolve } from '$app/paths';
    import Alert from '$lib/components/Alert.svelte';
    import ArrowButton from '$lib/components/ArrowButton.svelte';
    import Page from '$lib/components/Page.svelte';
    import Section from '$lib/components/Section.svelte';

    let showMenu = $state(false);
    let showInfo = $state(false);
</script>

<Page icon="server" title="Page Title" {showMenu} {showInfo}>
    <!-- Toggle buttons for demonstration purposes only -->
    {#snippet buttons()}
        <div class="flex gap-2 items-center">
            <button
                class="btn {showMenu ? 'btn-accent' : ''}"
                onclick={() => {
                    showMenu = !showMenu;
                }}
            >
                Toggle Menu Sidebar
            </button>
            <button
                class="btn {showInfo ? 'btn-info' : ''}"
                onclick={() => {
                    showInfo = !showInfo;
                }}
            >
                Toggle Info Sidebar
            </button>
        </div>
    {/snippet}

    {#snippet menu()}
        <div class="text-xl">
            Menu slot
            <div class="text-sm">
                Use this slot to display a menu on the left side of the screen to enable user navigation. This slot has the ability to
                extend the page down as much as it needs to fit all the slotted content.
            </div>
        </div>
    {/snippet}

    {#snippet info()}
        <div class="text-xl">
            Info Slot
            <div class="text-sm">
                Use this slot to display some info text on the right side of the screen, provide any supporting graphics or links.
            </div>
        </div>
    {/snippet}

    {#snippet alert()}
        <Alert>Some Alert Text</Alert>
    {/snippet}

    <Section icon="user" title="Column Section Title">
        {#snippet buttons()}
            <ArrowButton href={resolve('/playground')}>Playground</ArrowButton>
        {/snippet}
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
