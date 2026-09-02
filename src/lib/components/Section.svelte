<script lang="ts">
    interface Props {
        title?: string;
        icon?: string | undefined;
        type?: 'row' | 'col';
        wrap?: boolean;
        // allow id for linking
        id?: string;
        buttons?: import('svelte').Snippet;
        children?: import('svelte').Snippet;
    }

    let { title = '', icon = undefined, type = 'col', wrap = false, id = '', buttons, children }: Props = $props();
</script>

<!-- Section -->
<div data-testid="Section:{id}" {id} class="w-full my-4 flex flex-col text-primary grow">
    <!-- Heading -->
    {#if icon || title || buttons}
        <h2 class="text-3xl flex flex-col md:flex-row justify-between text-primary pb-3">
            <div class="flex gap-2 items-center wrap-anywhere">
                {#if icon}
                    <div class="bx bx-{icon} opacity-80"></div>
                {/if}
                {title}
            </div>

            <div class="flex justify-end">
                {@render buttons?.()}
            </div>
        </h2>
    {/if}

    <div class="flex flex-{type} {wrap ? 'flex-wrap' : ''} gap-2">
        {@render children?.()}
    </div>
</div>
