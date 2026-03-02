<script lang="ts">
    // when title is set ignores title slot content
    export let title = '';
    export let open = true;
    export let contentClasses = '';
    export let titleClasses = '';
    export let arrow = true;
</script>

<details {open} class="collapse {arrow ? 'collapse-arrow' : ''} bg-base-100 border-base-300 border mb-4">
    <summary class="collapse-title font-semibold {titleClasses}">
        {#if title}
            {title}
        {:else}
            <slot name="title"></slot>
        {/if}</summary
    >
    <div class="collapse-content text-sm {contentClasses}">
        <slot></slot>
    </div>
</details>
