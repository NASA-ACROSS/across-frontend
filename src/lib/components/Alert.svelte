<script lang="ts">
    import type { Snippet } from 'svelte';

    interface Props {
        id?: string;
        /** The type of alert (e.g., 'info', 'warning', 'error') */
        type?: string;
        /** Whether the alert should have a soft background */
        soft?: boolean;
        /** Whether the alert should be displayed vertically */
        vertical?: boolean;
        children?: Snippet;
    }

    let { id = 'default', type = 'info', soft = true, vertical = true, children }: Props = $props();
</script>

<div
    data-testid={`Alert:${id}`}
    role="alert"
    class={`alert alert-${type} ${soft ? 'alert-soft' : ''} ${vertical ? 'alert-vertical' : ''} grid w-full mx-auto`}
>
    <div class="flex items-center">
        <div class="px-2">
            {#if type === 'info'}
                <!-- Info icon -->
                <i class="bx bx-info-circle text-2xl"></i>
            {/if}
            {#if type === 'warning'}
                <!-- Warning icon -->
                <i class="bx bx-alert-circle text-2xl"></i>
            {/if}
            {#if type === 'error'}
                <!-- Error icon -->
                <i class="bx bx-alert-octagon text-2xl"></i>
            {/if}
        </div>
        {@render children?.()}
    </div>
</div>
