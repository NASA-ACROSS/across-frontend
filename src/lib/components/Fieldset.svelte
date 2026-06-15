<script lang="ts">
    export let title = '';
</script>

<fieldset class="fieldset bg-base-200 border-base-300 w-auto ps-6 pe-6 pb-6 pt-4">
    {#if title}
        <div class="text-carbon-70 text-2xl pb-2">{title}</div>
    {/if}
    <slot></slot>
</fieldset>
