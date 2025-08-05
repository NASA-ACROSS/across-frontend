<script lang="ts">
    export let type: 'error' | 'warning' | 'success' = 'success';

    let styleClass = 'text-success';

    $: if (type === 'error') {
        styleClass = 'text-error';
    } else if (type === 'warning') {
        styleClass = 'text-warning';
    }
</script>

<div class={styleClass}>
    <slot />
</div>
