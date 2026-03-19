<script lang="ts">
    // when title is set ignores title slot content
    export let title = '';
    export let open = true;
    export let arrow = true;
    // applied to both title and content
    export let backgroundColor = '';
</script>

<details {open} class="collapse {arrow ? 'collapse-arrow' : ''} bg-base-100 border-base-300 border mb-4 {backgroundColor}">
    <summary class="collapse-title font-semibold {backgroundColor}">
        {#if title}
            {title}
        {:else}
            <slot name="title"></slot>
        {/if}
    </summary>
    <div class="collapse-content text-sm">
        <slot></slot>
    </div>
</details>
