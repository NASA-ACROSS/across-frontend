<script lang="ts">
    export let title = '';
</script>

<fieldset
    class="fieldset bg-base-200 border-base-300 w-auto ps-8 pe-8 pb-8 pt-6"
>
    {#if title}
        <div class="text-carbon-90 text-2xl pb-4 opacity-80">{title}</div>
    {/if}
    <slot></slot>
</fieldset>
