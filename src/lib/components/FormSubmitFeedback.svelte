<script lang="ts">
    import { page } from '$app/stores';
    import type { FormSubmitResult } from '$lib/types/form/FormSubmitResult';

    export let action: string | undefined = undefined;

    $: formData = $page.form as FormSubmitResult | null;
    $: isMatch = action ? formData?._action === action : true;
</script>

{#if isMatch && formData?.message}
    <div class={formData.type === 'error' ? 'text-error' : formData.type === 'warning' ? 'text-warning' : 'text-info'}>
        {formData.type === 'error' ? 'ERROR: ' : ''}
        {formData.type === 'warning' ? 'WARNING: ' : ''}
        {formData.message}
    </div>
{/if}
