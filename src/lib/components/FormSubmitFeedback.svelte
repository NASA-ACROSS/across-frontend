<script lang="ts">
    import { page } from '$app/stores';
    import type { FormSubmitResult } from '$lib/types/form/FormSubmitResult';

    interface Props {
        action?: string | undefined;
    }

    let { action = undefined }: Props = $props();

    let formData = $derived($page.form as FormSubmitResult | null);
    let isMatch = $derived(action ? formData?._action === action : true);
</script>

{#if isMatch && formData?.message}
    <div class={formData.type === 'error' ? 'text-error' : formData.type === 'warning' ? 'text-warning' : 'text-info'}>
        {#if formData.type === 'warning'}
            WARNING: {formData.message}
        {:else if formData.type === 'error'}
            ERROR: {formData.message} <span class="text-sm">(ID: <code>{formData.errorId}</code>)</span>
        {:else}
            {formData.message}
        {/if}
    </div>
{/if}
